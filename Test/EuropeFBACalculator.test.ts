import { EuropeFBACalculator } from "../Calculate/EuropeFBACalculator";

describe("EuropeFBACalculator", () => {
  test("英国小包裹运费计算", () => {
    const result = EuropeFBACalculator.calcFbaFee("UK", 300, 240, 100, 1400);
    expect(result?.[0]).toBeCloseTo(3.25);
    expect(result?.[1]).toBe(15);
  });

  test("英国小包裹运费计算", () => {
    const result = EuropeFBACalculator.calcFbaFee("DE", 300, 240, 100, 1400);
    expect(result?.[0]).toBeCloseTo(4.49);
    expect(result?.[1]).toBe(15);
  });

  test("包裹小件判断", () => {
    const result = EuropeFBACalculator.calcFbaFee("UK", 300, 240, 100, 1400);
    expect(result?.[2]).toBe("smallParcel");
  });
});
