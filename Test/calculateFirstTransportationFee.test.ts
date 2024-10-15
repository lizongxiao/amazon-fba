import { calculateFirstTransportationFee } from "../Calculate/calculateFirstTransportationFee";

describe("calculateFirstTransportationFee", () => {
  test("美国快递直发，21公斤", () => {
    const result = calculateFirstTransportationFee("US", "express", 21);
    expect(result).toBe(693); // 21 * 33
  });

  test("加拿大空加派，23公斤", () => {
    const result = calculateFirstTransportationFee("Canada", "airDelivery", 23);
    expect(result).toBe(828); // 23 * 36
  });

  test("英国海运派送，71公斤", () => {
    const result = calculateFirstTransportationFee("UK", "seaDelivery", 71);
    expect(result).toBe(852); // 71 * 12
  });

  test("日本海运派送，100公斤", () => {
    const result = calculateFirstTransportationFee("Japan", "seaDelivery", 100);
    expect(result).toBe(1100); // 100 * 11
  });
});
