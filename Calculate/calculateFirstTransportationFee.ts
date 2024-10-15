interface FbaTransportMethod {
  baseWeight: number; // 起重重量
  ratePerKg: number; // 每公斤的运费
}

interface FbaCountryRates {
  express: FbaTransportMethod; // 快递直发
  airDelivery: FbaTransportMethod; // 空加派
  seaDelivery: FbaTransportMethod; // 海运派送
}

// 不同国家的运输费率
const fbaCountryRates: Record<string, FbaCountryRates> = {
  US: {
    express: { baseWeight: 0.5, ratePerKg: 33 },
    airDelivery: { baseWeight: 21, ratePerKg: 36 },
    seaDelivery: { baseWeight: 71, ratePerKg: 12 },
  },
  Canada: {
    express: { baseWeight: 0.5, ratePerKg: 41.5 },
    airDelivery: { baseWeight: 21, ratePerKg: 36 },
    seaDelivery: { baseWeight: 71, ratePerKg: 12 },
  },
  UK: {
    express: { baseWeight: 0.5, ratePerKg: 43.5 },
    airDelivery: { baseWeight: 21, ratePerKg: 37.5 },
    seaDelivery: { baseWeight: 71, ratePerKg: 12 },
  },
  Germany: {
    express: { baseWeight: 0.5, ratePerKg: 43.5 },
    airDelivery: { baseWeight: 21, ratePerKg: 36.5 },
    seaDelivery: { baseWeight: 71, ratePerKg: 12 },
  },
  Japan: {
    express: { baseWeight: 0.5, ratePerKg: 0 }, // 假设无快递直发到日本
    airDelivery: { baseWeight: 21, ratePerKg: 0 }, // 假设无空加派到日本
    seaDelivery: { baseWeight: 71, ratePerKg: 11 },
  },
};

// 计算头程费用的主函数
export function calculateFirstTransportationFee(
  country: string,
  method: "express" | "airDelivery" | "seaDelivery",
  weightKg: number
): number {
  const countryRates = fbaCountryRates[country];

  if (!countryRates) {
    throw new Error("无效的国家");
  }

  const methodRates = countryRates[method];

  if (!methodRates) {
    throw new Error("无效的派送方式");
  }

  const { baseWeight, ratePerKg } = methodRates;

  if (weightKg < baseWeight) {
    throw new Error(`重量应不低于 ${baseWeight} 公斤`);
  }

  // 计算运费
  const transportationFee = weightKg * ratePerKg;

  return parseFloat(transportationFee.toFixed(2)); // 解决浮点数精度问题
}
