import { fbaCountryRates } from "../Rules/fbaCountryRates";

interface Size {
  l: number;
  w: number;
  h: number;
  wt: number;
}

// 计算头程费用的主函数
export function calculateFirstTransportationFee(
  country: string,
  method: "airDelivery" | "seaDelivery" | any,
  size: Size
): { result: number; methodRates: any } {
  const countryRates: any = fbaCountryRates[country];

  if (!countryRates) {
    throw new Error("无效的国家");
  }

  const methodRates: any = countryRates[method];

  if (!methodRates) {
    throw new Error("无效的派送方式");
  }

  const { l, w, h, wt } = size;

  // 计算体积费用
  const VolumeCost = ((l * w * h) / 6000) * methodRates.unitPrice;

  // 计算重量费用
  const WeightCost = wt * methodRates.unitPrice;

  // 计算运费，取最大值
  const transportationFee = Math.max(VolumeCost, WeightCost);

  // 将运费保留两位小数
  return { result: parseFloat(transportationFee.toFixed(2)), methodRates };
}
