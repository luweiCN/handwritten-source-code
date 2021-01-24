import assert from "assert";
import lodashStable from "lodash";
import {
    stubTrue,
    stubFalse,
    MAX_INTEGER,
    falsey,
    symbol,
    args,
} from "./utils.js";
import isInteger from "../src/isInteger";

describe("isInteger方法", function () {
    it("isInteger对于整数参数应该返回true", function () {
        var values = [-1, 0, 1],
            expected = lodashStable.map(values, stubTrue);

        var actual = lodashStable.map(values, function (value) {
            return isInteger(value);
        });

        assert.deepStrictEqual(actual, expected);
        assert.strictEqual(isInteger(MAX_INTEGER), false);
    });

    it("isInteger对于整数参数应该返回false", function () {
        var values = [NaN, Infinity, -Infinity, Object(1), 3.14],
            expected = lodashStable.map(values, stubFalse);

        var actual = lodashStable.map(values, function (value) {
            return isInteger(value);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it("isInteger对于非数字类型的值应该返回false", function () {
        var expected = lodashStable.map(falsey, function (value) {
            return value === 0;
        });

        var actual = lodashStable.map(falsey, function (value, index) {
            return index ? isInteger(value) : isInteger();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isInteger(args), false);
        assert.strictEqual(isInteger([1, 2, 3]), false);
        assert.strictEqual(isInteger(true), false);
        assert.strictEqual(isInteger(new Date()), false);
        assert.strictEqual(isInteger(new Error()), false);
        assert.strictEqual(isInteger({ a: 1 }), false);
        assert.strictEqual(isInteger(/x/), false);
        assert.strictEqual(isInteger("a"), false);
        assert.strictEqual(isInteger(symbol), false);
    });
});
