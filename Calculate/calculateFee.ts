import { sortedFeeRules } from "../Rules/feeRules";

export function calculateAmazonFee(
  category: string,
  totalPrice: number
): number | null {
  const rule = sortedFeeRules[category];

  if (!rule) {
    throw new Error("类别不存在"); // 未知类别，抛出错误
  }

  // 获取佣金百分比
  let fee = 0;

  if (typeof rule.percentage === "function") {
    // 如果 percentage 是函数，则调用它
    fee = rule.percentage(totalPrice);
  } else {
    // 如果 percentage 是数字，则直接计算
    fee = totalPrice * rule.percentage;
  }

  // 确保费用不低于最低费用
  if (rule.minimumFee !== null && fee < rule.minimumFee) {
    return parseFloat(rule.minimumFee.toFixed(2)); // 返回最低费用
  }

  // 返回计算后的费用，确保保留两位小数
  return parseFloat(fee.toFixed(2));
}
