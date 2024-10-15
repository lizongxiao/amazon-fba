export interface FbaTransportMethod {
  unitPrice: number; // 运费单价($/kg)
}

export interface FbaCountryRates {
  airDelivery: FbaTransportMethod; // 空
  seaDelivery: FbaTransportMethod; // 海
}

export const fbaCountryRates: Record<string, FbaCountryRates> = {
  US: {
    airDelivery: { unitPrice: 32 },
    seaDelivery: { unitPrice: 12 },
  },
  germany: {
    airDelivery: { unitPrice: 45 },
    seaDelivery: { unitPrice: 12 },
  },
  UK: {
    airDelivery: { unitPrice: 45 },
    seaDelivery: { unitPrice: 12 },
  },
};
