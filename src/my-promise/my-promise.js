/**
 * 动手实现一个Promise
 * @param {*} executor
 */

const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
const PENDING = "PENDING";
function MyPromise(executor) {
    this.status = PENDING;
    this.onResolveHandlers = [];
    this.onRejectHandlers = [];
    this.value = undefined;
    this.reason = undefined;
    const resolve = (value) => {
        try {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolveHandlers.forEach((handler) =>
                    handler(this.value)
                );
            }
        } catch (e) {
            this.status = REJECTED;
            this.reason = e;
            this.onRejectHandlers.forEach((handler) => handler(this.reason));
        }
    };
    const reject = (e) => {
        try {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = e;
                this.onRejectHandlers.forEach((handler) =>
                    handler(this.reason)
                );
            }
        } catch (e) {
            this.status = REJECTED;
            this.reason = e;
            this.onRejectHandlers.forEach((handler) => handler(this.reason));
        }
    };
    executor(resolve, reject);
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
        if (this.status === PENDING) {
            this.onResolveHandlers.push(function (value) {
                queueMicrotask(() => {
                    try {
                        const res =
                            typeof onFulfilled === "function"
                                ? onFulfilled(value)
                                : (value) => value;

                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                });
            });

            this.onRejectHandlers.push(function (reason) {
                queueMicrotask(() => {
                    try {
                        const res =
                            typeof onRejected === "function"
                                ? onRejected(reason)
                                : (reason) => {
                                      throw reason;
                                  };
                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        } else if (this.status === FULFILLED) {
            queueMicrotask(() => {
                try {
                    const res =
                        typeof onFulfilled === "function"
                            ? onFulfilled(this.value)
                            : () => this.value;
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            queueMicrotask(() => {
                try {
                    const res =
                        typeof onRejected === "function"
                            ? onRejected(this.reason)
                            : () => {
                                  throw this.reason;
                              };
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
        }
    });
};

MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

module.exports = MyPromise;
