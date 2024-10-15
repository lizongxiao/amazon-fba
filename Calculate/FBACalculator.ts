// FBACalculator.ts
import { Decimal } from "decimal.js";
import * as pkg from "../package"; // 假设你的 package 文件在同一目录下
import _ from "lodash";

export class FBACalculator {
  private static PACKAGE_TYPES: Record<string, any> = {
    SmallStandard: pkg.SmallStandard,
    LargeStandard: pkg.LargeStandard,
    LargeBulky: pkg.LargeBulky,
    ExtraLargeUpto50LB: pkg.ExtraLargeUpto50LB,
    ExtraLarge50to70LB: pkg.ExtraLarge50to70LB,
    ExtraLarge70to150LB: pkg.ExtraLarge70to150LB,
    ExtraLargeOver150LB: pkg.ExtraLargeOver150LB,
  };

  private static SIZE_TIER_MAP: Record<string, number> = {
    SmallStandard: 1,
    LargeStandard: 2,
    LargeBulky: 3,
    ExtraLargeUpto50LB: 4,
    ExtraLarge50to70LB: 5,
    ExtraLarge70to150LB: 6,
    ExtraLargeOver150LB: 7,
  };

  private _height: Decimal;
  private _length: Decimal;
  private _width: Decimal;
  private _weight: Decimal;
  private _is_apparel: boolean;
  private _size: string;
  private _girth: Decimal;
  private _tier: string;
  private _package: any;

  constructor(
    length: number,
    width: number,
    height: number,
    weight: number,
    is_apparel: boolean = false
  ) {
    this._height = pkg.Package.decimal(height);
    this._length = pkg.Package.decimal(length);
    this._width = pkg.Package.decimal(width);
    this._weight = pkg.Package.decimal(weight);
    this._is_apparel = is_apparel;

    this._size = pkg.Package.size(
      this.length,
      this.width,
      this.height,
      this.weight
    );
    this._girth = pkg.Package.girth(this.length, this.width, this.height);
    this._tier = this._size_tier();
    this._package = this.the_package();
  }

  median(arr: number[]) {
    const sorted = _.sortBy(arr);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  fees(): Decimal {
    return this.package ? this.package.calc_fee() : new Decimal(0);
  }

  private the_package() {
    const packageCls = this._package_class();
    return packageCls
      ? new packageCls(
          this.height,
          this.length,
          this.width,
          this.weight,
          this._is_apparel
        )
      : null;
  }

  private _package_class() {
    return FBACalculator.PACKAGE_TYPES[this.tier_str] || null;
  }

  private _size_tier() {
    return this.size === "Standard" ? this._standard() : this._oversize();
  }

  private _standard(): string {
    const small = [
      this.weight.lessThanOrEqualTo(1.0),
      Decimal.max(this.length, this.width, this.height).lessThanOrEqualTo(15),
      Decimal.min(this.length, this.width, this.height).lessThanOrEqualTo(0.75),
      this.median([
        this.length.toNumber(),
        this.width.toNumber(),
        this.height.toNumber(),
      ]) <= 12,
    ];
    return small.every(Boolean) ? "SmallStandard" : "LargeStandard";
  }

  private _oversize(): string {
    const large_bulky = [
      this.weight.lessThanOrEqualTo(50),
      Decimal.max(this.length, this.width, this.height).lessThanOrEqualTo(59),
      Decimal.min(this.length, this.width, this.height).lessThanOrEqualTo(33),
      this.median([
        this.length.toNumber(),
        this.width.toNumber(),
        this.height.toNumber(),
      ]) <= 33,
      this.length.add(this.girth).lessThanOrEqualTo(130),
    ];
    const extra_large = [
      Decimal.max(this.length, this.width, this.height).greaterThan(59),
      Decimal.min(this.length, this.width, this.height).greaterThan(33),
      this.median([
        this.length.toNumber(),
        this.width.toNumber(),
        this.height.toNumber(),
      ]) > 33,
      this.length.add(this.girth).greaterThan(130),
      this.weight.greaterThan(50),
    ];

    if (large_bulky.every(Boolean)) {
      return "LargeBulky";
    }
    if (extra_large.some(Boolean)) {
      if (this.weight.lessThanOrEqualTo(50)) {
        return "ExtraLargeUpto50LB";
      } else if (this.weight.lessThanOrEqualTo(70)) {
        return "ExtraLarge50to70LB";
      } else if (this.weight.lessThanOrEqualTo(150)) {
        return "ExtraLarge70to150LB";
      } else {
        return "ExtraLargeOver150LB";
      }
    }
    return "";
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

  get is_apparel(): boolean {
    return this._is_apparel;
  }

  get size(): string {
    return this._size;
  }

  get tier(): number {
    return FBACalculator.SIZE_TIER_MAP[this._tier] || 0;
  }

  get tier_str(): string {
    return this._tier;
  }

  get girth(): Decimal {
    return this._girth;
  }

  get package(): any {
    return this._package;
  }
}
