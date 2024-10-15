import { calculateFirstTransportationFee } from "../Calculate/calculateFirstTransportationFee";

describe("calculateFirstTransportationFee", () => {
  // 美国测试用例
  // 空运大体积
  test("美国空加派，大体积（100x100x100），重量21公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "US",
      "airDelivery",
      {
        l: 100,
        w: 100,
        h: 100,
        wt: 21, // 使用21公斤
      }
    );
    const expectedCost = ((100 * 100 * 100) / 6000) * methodRates.unitPrice; // 体积计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 空运大重量
  test("美国空加派，大重量（10x10x10），重量40公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "US",
      "airDelivery",
      {
        l: 10,
        w: 10,
        h: 10,
        wt: 40, // 使用40公斤
      }
    );
    const expectedCost = 40 * methodRates.unitPrice; // 重量计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 海运大体积
  test("美国海运派送，大体积（200x200x200），重量71公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "US",
      "seaDelivery",
      {
        l: 200,
        w: 200,
        h: 200,
        wt: 71, // 使用71公斤
      }
    );
    const expectedCost = ((200 * 200 * 200) / 6000) * methodRates.unitPrice; // 体积计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 海运大重量
  test("美国海运派送，大重量（20x20x20），重量100公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "US",
      "seaDelivery",
      {
        l: 20,
        w: 20,
        h: 20,
        wt: 100, // 使用100公斤
      }
    );
    const expectedCost = 100 * methodRates.unitPrice; // 重量计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 德国测试用例
  // 空运大体积
  test("德国空加派，大体积（100x100x100），重量21公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "germany",
      "airDelivery",
      {
        l: 100,
        w: 100,
        h: 100,
        wt: 21, // 使用21公斤
      }
    );
    const expectedCost = ((100 * 100 * 100) / 6000) * methodRates.unitPrice; // 体积计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 空运大重量
  test("德国空加派，大重量（10x10x10），重量40公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "germany",
      "airDelivery",
      {
        l: 10,
        w: 10,
        h: 10,
        wt: 40, // 使用40公斤
      }
    );
    const expectedCost = 40 * methodRates.unitPrice; // 重量计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 海运大体积
  test("德国海运派送，大体积（200x200x200），重量71公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "germany",
      "seaDelivery",
      {
        l: 200,
        w: 200,
        h: 200,
        wt: 71, // 使用71公斤
      }
    );
    const expectedCost = ((200 * 200 * 200) / 6000) * methodRates.unitPrice; // 体积计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 海运大重量
  test("德国海运派送，大重量（20x20x20），重量100公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "germany",
      "seaDelivery",
      {
        l: 20,
        w: 20,
        h: 20,
        wt: 100, // 使用100公斤
      }
    );
    const expectedCost = 100 * methodRates.unitPrice; // 重量计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 英国测试用例
  // 空运大体积
  test("英国空加派，大体积（100x100x100），重量21公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "UK",
      "airDelivery",
      {
        l: 100,
        w: 100,
        h: 100,
        wt: 21, // 使用21公斤
      }
    );
    const expectedCost = ((100 * 100 * 100) / 6000) * methodRates.unitPrice; // 体积计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 空运大重量
  test("英国空加派，大重量（10x10x10），重量40公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "UK",
      "airDelivery",
      {
        l: 10,
        w: 10,
        h: 10,
        wt: 40, // 使用40公斤
      }
    );
    const expectedCost = 40 * methodRates.unitPrice; // 重量计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 海运大体积
  test("英国海运派送，大体积（200x200x200），重量71公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "UK",
      "seaDelivery",
      {
        l: 200,
        w: 200,
        h: 200,
        wt: 71, // 使用71公斤
      }
    );
    const expectedCost = ((200 * 200 * 200) / 6000) * methodRates.unitPrice; // 体积计算
    expect(result).toBeCloseTo(expectedCost);
  });

  // 海运大重量
  test("英国海运派送，大重量（20x20x20），重量100公斤", () => {
    const { result, methodRates } = calculateFirstTransportationFee(
      "UK",
      "seaDelivery",
      {
        l: 20,
        w: 20,
        h: 20,
        wt: 100, // 使用100公斤
      }
    );
    const expectedCost = 100 * methodRates.unitPrice; // 重量计算
    expect(result).toBeCloseTo(expectedCost);
  });

  test("无效国家", () => {
    expect(() => {
      calculateFirstTransportationFee("InvalidCountry", "airDelivery", {
        l: 10,
        w: 10,
        h: 10,
        wt: 10,
      });
    }).toThrow("无效的国家");
  });

  test("无效派送方式", () => {
    expect(() => {
      calculateFirstTransportationFee("US", "other", {
        l: 10,
        w: 10,
        h: 10,
        wt: 10,
      });
    }).toThrow("无效的派送方式");
  });
});
