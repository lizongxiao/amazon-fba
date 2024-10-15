import { calculateAmazonFee } from "../Calculate/calculateAmazonFee";

describe("calculateAmazonFee", () => {
  // 收取买家的运费
  let chargeOfBuyer: number = 10;

  test("应返回正确的费用用于亚马逊设备配件", () => {
    let income = 100 + chargeOfBuyer;
    const result = calculateAmazonFee("Amazon Device Accessories", income);
    expect(result).toBe(49.5);
  });

  test("应返回正确的费用用于珠宝", () => {
    let income = 1000 + chargeOfBuyer;
    const result = calculateAmazonFee("Jewelry", income);
    expect(result).toBe(88);
  });

  test("应返回正确的费用用于珠宝，超过250的情况", () => {
    let income = 300 + chargeOfBuyer;
    const result = calculateAmazonFee("Jewelry", income);
    expect(result).toBe(53.0);
  });

  test("应返回正确的费用用于视频游戏及配件", () => {
    let income = 200 + chargeOfBuyer;
    const result = calculateAmazonFee(
      "Video Games and Gaming Accessories",
      income
    );
    expect(result).toBe(31.5);
  });

  test("应返回最低费用，如果计算的费用低于最低费用", () => {
    let income = 0.5 + chargeOfBuyer;
    const result = calculateAmazonFee("Amazon Device Accessories", income);
    expect(result).toBe(4.73);
  });

  test("应抛出错误，对于不存在的类别", () => {
    let income = 100 + chargeOfBuyer;
    expect(() => {
      calculateAmazonFee("不存在的类别", income);
    }).toThrow("类别不存在");
  });
});
