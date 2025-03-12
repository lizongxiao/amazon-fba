import { CountryCode, SizeTierKey, LowPriceRateRules } from "../types";
import {
  SIZE_TIER_MAP,
  SIZE_TIERS,
  FBA_RATE_RULES,
  LOW_PRICE_RULES,
  LOW_PRICE_FBA_RATE_RULES,
  DIMENSION_UNITS,
  SPECIAL_OVERSIZE_THRESHOLDS,
} from "../Rules/constants";

type Dimensions = { length: number; width: number; height: number };

export class EuropeFBACalculator {
  /**
   * 计算体积重量
   * @param dimensions 尺寸对象（单位：厘米）
   * @returns 体积重量（千克），保留两位小数
   */
  private static calcVolumeWeight(dimensions: Dimensions): number {
    const { length, width, height } = dimensions;
    const volume = length * width * height;
    return Number((volume / DIMENSION_UNITS.VOLUME_WEIGHT_DIVISOR).toFixed(2));
  }

  /**
   * 单位转换方法
   * @param lengthMm 长度（毫米）
   * @param widthMm 宽度（毫米）
   * @param heightMm 高度（毫米）
   * @param weightG 重量（克）
   * @returns 转换后的尺寸和重量信息
   */
  public static transferDims(
    lengthMm: number,
    widthMm: number,
    heightMm: number,
    weightG: number
  ) {
    const dimensions = {
      length: lengthMm / DIMENSION_UNITS.MM_TO_CM,
      width: widthMm / DIMENSION_UNITS.MM_TO_CM,
      height: heightMm / DIMENSION_UNITS.MM_TO_CM,
    };

    return {
      ...dimensions,
      weightKg: weightG / DIMENSION_UNITS.G_TO_KG,
      volumeWeight: this.calcVolumeWeight(dimensions),
    };
  }

  /**
   * 判断商品尺寸分层
   * @param dimensions 转换后的尺寸（厘米）
   * @param weightKg 实际重量（千克）
   * @param volumeWeight 体积重量（千克）
   * @returns 尺寸分层代码或null（不匹配时）
   */
  public static getSizeTier(
    dimensions: Dimensions,
    weightKg: number,
    volumeWeight: number
  ): SizeTierKey | null {
    const sorted = [
      dimensions.length,
      dimensions.width,
      dimensions.height,
    ].sort((a, b) => b - a);
    const [longest] = sorted;
    const girth = longest + (sorted[1] + sorted[2]) * 2;

    // 特殊大件判断
    if (
      longest > SPECIAL_OVERSIZE_THRESHOLDS.MAX_LENGTH_CM ||
      weightKg > SPECIAL_OVERSIZE_THRESHOLDS.MAX_WEIGHT_KG ||
      girth > SPECIAL_OVERSIZE_THRESHOLDS.MAX_GIRTH_CM
    ) {
      return "specialOversize";
    }

    // 遍历尺寸分层规则
    for (const tier of SIZE_TIERS) {
      // 重量检查
      if (weightKg > tier.max_weight) continue;
      if (tier.max_vol_weight !== null && volumeWeight > tier.max_vol_weight)
        continue;

      // 尺寸三维检查
      const dimChecks = sorted.map(
        (dim, index) => tier.dims[index] === null || dim <= tier.dims[index]!
      );

      if (dimChecks.every(Boolean)) {
        return tier.name as SizeTierKey;
      }
    }

    console.warn("未匹配到合适的尺寸分层");
    return null;
  }

  /**
   * 计算FBA运费
   * @param country 国家代码
   * @param lengthMm 长度（毫米）
   * @param widthMm 宽度（毫米）
   * @param heightMm 高度（毫米）
   * @param weightG 重量（克）
   * @param price 商品价格（可选）
   * @returns 运费计算结果元组 [费用, 尺寸代码, 尺寸名称] 或 null
   */
  public static calcFbaFee(
    country: CountryCode,
    lengthMm: number,
    widthMm: number,
    heightMm: number,
    weightG: number,
    price?: number
  ): [number, number, string] | null {
    const { length, width, height, weightKg, volumeWeight } = this.transferDims(
      lengthMm,
      widthMm,
      heightMm,
      weightG
    );

    const tier: any = this.getSizeTier(
      { length, width, height },
      weightKg,
      volumeWeight
    );

    if (!tier) return null;

    const countryRules: Record<SizeTierKey, any[]> = FBA_RATE_RULES[country];
    if (!countryRules?.[tier as SizeTierKey]) {
      console.warn(`无对应运费规则: ${country}/${String(tier)}`);
      return null;
    }

    // 处理低价商品逻辑
    if (typeof price === "number") {
      const lowPriceThreshold = LOW_PRICE_RULES[country];
      if (price <= lowPriceThreshold) {
        const lowPriceRules: any = LOW_PRICE_FBA_RATE_RULES[country];
        const tierRules = lowPriceRules?.[tier];

        if (tierRules) {
          const fee = this.findMatchingFee(weightKg, tierRules);
          if (fee !== null) {
            return [fee, SIZE_TIER_MAP[tier as SizeTierKey], tier];
          }
        }
      }
    }

    // 确定比较重量
    const compareWeight = [
      "lightEnvelope",
      "standardEnvelope",
      "LargeEnvelope",
      "extraLargeEnvelope",
      "specialOversize",
    ].includes(tier)
      ? weightKg
      : Math.max(weightKg, volumeWeight);

    // 匹配普通费率规则
    const fee = this.findMatchingFee(compareWeight, countryRules[tier]);
    return fee !== null
      ? [fee, SIZE_TIER_MAP[tier as SizeTierKey], tier]
      : null;
  }

  /**
   * 匹配费率规则核心方法
   * @param weight 比较重量
   * @param rules 费率规则数组
   * @returns 计算后的费用或null
   */
  private static findMatchingFee(
    weight: number,
    rules: [number, number][]
  ): number | null {
    // 处理阶梯费率
    if (rules.length > 1 && rules[rules.length - 1][0] === -1) {
      const [baseMax, baseFee] = rules[rules.length - 2];
      const [_, rate] = rules[rules.length - 1];

      if (weight > baseMax) {
        const overWeight = weight - baseMax;
        return Number((baseFee + overWeight * rate).toFixed(2));
      }
    }

    // 普通匹配
    for (const [maxWeight, fee] of rules) {
      if (weight <= maxWeight) {
        return Number(fee.toFixed(2));
      }
    }

    return null;
  }
}
