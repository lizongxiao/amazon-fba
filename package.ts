import { Decimal } from "decimal.js";

export abstract class Package {
  static ONE_PLACES = 1;
  static TWO_PLACES = 2;
  static FOUR_PLACES = 4;

  _packageType: string;
  _height: Decimal;
  _length: Decimal;
  _width: Decimal;
  _weight: Decimal;
  _isApparel: boolean;

  constructor(
    packageType: string,
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    this._packageType = packageType;
    this._height = Package.decimal(height);
    this._length = Package.decimal(length);
    this._width = Package.decimal(width);
    this._weight = Package.decimal(weight);
    this._isApparel = isApparel;
  }

  public static decimal(num: number): Decimal {
    try {
      return new Decimal(num);
    } catch (e) {
      throw new TypeError("Please provide Decimal compatible values.");
    }
  }

  public static median(values: Decimal[]): Decimal {
    const sorted = values.sort((a, b) => a.cmp(b));
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      // 如果是偶数个数，返回中间两个数的平均值
      return sorted[mid - 1].add(sorted[mid]).div(2);
    } else {
      // 如果是奇数个数，返回中间的数
      return sorted[mid];
    }
  }

  public static size(
    length: Decimal,
    width: Decimal,
    height: Decimal,
    weight: Decimal
  ): string {
    let size = "Standard";
    if (
      weight.greaterThan(20) ||
      Decimal.max(length, width, height).greaterThan(18) ||
      Decimal.min(length, width, height).greaterThan(8) ||
      length.add(width).add(height).div(3).greaterThan(14)
    ) {
      size = "Oversize";
    }
    return size;
  }

  public static girth(
    length: Decimal,
    width: Decimal,
    height: Decimal
  ): Decimal {
    const girth = Decimal.max(length, width, height).add(
      this.median([length, width, height])
        .add(Decimal.min(length, width, height))
        .mul(2)
    );
    return girth.toDecimalPlaces(this.ONE_PLACES);
  }

  public dimensionalWeight(): Decimal {
    let dim = [
      this.length.toNumber(),
      this.width.toNumber(),
      this.height.toNumber(),
    ].map((n) => new Decimal(n));
    if (
      [
        "LargeBulky",
        "ExtraLargeUpto50LB",
        "ExtraLarge50to70LB",
        "ExtraLarge70to150LB",
        "ExtraLargeOver150LB",
      ].includes(this._packageType)
    ) {
      dim = dim.map((d) => (d.lessThan(2) ? new Decimal(2) : d));
    }
    const volume = dim.reduce((acc, d) => acc.mul(d), new Decimal(1));
    return volume.div(new Decimal(139)).toDecimalPlaces(Package.FOUR_PLACES);
  }

  get height(): Decimal {
    return this._height;
  }

  get length(): Decimal {
    return this._length;
  }

  get width(): Decimal {
    return this._width;
  }

  get weight(): Decimal {
    return this._weight;
  }

  get isApparel(): boolean {
    return this._isApparel;
  }
}

export class Standard extends Package {
  constructor(
    packageType: string,
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super(packageType, height, length, width, weight, isApparel);
  }

  calc_fee(): Decimal {
    // 需要实现费用计算逻辑
    return new Decimal(0);
  }

  get smallFeeRange() {
    return [
      [0, 2, 3.06, 0, 0],
      [2, 4, 3.15, 0, 0],
      [4, 6, 3.24, 0, 0],
      [6, 8, 3.33, 0, 0],
      [8, 10, 3.43, 0, 0],
      [10, 12, 3.53, 0, 0],
      [12, 14, 3.6, 0, 0],
      [14, 16, 3.65, 0, 0],
    ];
  }

  get largeFeeRange() {
    return [
      [0, 4, 3.68, 0, 0],
      [4, 8, 3.9, 0, 0],
      [8, 12, 4.15, 0, 0],
      [12, 16, 4.55, 0, 0],
      [16, 20, 4.99, 0, 0],
      [20, 24, 5.37, 0, 0],
      [24, 28, 5.52, 0, 0],
      [28, 32, 5.77, 0, 0],
      [32, 36, 5.87, 0, 0],
      [36, 40, 6.05, 0, 0],
      [40, 44, 6.21, 0, 0],
      [44, 48, 6.62, 0, 0],
      [48, 320, 6.92, 0.08, 4],
    ];
  }

  get smallFeeRangeForApparel() {
    return [
      [0, 4, 3.27, 0, 0],
      [4, 8, 3.42, 0, 0],
      [8, 12, 3.72, 0, 0],
      [12, 16, 3.98, 0, 0],
    ];
  }

  get largeFeeRangeForApparel() {
    return [
      [0, 4, 4.25, 0, 0],
      [4, 8, 4.45, 0, 0],
      [8, 12, 4.67, 0, 0],
      [12, 16, 5.12, 0, 0],
      [16, 24, 5.9, 0, 0],
      [24, 32, 6.14, 0, 0],
      [32, 40, 6.6, 0, 0],
      [40, 48, 6.81, 0, 0],
      [48, 320, 6.92, 0.16, 8],
    ];
  }
}

export class Oversize extends Package {
  protected shippingWeight: Decimal;

  constructor(
    packageType: string,
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super(packageType, height, length, width, weight, isApparel);
    const dimensionalWeight = this.dimensionalWeight();
    this.shippingWeight = dimensionalWeight.greaterThan(this.weight)
      ? dimensionalWeight
      : this.weight;
  }

  calc_fee(): Decimal {
    // 需要实现费用计算逻辑
    return new Decimal(0);
  }
}

export class SmallStandard extends Standard {
  protected shippingWeight: Decimal;
  constructor(
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super("SmallStandard", height, length, width, weight, isApparel);
    this.shippingWeight = this.weight;
  }

  calc_fee(): Decimal {
    const feeRange = this.isApparel
      ? this.smallFeeRangeForApparel
      : this.smallFeeRange;
    const weightOz = this.shippingWeight.toNumber() * 16;
    let fbaFee = new Decimal(0);
    for (const [low, up, fee] of feeRange) {
      if (low < weightOz && weightOz <= up) {
        fbaFee = new Decimal(fee);
        break;
      }
    }
    return fbaFee.toDecimalPlaces(Package.TWO_PLACES);
  }
}

export class LargeStandard extends Standard {
  protected shippingWeight: Decimal;

  constructor(
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super("LargeStandard", height, length, width, weight, isApparel);
    const dimensionalWeight = new Decimal(this.dimensionalWeight()); // 确保是 Decimal 类型
    this.shippingWeight = dimensionalWeight.greaterThan(new Decimal(weight))
      ? dimensionalWeight
      : new Decimal(weight);
  }

  calc_fee(): Decimal {
    const feeRange = this.isApparel
      ? this.largeFeeRangeForApparel
      : this.largeFeeRange;

    const weightOz = this.shippingWeight.toNumber() * 16; // 转换为盎司
    let fbaFee = new Decimal(0);

    for (const [low, up, fee, unitFee, per] of feeRange) {
      if (low < weightOz && weightOz <= up) {
        fbaFee =
          unitFee && per
            ? new Decimal(fee).add(
                new Decimal(unitFee).mul(Math.ceil((weightOz - low) / per))
              )
            : new Decimal(fee);
        break;
      }
    }
    return fbaFee.toDecimalPlaces(Package.TWO_PLACES); // 返回 Decimal 类型
  }
}

export class LargeBulky extends Oversize {
  constructor(
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super("LargeBulky", height, length, width, weight, isApparel);
  }

  calc_fee(): Decimal {
    // 获取重量（转换为浮点数）
    const weightLb = this.shippingWeight.toNumber();

    // 计算 FBA 费用，使用公式 9.61 + 0.38 * math.ceil(weight_lb - 1)
    const fbaFee = new Decimal(9.61).plus(
      new Decimal(0.38).mul(Math.ceil(weightLb - 1))
    );

    // 返回保留两位小数的费用
    return fbaFee.toDecimalPlaces(Package.TWO_PLACES);
  }
}

export class ExtraLargeUpto50LB extends Oversize {
  constructor(
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super("ExtraLargeUpto50LB", height, length, width, weight, isApparel);
  }

  calc_fee(): Decimal {
    // 获取重量（转换为浮点数）
    const weightLb = this.shippingWeight.toNumber();

    // 计算 FBA 费用，使用公式 26.33 + 0.38 * math.ceil(weight_lb - 1)
    const fbaFee = new Decimal(26.33).plus(
      new Decimal(0.38).mul(Math.ceil(weightLb - 1))
    );

    // 返回保留两位小数的费用
    return fbaFee.toDecimalPlaces(Package.TWO_PLACES);
  }
}

export class ExtraLarge50to70LB extends Oversize {
  constructor(
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super("ExtraLarge50to70LB", height, length, width, weight, isApparel);
  }

  calc_fee(): Decimal {
    const weightLb = this.shippingWeight.toNumber();
    const fbaFee = new Decimal(40.12).add(
      new Decimal(0.75).mul(Math.ceil(weightLb - 51))
    );
    return fbaFee.toDecimalPlaces(Package.TWO_PLACES);
  }
}

export class ExtraLarge70to150LB extends Oversize {
  constructor(
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super("ExtraLarge70to150LB", height, length, width, weight, isApparel);
  }

  calc_fee(): Decimal {
    const weightLb = this.shippingWeight.toNumber();
    const fbaFee = new Decimal(54.81).add(
      new Decimal(0.75).mul(Math.ceil(weightLb - 71))
    );
    return fbaFee.toDecimalPlaces(Package.TWO_PLACES);
  }
}

export class ExtraLargeOver150LB extends Oversize {
  constructor(
    height: number,
    length: number,
    width: number,
    weight: number,
    isApparel: boolean = false
  ) {
    super("ExtraLargeOver150LB", height, length, width, weight, isApparel);
  }

  calc_fee(): Decimal {
    const weightLb = this.shippingWeight.toNumber();
    const fbaFee = new Decimal(194.95).add(
      new Decimal(0.19).mul(Math.ceil(weightLb - 151))
    );
    return fbaFee.toDecimalPlaces(Package.TWO_PLACES);
  }
}
