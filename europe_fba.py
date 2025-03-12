# ---encoding:utf-8---
# @Time    : 2025/2/14 09:23
# @Author  : ZhangWeiPeng
"""
欧洲的FBA费用计算，参考：
https://sellercentral-europe.amazon.com/help/hub/reference/external/GABBX6GZPA8MSZGW?locale=zh-CN
https://sellercentral-europe.amazon.com/help/hub/reference/external/G2CD5P9TSDYZA2XG?locale=zh-CN
https://sellercentral-europe.amazon.com/help/hub/reference/external/GJKUWLPELK47CJS7?locale=zh-CN
"""

SIZE_TIER_MAP = {
    "lightEnvelope": 11,
    "standardEnvelope": 12,
    "LargeEnvelope": 13,
    "extraLargeEnvelope": 14,
    "smallParcel": 15,
    "standardParcel": 16,
    "smallOversize": 17,
    "standardOversizeLight": 18,
    "standardOversizeHeavy": 19,
    "standardOversizeLarge": 20,
    "bulkyOversize": 21,
    "heavyOversize": 22,
    "specialOversize": 23,
}

SIZE_TIER_NAME_MAP = {
    11: "Light envelope, 轻型信封",
    12: "Standard envelope, 标准信封",
    13: "Large envelope, 大号信封",
    14: "Extra-large envelope, 超大号信封",
    15: "Small parcel, 小包裹",
    16: "Standard parcel, 标准包裹",
    17: "Small oversize, 小号大件",
    18: "Standard oversize light, 轻型标准大件",
    19: "Standard oversize heavy, 重型标准大件",
    20: "Standard oversize large, 大号标准大件",
    21: "Bulky oversize, 特大号大件",
    22: "Heavy oversize, 超重型大件",
    23: "Special oversize, 特殊大件",
}

# 尺寸分段规则表
SIZE_TIERS = [
    # 信封类
    {
        "name_cn": "轻型信封",
        "name": "lightEnvelope",
        "max_weight": 0.1,
        "max_vol_weight": None,
        "dims": (33, 23, 2.5),
    },
    {
        "name_cn": "标准信封",
        "name": "standardEnvelope",
        "max_weight": 0.46,
        "max_vol_weight": None,
        "dims": (33, 23, 2.5),
    },
    {
        "name_cn": "大号信封",
        "name": "LargeEnvelope",
        "max_weight": 0.96,
        "max_vol_weight": None,
        "dims": (33, 23, 4),
    },
    {
        "name_cn": "超大号信封",
        "name": "extraLargeEnvelope",
        "max_weight": 0.96,
        "max_vol_weight": None,
        "dims": (33, 23, 6),
    },
    # 包裹类
    {
        "name_cn": "小包裹",
        "name": "smallParcel",
        "max_weight": 3.9,
        "max_vol_weight": 2.1,
        "dims": (35, 25, 12),
    },
    {
        "name_cn": "标准包裹",
        "name": "standardParcel",
        "max_weight": 11.9,
        "max_vol_weight": 7.96,
        "dims": (45, 34, 26),
    },
    # 大件类
    {
        "name_cn": "小号大件",
        "name": "smallOversize",
        "max_weight": 1.76,
        "max_vol_weight": 25.82,
        "dims": (61, 46, 46),
    },
    {
        "name_cn": "轻型标准大件",
        "name": "standardOversizeLight",
        "max_weight": 15,
        "max_vol_weight": 72.72,
        "dims": (101, 60, 60),
    },
    {
        "name_cn": "重型标准大件",
        "name": "standardOversizeHeavy",
        "max_weight": 23,
        "max_vol_weight": 72.72,
        "dims": (101, 60, 60),
    },
    {
        "name_cn": "大号标准大件",
        "name": "standardOversizeLarge",
        "max_weight": 23,
        "max_vol_weight": 86.4,
        "dims": (120, 60, 60),
    },
    {
        "name_cn": "特大号大件",
        "name": "bulkyOversize",
        "max_weight": 23,
        "max_vol_weight": 126,
        "dims": (None, None, None),
    },
    {
        "name_cn": "超重型大件",
        "name": "heavyOversize",
        "max_weight": 31.5,
        "max_vol_weight": 126,
        "dims": (None, None, None),
    },
]

FBA_RATE_RULES = {
    "UK": {
        "lightEnvelope": [(0.02, 1.83), (0.04, 1.87), (0.06, 1.89), (0.08, 2.07), (0.1, 2.08)],
        "standardEnvelope": [(0.21, 2.1), (0.46, 2.16)],
        "LargeEnvelope": [(0.96, 2.72)],
        "extraLargeEnvelope": [(0.96, 2.94)],
        "smallParcel": [(0.15, 2.91), (0.4, 3.0), (0.9, 3.04), (1.4, 3.05), (1.9, 3.25), (3.9, 5.1)],
        "standardParcel": [
            (0.15, 2.94),
            (0.4, 3.01),
            (0.9, 3.06),
            (1.4, 3.26),
            (1.9, 3.48),
            (2.9, 4.73),
            (3.9, 5.16),
            (5.9, 5.19),
            (8.9, 5.57),
            (11.9, 5.77),
        ],
        "smallOversize": [(0.76, 3.65), (-1, 0.25)],
        "standardOversizeLight": [(0.76, 4.67), (-1, 0.24)],
        "standardOversizeHeavy": [(15.76, 8.28), (-1, 0.2)],
        "standardOversizeLarge": [(0.76, 6.2), (-1, 0.16)],
        "bulkyOversize": [(0.76, 11.53), (-1, 0.31)],
        "heavyOversize": [(31.5, 13.04), (-1, 0.09)],
        "specialOversize": [
            (30.0, 16.22),
            (40.0, 17.24),
            (50.0, 34.38),
            (60.0, 42.04),
            (-1, 0.35),
        ],
    },
    "DE": {
        "lightEnvelope": [(0.02, 2.33), (0.04, 2.37), (0.06, 2.39), (0.08, 2.52), (0.1, 2.54)],
        "standardEnvelope": [(0.21, 2.57), (0.46, 2.68)],
        "LargeEnvelope": [(0.96, 3.04)],
        "extraLargeEnvelope": [(0.96, 3.42)],
        "smallParcel": [(0.15, 3.38), (0.4, 3.4), (0.9, 3.67), (1.4, 4.29), (1.9, 4.49), (3.9, 5.57)],
        "standardParcel": [
            (0.15, 3.39),
            (0.4, 3.78),
            (0.9, 3.9),
            (1.4, 4.54),
            (1.9, 4.97),
            (2.9, 5.2),
            (3.9, 5.67),
            (5.9, 5.95),
            (8.9, 6.41),
            (11.9, 6.65),
        ],
        "smallOversize": [(0.76, 4.79), (-1, 0.48)],
        "standardOversizeLight": [(0.76, 4.91), (-1, 0.29)],
        "standardOversizeHeavy": [(15.76, 9.19), (-1, 0.14)],
        "standardOversizeLarge": [(0.76, 6.67), (-1, 0.18)],
        "bulkyOversize": [(0.76, 9.78), (-1, 0.36)],
        "heavyOversize": [(31.5, 13.0), (-1, 0.15)],
        "specialOversize": [(30.0, 21.3), (40.0, 24.19), (50.0, 47.98), (60.0, 51.99), (-1, 0.36)],
    },
    "FR": {
        "lightEnvelope": [(0.02, 2.75), (0.04, 2.76), (0.06, 2.78), (0.08, 3.3), (0.1, 3.32)],
        "standardEnvelope": [(0.21, 3.33), (0.46, 3.77)],
        "LargeEnvelope": [(0.96, 4.39)],
        "extraLargeEnvelope": [(0.96, 4.72)],
        "smallParcel": [(0.15, 4.56), (0.4, 5.07), (0.9, 5.79), (1.4, 5.87), (1.9, 6.1), (3.9, 9.1)],
        "standardParcel": [
            (0.15, 4.58),
            (0.4, 5.4),
            (0.9, 6.28),
            (1.4, 6.41),
            (1.9, 6.84),
            (2.9, 9.36),
            (3.9, 9.55),
            (5.9, 9.67),
            (8.9, 10.53),
            (11.9, 11.03),
        ],
        "smallOversize": [(0.76, 7.23), (-1, 0.24)],
        "standardOversizeLight": [(0.76, 7.61), (-1, 0.38)],
        "standardOversizeHeavy": [(15.76, 13.0), (-1, 0.09)],
        "standardOversizeLarge": [(0.76, 9.07), (-1, 0.23)],
        "bulkyOversize": [(0.76, 16.92), (-1, 0.54)],
        "heavyOversize": [(31.5, 22.02), (-1, 0.18)],
        "specialOversize": [(30.0, 24.88), (40.0, 32.04), (50.0, 54.51), (60.0, 58.64), (-1, 0.4)],
    },
    "IT": {
        "lightEnvelope": [(0.02, 3.23), (0.04, 3.26), (0.06, 3.28), (0.08, 3.39), (0.1, 3.41)],
        "standardEnvelope": [(0.21, 3.45), (0.46, 3.64)],
        "LargeEnvelope": [(0.96, 3.94)],
        "extraLargeEnvelope": [(0.96, 4.17)],
        "smallParcel": [(0.15, 4.13), (0.4, 4.54), (0.9, 4.95), (1.4, 5.51), (1.9, 5.81), (3.9, 6.93)],
        "standardParcel": [
            (0.15, 4.29),
            (0.4, 4.7),
            (0.9, 5.15),
            (1.4, 5.81),
            (1.9, 6.05),
            (2.9, 6.71),
            (3.9, 6.96),
            (5.9, 7.25),
            (8.9, 8.04),
            (11.9, 8.63),
        ],
        "smallOversize": [(0.76, 7.39), (-1, 0.12)],
        "standardOversizeLight": [(0.76, 7.78), (-1, 0.38)],
        "standardOversizeHeavy": [(15.76, 13.31), (-1, 0.18)],
        "standardOversizeLarge": [(0.76, 9.74), (-1, 0.2)],
        "bulkyOversize": [(0.76, 11.13), (-1, 0.38)],
        "heavyOversize": [(31.5, 16.85), (-1, 0.15)],
        "specialOversize": [(30.0, 19.91), (40.0, 22.11), (50.0, 29.53), (60.0, 30.11), (-1, 0.6)],
    },
    "ES": {
        "lightEnvelope": [(0.02, 2.77), (0.04, 2.84), (0.06, 2.87), (0.08, 3.21), (0.1, 3.23)],
        "standardEnvelope": [(0.21, 3.26), (0.46, 3.45)],
        "LargeEnvelope": [(0.96, 3.6)],
        "extraLargeEnvelope": [(0.96, 3.85)],
        "smallParcel": [(0.15, 3.52), (0.4, 3.74), (0.9, 3.95), (1.4, 4.21), (1.9, 4.27), (3.9, 5.5)],
        "standardParcel": [
            (0.15, 3.55),
            (0.4, 4.05),
            (0.9, 4.45),
            (1.4, 4.85),
            (1.9, 4.94),
            (2.9, 4.98),
            (3.9, 5.53),
            (5.9, 7.02),
            (8.9, 7.24),
            (11.9, 7.85),
        ],
        "smallOversize": [(0.76, 5.86), (-1, 0.1)],
        "standardOversizeLight": [(0.76, 6.91), (-1, 0.47)],
        "standardOversizeHeavy": [(15.76, 13.5), (-1, 0.07)],
        "standardOversizeLarge": [(0.76, 7.88), (-1, 0.28)],
        "bulkyOversize": [(0.76, 11.49), (-1, 0.51)],
        "heavyOversize": [(31.5, 14.0), (-1, 0.12)],
        "specialOversize": [(30.0, 19.93), (40.0, 20.8), (50.0, 34.32), (60.0, 36.93), (-1, 0.45)],
    },
}

# 低价商品FBA费率规则
LOW_PRICE_RULES = {"UK": 10, "DE": 11, "FR": 12, "IT": 12, "ES": 12}
LOW_PRICE_FBA_RATE_RULES = {
    "UK": {
        "lightEnvelope": [(0.02, 1.46), (0.04, 1.5), (0.06, 1.52), (0.08, 1.61), (0.1, 1.7)],
        "standardEnvelope": [(0.21, 1.73), (0.46, 1.87)],
        "LargeEnvelope": [(0.96, 2.42)],
        "extraLargeEnvelope": [(0.96, 2.65)],
        "smallParcel": [(0.15, 2.67), (0.4, 2.7)],
    },
    "DE": {
        "lightEnvelope": [(0.02, 1.87), (0.04, 1.9), (0.06, 1.92), (0.08, 2.06), (0.1, 2.09)],
        "standardEnvelope": [(0.21, 2.21), (0.46, 2.28)],
        "LargeEnvelope": [(0.96, 2.65)],
        "extraLargeEnvelope": [(0.96, 3.04)],
        "smallParcel": [(0.15, 3.04), (0.4, 3.25)],
    },
    "FR": {
        "lightEnvelope": [(0.02, 2.24), (0.04, 2.26), (0.06, 2.27), (0.08, 2.79), (0.1, 2.81)],
        "standardEnvelope": [(0.21, 2.81), (0.46, 3.31)],
        "LargeEnvelope": [(0.96, 3.39)],
        "extraLargeEnvelope": [(0.96, 4.31)],
        "smallParcel": [(0.15, 4.31), (0.4, 4.71)],
    },
    "IT": {
        "lightEnvelope": [(0.02, 2.64), (0.04, 2.65), (0.06, 2.67), (0.08, 2.79), (0.1, 2.81)],
        "standardEnvelope": [(0.21, 2.81), (0.46, 3.04)],
        "LargeEnvelope": [(0.96, 3.35)],
        "extraLargeEnvelope": [(0.96, 3.59)],
        "smallParcel": [(0.15, 3.59), (0.4, 3.91)],
    },
    "ES": {
        "lightEnvelope": [(0.02, 2.15), (0.04, 2.21), (0.06, 2.23), (0.08, 2.55), (0.1, 2.59)],
        "standardEnvelope": [(0.21, 2.61), (0.46, 2.85)],
        "LargeEnvelope": [(0.96, 3.0)],
        "extraLargeEnvelope": [(0.96, 3.23)],
        "smallParcel": [(0.15, 3.23), (0.4, 3.46)],
    },
}


class EuropeFBACalculator:

    def __init__(self):
        pass

    @staticmethod
    def _calc_volume_weight(length_cm, width_cm, height_cm):
        """计算体积重量"""
        return round((length_cm * width_cm * height_cm) / 5000, 2)

    @staticmethod
    def transfer_dims(length_mm, width_mm, height_mm, weight_g):
        """单位转换"""
        length_cm = length_mm / 10
        width_cm = width_mm / 10
        height_cm = height_mm / 10
        weight_kg = weight_g / 1000
        volume_weight = EuropeFBACalculator._calc_volume_weight(length_cm, width_cm, height_cm)
        return length_cm, width_cm, height_cm, weight_kg, volume_weight

    @staticmethod
    def get_size_tier(length_mm, width_mm, height_mm, weight_g):
        """根据商品尺寸和重量判断亚马逊FBA尺寸分段（含特殊大件规则）

        :param length_mm: - 长（毫米）
        :param width_mm: - 宽（毫米）
        :param height_mm - 高（毫米）
        :param weight_g - 实际重量（克）
        """
        length_cm, width_cm, height_cm, weight_kg, volume_weight = EuropeFBACalculator.transfer_dims(
            length_mm, width_mm, height_mm, weight_g
        )

        # 排序尺寸（从大到小）
        sorted_dims = sorted([length_cm, width_cm, height_cm], reverse=True)
        longest, median, shortest = sorted_dims

        # 计算围长（将最短边和次长边的长度相加，然后乘以 2 得出围长)
        girth = longest + (median + shortest) * 2

        # 特殊大件优先判断（1.长度超过175厘米, 2.重量超过31.5千克, 3.围长超过360厘米)
        if any([longest > 175, weight_kg > 31.5, girth > 360]):
            return "specialOversize"

        # 遍历所有尺寸分段
        for tier in SIZE_TIERS:
            # 实际重量需同时满足商品重量和体积重量限制
            weight_ok = weight_kg <= tier["max_weight"]
            if not weight_ok:
                continue

            vol_ok = (tier["max_vol_weight"] is None) or (volume_weight <= tier["max_vol_weight"])
            if not vol_ok:
                continue

            # 尺寸三维检查（None表示无限制）
            dim_checks = [
                (longest <= tier["dims"][0]) if tier["dims"][0] else True,
                (median <= tier["dims"][1]) if tier["dims"][1] else True,
                (shortest <= tier["dims"][2]) if tier["dims"][2] else True,
            ]

            if all(dim_checks):
                return tier["name"]

        print("Not Match Package Size Tier!")
        return None

    @staticmethod
    def calc_fba_fee(country, length_mm, width_mm, height_mm, weight_g, price=None):
        """运费计算核心
        :param country: 国家，目前支持uk, de, fr, it, es
        :param length_mm: 长度（毫米）
        :param width_mm: 宽度（毫米）
        :param height_mm: 高度（毫米)
        :param weight_g: 重量（克）
        :param price: 价格，单位：英国(英镑)，其余国家(欧元), 符合要求可以享受低价物流配送
        """
        tier = EuropeFBACalculator.get_size_tier(length_mm, width_mm, height_mm, weight_g)
        if not tier:
            return None, None, None

        tier_value = SIZE_TIER_MAP[tier]
        country = country.upper()
        country_rules = FBA_RATE_RULES[country]
        if tier not in country_rules:
            print(f"无对应运费规则: {country}/{tier}")
            return None, tier_value, tier

        _, _, _, weight_kg, volume_weight = EuropeFBACalculator.transfer_dims(
            length_mm, width_mm, height_mm, weight_g
        )

        # 低价商品亚马逊物流
        if price is not None:
            low_price = LOW_PRICE_RULES[country]
            if price <= low_price:
                low_price_country_rules = LOW_PRICE_FBA_RATE_RULES[country]
                if tier in low_price_country_rules:
                    # 匹配低价重量区间
                    for low_price_max_weight, low_price_fee in low_price_country_rules[tier]:
                        if weight_kg <= low_price_max_weight:
                            return round(low_price_fee, 2), tier_value, tier

        # 对于信封、特殊大件商品和通过低价商品亚马逊物流配送的小包裹，使用商品重量来确定商品尺寸分段。
        # 对于所有其他商品，使用商品重量或体积重量中的较大值
        if tier in (
            "lightEnvelope",
            "standardEnvelope",
            "LargeEnvelope",
            "extraLargeEnvelope",
            "specialOversize",
        ):
            weight = weight_kg
        else:
            weight = max(weight_kg, volume_weight)

        # 查找匹配的重量区间
        rules = country_rules[tier]
        for max_weight, fee in rules:
            if weight <= max_weight:
                return round(fee, 2), tier_value, tier

        # 处理阶梯费率
        if len(rules) > 1:
            last_max, last_fee = rules[-1]
            if last_max == -1:
                base_weight, base_fee = rules[-2]
                if weight > base_weight:
                    over_weight = weight - base_weight
                    fee = base_fee + over_weight * last_fee
                    return round(fee, 2), tier_value, tier

        return None, tier_value, tier


def test():
    fba_fee, size_tier, tier_name = EuropeFBACalculator.calc_fba_fee("uk", 300, 240, 100, 1400)
    assert fba_fee == 3.25
    assert size_tier == 15
    assert tier_name == "smallParcel"

    fba_fee, size_tier, tier_name = EuropeFBACalculator.calc_fba_fee("de", 300, 240, 100, 1400)
    assert fba_fee == 4.49
    fba_fee, size_tier, tier_name = EuropeFBACalculator.calc_fba_fee("fr", 300, 240, 100, 1400)
    assert fba_fee == 6.1
    fba_fee, size_tier, tier_name = EuropeFBACalculator.calc_fba_fee("it", 300, 240, 100, 1400)
    assert fba_fee == 5.81
    fba_fee, size_tier, tier_name = EuropeFBACalculator.calc_fba_fee("es", 300, 240, 100, 1400)
    assert fba_fee == 4.27


if __name__ == "__main__":
    # test()
    fee, tier, name = EuropeFBACalculator.calc_fba_fee("uk", 120, 60, 60, 30)
    print(fee, tier, name)
