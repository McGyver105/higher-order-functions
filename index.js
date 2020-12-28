const hof = {};

hof.identity = function (arg) {
    return arg;
};

hof.identityf = function (arg) {
    return () => { return arg;};
};

hof.add = function (num1, num2) {
    return num1 + num2;
};

hof.sub = function (num1, num2) {
    return num1 - num2;
};

hof.mul = function (num1, num2) {
    return num1 * num2;
};

hof.inc = function (num) {
    return hof.identity(num) + 1;
};

hof.addf = function (num) {
    return (extraNum) => {
        return num + extraNum;
    };
};

hof.curry = function (binaryFunc, numOne) {
    return (numTwo) => {
        return binaryFunc(numOne, numTwo);
    };
};

hof.liftf = function (cb) {
    return (numOne) => { 
        return (numTwo) => {
            return cb(numOne, numTwo)
        };
    };
};

hof.twice = function (cb) {
    return (num) => {
        return cb(num, num);
    };
};

hof.composeu = function (funcOne, funcTwo) {
    return (num) => {
        return funcTwo(funcOne(num));
    };
};

hof.composeb = function (funcOne, funcTwo) {
    return (...args) => {
        return funcTwo(funcOne(args[0], args[1]), args[2]);
    };
};

hof.limit = function (cb, limit) {
    let counter = 0;
    return (num1, num2) => {
        if (counter < limit) {
            counter++;
            return cb(num1, num2);
        } else {
            return undefined;
        }
    };
};

hof.from = function (num) {
    let counter = -1;
    return () => {
        counter++;
        return num + counter;
    };
};

hof.to = function (func, limit) {
    let count = 0;
    return (num) => {
        if (count < limit) {
            count++
            return func(num);
        } else {
            return undefined;
        }
    };
};

hof.fromTo = function (start, end) {
    let counter = -1;
    let count = 0;
    return () => {
        if (count < end) {
            count++
            counter++;
        return start + counter;
        } else {
            return undefined;
        }
    };
};

hof.element = function (array, cb) {
    const fromTo = hof.fromTo(0, array.length)
    return () => {
        if (typeof cb === 'function') {
            return array[cb()]
        } else {
            return array[fromTo()]
        }
    };
};

hof.collect = function (cb, array) {
    return () => {
        let counter = cb();
        array.push(counter)
        if (array[array.length - 1] === undefined) array.pop();
        return counter;
    };
};

hof.filter = function (generatorFunc, trueOrFalseFunc) {
    return () => {
        let element = generatorFunc();
        if (trueOrFalseFunc(element)) {
            return element;
        } else {
            return undefined;
        }
    };
};

hof.concat = function (funcOne, funcTwo) {
    return () => {
        let result = funcOne();
        if (result !== undefined) return result;
        if (typeof funcTwo === 'function') result = funcTwo();
        if (result !== undefined) return result;
        else return undefined;
    };
};

hof.fibonaccif = function (num1, num2) {
    let counterOne = num1;
    let counterTwo = num2;
    return () => {
        counterTwo = counterOne + counterTwo;
        counterOne = counterTwo - counterOne;
        return counterTwo - counterOne;
    };
};

hof.gensymf = function (letter) {
    let counterObj = {};
    return () => {
        if (counterObj[letter] === undefined) {
            counterObj[letter] = 0;
        } else {
            counterObj[letter] += 1;
        }
        return `${letter}${counterObj[letter]}`
    };
};

hof.gensymff = function (cb, start) {
    return (letter) => {
        let counterObj = {};
        return () => {
            if (counterObj[letter] === undefined) {
                counterObj[letter] = start + 1;
            } else {
                counterObj[letter] = cb(counterObj[letter]);
            }
            return `${letter}${counterObj[letter]}`;
        };
    };
};

hof.counter = function (count) {
    return {
        up: () => {
            count++
            return count;
        },
        down: () => {
            count--;
            return count;
        }
    };
};

hof.revokable = function() {};

module.exports = hof;
