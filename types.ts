/**
 * 国家代码类型
 * 支持欧洲五国：英国、德国、法国、意大利、西班牙
 */
export type CountryCode = 'UK' | 'DE' | 'FR' | 'IT' | 'ES';
export type SizeTierKey = keyof typeof SIZE_TIER_MAP;

/**
 * 尺寸分层接口
 * 描述亚马逊物流的尺寸分类标准
 */
export interface SizeTier {
    /** 中文名称 */
    name_cn: string;
    /** 英文标识符（对应SIZE_TIER_MAP的键） */
    name: string;
    /** 最大允许重量（千克） */
    max_weight: number;
    /** 最大允许体积重量（千克），null表示无限制 */
    max_vol_weight: number | null;
    /** 
     * 尺寸限制 [最长边, 次长边, 最短边]（厘米）
     * null值表示该维度无限制
     */
    dims: [number | null, number | null, number | null];
}

/**
 * 费率规则类型
 * [重量上限(kg), 对应费用] 元组
 */
export type RateRule = [number, number];

/**
 * 低价费率规则类型
 * 使用 Partial 表示不是所有尺寸分层都有低价规则
 */
export type LowPriceRateRules = Partial<Record<SizeTierKey, RateRule[]>>;

/**
 * 单位转换配置接口
 */
export interface UnitConversionConfig {
  /** 毫米转厘米除数 */
  MM_TO_CM: number;
  /** 克转千克除数 */
  G_TO_KG: number;
  /** 体积重量计算除数 */
  VOLUME_WEIGHT_DIVISOR: number;
}

/**
 * 特殊大件判断阈值配置
 */
export interface SpecialOversizeThresholds {
  /** 最大长度（厘米） */
  MAX_LENGTH_CM: number;
  /** 最大重量（千克） */
  MAX_WEIGHT_KG: number;
  /** 最大围长（厘米） */
  MAX_GIRTH_CM: number;
} 