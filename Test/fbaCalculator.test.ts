// fbaCalculator.test.ts

import { FBACalculator } from "../Calculate/FBACalculator"; // 根据你的实际文件路径调整

const SIZE_TIER_MAP: { [key: string]: number } = {
  SmallStandard: 1,
  LargeStandard: 2,
  LargeBulky: 3,
  ExtraLargeUpto50LB: 4,
  ExtraLarge50to70LB: 5,
  ExtraLarge70to150LB: 6,
  ExtraLargeOver150LB: 7,
};

describe("TestingFBACalculator", () => {
  test("should calculate fees for small standard size", () => {
    const [l, w, h, wt] = [13.8, 9, 0.7, 0.18];
    const fbaCalc = new FBACalculator(l, w, h, wt, false);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["SmallStandard"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(3.15, 2);
  });

  test("should calculate fees for large standard size for apparel", () => {
    const [l, w, h, wt] = [13, 9, 0.85, 0.3375];
    const fbaCalc = new FBACalculator(l, w, h, wt, true);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["LargeStandard"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(4.67, 2);
  });

  test("should calculate fees for large standard size", () => {
    const [l, w, h, wt] = [12.6, 6.6, 5.5, 3.35];
    const fbaCalc = new FBACalculator(l, w, h, wt, false);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["LargeStandard"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(7.08, 2);
  });

  test("should calculate fees for large bulky size", () => {
    const [l, w, h, wt] = [24, 7.5, 6, 7.9];
    const fbaCalc = new FBACalculator(l, w, h, wt, false);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["LargeBulky"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(12.27, 2);
  });

  test("should calculate fees for extra large up to 50LB", () => {
    const [l, w, h, wt] = [54, 35, 3.5, 41];
    const fbaCalc = new FBACalculator(l, w, h, wt, false);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["ExtraLargeUpto50LB"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(44.19, 2);
  });

  test("should calculate fees for extra large 50 to 70LB", () => {
    const [l, w, h, wt] = [65, 20, 7, 62];
    const fbaCalc = new FBACalculator(l, w, h, wt, false);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["ExtraLarge50to70LB"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(51.37, 2);
  });

  test("should calculate fees for extra large 70 to 150LB", () => {
    const [l, w, h, wt] = [35, 20, 10, 120]; // 假设输入的数据
    const fbaCalc = new FBACalculator(l, w, h, wt, false);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["ExtraLarge70to150LB"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(91.56, 2);
  });

  test("should calculate fees for extra large over 150LB", () => {
    const [l, w, h, wt] = [39, 23, 23, 160]; // 假设输入的数据
    const fbaCalc = new FBACalculator(l, w, h, wt, false);
    expect(fbaCalc.tier).toBe(SIZE_TIER_MAP["ExtraLargeOver150LB"]);
    expect(parseFloat(fbaCalc.fees().toString())).toBeCloseTo(196.66, 2);
  });
});
