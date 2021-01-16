const { resolve } = require("./my-promise");
const MyPromise = require("./my-promise");

// 实现一个prsaomise的延迟对象 defer
MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = MyPromise;
