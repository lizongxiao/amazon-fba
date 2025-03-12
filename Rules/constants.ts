/**
 * 亚马逊欧洲站FBA费用计算常量
 * 参考文档：
 * https://sellercentral-europe.amazon.com/help/hub/reference/external/GABBX6GZPA8MSZGW?locale=zh-CN
 * https://sellercentral-europe.amazon.com/help/hub/reference/external/G2CD5P9TSDYZA2XG?locale=zh-CN
 * https://sellercentral-europe.amazon.com/help/hub/reference/external/GJKUWLPELK47CJS7?locale=zh-CN
 */

import { SizeTier, CountryCode } from "../types";

/**
 * 尺寸分层映射表
 * 将尺寸分层名称映射为数字代码，用于费用计算和业务逻辑处理
 */
export type SizeTierKey = keyof typeof SIZE_TIER_MAP;

/**
 * 费率规则类型
 * [重量上限(kg), 对应费用] 元组
 * 特殊值说明：
 * - 重量上限为-1时表示超出基础重量后的每公斤费率
 */
export type RateRule = [number, number];

/**
 * 尺寸分层代码映射表
 * 每个代码对应亚马逊物流的特定尺寸分类
 */
export const SIZE_TIER_MAP: any = {
  lightEnvelope: 11, // 轻型信封
  standardEnvelope: 12, // 标准信封
  LargeEnvelope: 13, // 大号信封
  extraLargeEnvelope: 14, // 超大号信封
  smallParcel: 15, // 小包裹
  standardParcel: 16, // 标准包裹
  smallOversize: 17, // 小号大件
  standardOversizeLight: 18, // 轻型标准大件
  standardOversizeHeavy: 19, // 重型标准大件
  standardOversizeLarge: 20, // 大号标准大件
  bulkyOversize: 21, // 特大号大件
  heavyOversize: 22, // 超重型大件
  specialOversize: 23, // 特殊大件
} as const;

/**
 * 尺寸分层详细规则
 * 每个分层包含：
 * - name_cn: 中文名称
 * - name: 英文标识符
 * - max_weight: 最大重量限制(kg)
 * - max_vol_weight: 最大体积重量限制(kg)，null表示无限制
 * - dims: [最长边(cm), 次长边(cm), 最短边(cm)]，null表示无限制
 */
export const SIZE_TIERS: SizeTier[] = [
  {
    name_cn: "轻型信封",
    name: "lightEnvelope",
    max_weight: 0.1,
    max_vol_weight: null,
    dims: [33, 23, 2.5],
  },
  {
    name_cn: "标准信封",
    name: "standardEnvelope",
    max_weight: 0.46,
    max_vol_weight: null,
    dims: [33, 23, 2.5],
  },
  {
    name_cn: "大号信封",
    name: "LargeEnvelope",
    max_weight: 0.96,
    max_vol_weight: null,
    dims: [33, 23, 4],
  },
  {
    name_cn: "超大号信封",
    name: "extraLargeEnvelope",
    max_weight: 0.96,
    max_vol_weight: null,
    dims: [33, 23, 6],
  },
  // 包裹类
  {
    name_cn: "小包裹",
    name: "smallParcel",
    max_weight: 3.9,
    max_vol_weight: 2.1,
    dims: [35, 25, 12],
  },
  {
    name_cn: "标准包裹",
    name: "standardParcel",
    max_weight: 11.9,
    max_vol_weight: 7.96,
    dims: [45, 34, 26],
  },
  // 大件类
  {
    name_cn: "小号大件",
    name: "smallOversize",
    max_weight: 1.76,
    max_vol_weight: 25.82,
    dims: [61, 46, 46],
  },
  {
    name_cn: "轻型标准大件",
    name: "standardOversizeLight",
    max_weight: 15,
    max_vol_weight: 72.72,
    dims: [101, 60, 60],
  },
  {
    name_cn: "重型标准大件",
    name: "standardOversizeHeavy",
    max_weight: 23,
    max_vol_weight: 72.72,
    dims: [101, 60, 60],
  },
  {
    name_cn: "大号标准大件",
    name: "standardOversizeLarge",
    max_weight: 23,
    max_vol_weight: 86.4,
    dims: [120, 60, 60],
  },
  {
    name_cn: "特大号大件",
    name: "bulkyOversize",
    max_weight: 23,
    max_vol_weight: 126,
    dims: [null, null, null],
  },
  {
    name_cn: "超重型大件",
    name: "heavyOversize",
    max_weight: 31.5,
    max_vol_weight: 126,
    dims: [null, null, null],
  },
];

/**
 * FBA运费计算规则表
 * 结构说明：
 * - 第一层：国家代码(CountryCode)
 * - 第二层：尺寸分层代码(SizeTierKey)
 * - 第三层：费率规则数组(RateRule[])
 *
 * 费率规则匹配逻辑：
 * 1. 按重量升序匹配第一个满足的重量上限
 * 2. 最后一个元素如果是[-1, fee]表示超出部分按每公斤计费
 * 3. 重量比较使用 <= 运算符
 */
export const FBA_RATE_RULES: Record<
  CountryCode,
  Record<SizeTierKey, RateRule[]>
> = {
  UK: {
    lightEnvelope: [
      [0.02, 1.83],
      [0.04, 1.87],
      [0.06, 1.89],
      [0.08, 2.07],
      [0.1, 2.08],
    ],
    standardEnvelope: [
      [0.21, 2.1],
      [0.46, 2.16],
    ],
    LargeEnvelope: [[0.96, 2.72]],
    extraLargeEnvelope: [[0.96, 2.94]],
    smallParcel: [
      [0.15, 2.91],
      [0.4, 3.0],
      [0.9, 3.04],
      [1.4, 3.05],
      [1.9, 3.25],
      [3.9, 5.1],
    ],
    standardParcel: [
      [0.15, 2.94],
      [0.4, 3.01],
      [0.9, 3.06],
      [1.4, 3.26],
      [1.9, 3.48],
      [2.9, 4.73],
      [3.9, 5.16],
      [5.9, 5.19],
      [8.9, 5.57],
      [11.9, 5.77],
    ],
    smallOversize: [
      [0.76, 3.65],
      [-1, 0.25],
    ],
    standardOversizeLight: [
      [0.76, 4.67],
      [-1, 0.24],
    ],
    standardOversizeHeavy: [
      [15.76, 8.28],
      [-1, 0.2],
    ],
    standardOversizeLarge: [
      [0.76, 6.2],
      [-1, 0.16],
    ],
    bulkyOversize: [
      [0.76, 11.53],
      [-1, 0.31],
    ],
    heavyOversize: [
      [31.5, 13.04],
      [-1, 0.09],
    ],
    specialOversize: [
      [30.0, 16.22],
      [40.0, 17.24],
      [50.0, 34.38],
      [60.0, 42.04],
      [-1, 0.35],
    ],
  },
  DE: {
    lightEnvelope: [
      [0.02, 2.33],
      [0.04, 2.37],
      [0.06, 2.39],
      [0.08, 2.52],
      [0.1, 2.54],
    ],
    standardEnvelope: [
      [0.21, 2.57],
      [0.46, 2.68],
    ],
    LargeEnvelope: [[0.96, 3.04]],
    extraLargeEnvelope: [[0.96, 3.42]],
    smallParcel: [
      [0.15, 3.38],
      [0.4, 3.4],
      [0.9, 3.67],
      [1.4, 4.29],
      [1.9, 4.49],
      [3.9, 5.57],
    ],
    standardParcel: [
      [0.15, 3.39],
      [0.4, 3.78],
      [0.9, 3.9],
      [1.4, 4.54],
      [1.9, 4.97],
      [2.9, 5.2],
      [3.9, 5.67],
      [5.9, 5.95],
      [8.9, 6.41],
      [11.9, 6.65],
    ],
    smallOversize: [
      [0.76, 4.79],
      [-1, 0.48],
    ],
    standardOversizeLight: [
      [0.76, 4.91],
      [-1, 0.29],
    ],
    standardOversizeHeavy: [
      [15.76, 9.19],
      [-1, 0.14],
    ],
    standardOversizeLarge: [
      [0.76, 6.67],
      [-1, 0.18],
    ],
    bulkyOversize: [
      [0.76, 9.78],
      [-1, 0.36],
    ],
    heavyOversize: [
      [31.5, 13.0],
      [-1, 0.15],
    ],
    specialOversize: [
      [30.0, 21.3],
      [40.0, 24.19],
      [50.0, 47.98],
      [60.0, 51.99],
      [-1, 0.36],
    ],
  },
  FR: {
    lightEnvelope: [
      [0.02, 2.75],
      [0.04, 2.76],
      [0.06, 2.78],
      [0.08, 3.3],
      [0.1, 3.32],
    ],
    standardEnvelope: [
      [0.21, 3.33],
      [0.46, 3.77],
    ],
    LargeEnvelope: [[0.96, 4.39]],
    extraLargeEnvelope: [[0.96, 4.72]],
    smallParcel: [
      [0.15, 4.56],
      [0.4, 5.07],
      [0.9, 5.79],
      [1.4, 5.87],
      [1.9, 6.1],
      [3.9, 9.1],
    ],
    standardParcel: [
      [0.15, 4.58],
      [0.4, 5.4],
      [0.9, 6.28],
      [1.4, 6.41],
      [1.9, 6.84],
      [2.9, 9.36],
      [3.9, 9.55],
      [5.9, 9.67],
      [8.9, 10.53],
      [11.9, 11.03],
    ],
    smallOversize: [
      [0.76, 7.23],
      [-1, 0.24],
    ],
    standardOversizeLight: [
      [0.76, 7.61],
      [-1, 0.38],
    ],
    standardOversizeHeavy: [
      [15.76, 13.0],
      [-1, 0.09],
    ],
    standardOversizeLarge: [
      [0.76, 9.07],
      [-1, 0.23],
    ],
    bulkyOversize: [
      [0.76, 16.92],
      [-1, 0.54],
    ],
    heavyOversize: [
      [31.5, 22.02],
      [-1, 0.18],
    ],
    specialOversize: [
      [30.0, 24.88],
      [40.0, 32.04],
      [50.0, 54.51],
      [60.0, 58.64],
      [-1, 0.4],
    ],
  },
  IT: {
    lightEnvelope: [
      [0.02, 3.23],
      [0.04, 3.26],
      [0.06, 3.28],
      [0.08, 3.39],
      [0.1, 3.41],
    ],
    standardEnvelope: [
      [0.21, 3.45],
      [0.46, 3.64],
    ],
    LargeEnvelope: [[0.96, 3.94]],
    extraLargeEnvelope: [[0.96, 4.17]],
    smallParcel: [
      [0.15, 4.13],
      [0.4, 4.54],
      [0.9, 4.95],
      [1.4, 5.51],
      [1.9, 5.81],
      [3.9, 6.93],
    ],
    standardParcel: [
      [0.15, 4.29],
      [0.4, 4.7],
      [0.9, 5.15],
      [1.4, 5.81],
      [1.9, 6.05],
      [2.9, 6.71],
      [3.9, 6.96],
      [5.9, 7.25],
      [8.9, 8.04],
      [11.9, 8.63],
    ],
    smallOversize: [
      [0.76, 7.39],
      [-1, 0.12],
    ],
    standardOversizeLight: [
      [0.76, 7.78],
      [-1, 0.38],
    ],
    standardOversizeHeavy: [
      [15.76, 13.31],
      [-1, 0.18],
    ],
    standardOversizeLarge: [
      [0.76, 9.74],
      [-1, 0.2],
    ],
    bulkyOversize: [
      [0.76, 11.13],
      [-1, 0.38],
    ],
    heavyOversize: [
      [31.5, 16.85],
      [-1, 0.15],
    ],
    specialOversize: [
      [30.0, 19.91],
      [40.0, 22.11],
      [50.0, 29.53],
      [60.0, 30.11],
      [-1, 0.6],
    ],
  },
  ES: {
    lightEnvelope: [
      [0.02, 2.77],
      [0.04, 2.84],
      [0.06, 2.87],
      [0.08, 3.21],
      [0.1, 3.23],
    ],
    standardEnvelope: [
      [0.21, 3.26],
      [0.46, 3.45],
    ],
    LargeEnvelope: [[0.96, 3.6]],
    extraLargeEnvelope: [[0.96, 3.85]],
    smallParcel: [
      [0.15, 3.52],
      [0.4, 3.74],
      [0.9, 3.95],
      [1.4, 4.21],
      [1.9, 4.27],
      [3.9, 5.5],
    ],
    standardParcel: [
      [0.15, 3.55],
      [0.4, 4.05],
      [0.9, 4.45],
      [1.4, 4.85],
      [1.9, 4.94],
      [2.9, 4.98],
      [3.9, 5.53],
      [5.9, 7.02],
      [8.9, 7.24],
      [11.9, 7.85],
    ],
    smallOversize: [
      [0.76, 5.86],
      [-1, 0.1],
    ],
    standardOversizeLight: [
      [0.76, 6.91],
      [-1, 0.47],
    ],
    standardOversizeHeavy: [
      [15.76, 13.5],
      [-1, 0.07],
    ],
    standardOversizeLarge: [
      [0.76, 7.88],
      [-1, 0.28],
    ],
    bulkyOversize: [
      [0.76, 11.49],
      [-1, 0.51],
    ],
    heavyOversize: [
      [31.5, 14.0],
      [-1, 0.12],
    ],
    specialOversize: [
      [30.0, 19.93],
      [40.0, 20.8],
      [50.0, 34.32],
      [60.0, 36.93],
      [-1, 0.45],
    ],
  },
};

/**
 * 低价商品阈值（单位：本地货币）
 * 当商品价格低于等于此值时适用低价费率规则
 */
export const LOW_PRICE_RULES = {
  UK: 10, // 英镑
  DE: 11, // 欧元
  FR: 12, // 欧元
  IT: 12, // 欧元
  ES: 12, // 欧元
};

/**
 * 低价商品FBA费率规则
 * 结构说明：
 * - 仅适用于价格低于阈值的商品
 * - 仅支持部分尺寸分层（信封类和小包裹）
 * - 费率规则匹配逻辑与普通规则一致
 */
export const LOW_PRICE_FBA_RATE_RULES: Record<
  CountryCode,
  Partial<Record<SizeTierKey, RateRule[]>>
> = {
  UK: {
    lightEnvelope: [
      [0.02, 1.46],
      [0.04, 1.5],
      [0.06, 1.52],
      [0.08, 1.61],
      [0.1, 1.7],
    ],
    standardEnvelope: [
      [0.21, 1.73],
      [0.46, 1.87],
    ],
    LargeEnvelope: [[0.96, 2.42]],
    extraLargeEnvelope: [[0.96, 2.65]],
    smallParcel: [
      [0.15, 2.67],
      [0.4, 2.7],
    ],
  },
  DE: {
    lightEnvelope: [
      [0.02, 1.87],
      [0.04, 1.9],
      [0.06, 1.92],
      [0.08, 2.06],
      [0.1, 2.09],
    ],
    standardEnvelope: [
      [0.21, 2.21],
      [0.46, 2.28],
    ],
    LargeEnvelope: [[0.96, 2.65]],
    extraLargeEnvelope: [[0.96, 3.04]],
    smallParcel: [
      [0.15, 3.04],
      [0.4, 3.25],
    ],
  },
  FR: {
    lightEnvelope: [
      [0.02, 2.24],
      [0.04, 2.26],
      [0.06, 2.27],
      [0.08, 2.79],
      [0.1, 2.81],
    ],
    standardEnvelope: [
      [0.21, 2.81],
      [0.46, 3.31],
    ],
    LargeEnvelope: [[0.96, 3.39]],
    extraLargeEnvelope: [[0.96, 4.31]],
    smallParcel: [
      [0.15, 4.31],
      [0.4, 4.71],
    ],
  },
  IT: {
    lightEnvelope: [
      [0.02, 2.64],
      [0.04, 2.65],
      [0.06, 2.67],
      [0.08, 2.79],
      [0.1, 2.81],
    ],
    standardEnvelope: [
      [0.21, 2.81],
      [0.46, 3.04],
    ],
    LargeEnvelope: [[0.96, 3.35]],
    extraLargeEnvelope: [[0.96, 3.59]],
    smallParcel: [
      [0.15, 3.59],
      [0.4, 3.91],
    ],
  },
  ES: {
    lightEnvelope: [
      [0.02, 2.15],
      [0.04, 2.21],
      [0.06, 2.23],
      [0.08, 2.55],
      [0.1, 2.59],
    ],
    standardEnvelope: [
      [0.21, 2.61],
      [0.46, 2.85],
    ],
    LargeEnvelope: [[0.96, 3.0]],
    extraLargeEnvelope: [[0.96, 3.23]],
    smallParcel: [
      [0.15, 3.23],
      [0.4, 3.46],
    ],
  },
};

// 单位转换常量
export const DIMENSION_UNITS = {
  MM_TO_CM: 10,
  G_TO_KG: 1000,
  VOLUME_WEIGHT_DIVISOR: 5000,
} as const;

// 特殊大件判断阈值
export const SPECIAL_OVERSIZE_THRESHOLDS = {
  MAX_LENGTH_CM: 175,
  MAX_WEIGHT_KG: 31.5,
  MAX_GIRTH_CM: 360,
} as const;
