function sum() {
  var args = Array.prototype.slice.call(arguments);
  var totalSum = 0;

  args.forEach(function (val) {
    totalSum += val;
  });
  return totalSum;
};

Function.prototype.myBind = function (context) {
  var fn   = this;
  var obj  = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return fn.apply(context, args);
  };
};

// function Cat(name, age) {
//   this.name = name;
//   this.age = age;
// };
//
// function Dog(name, age) {
//   this.name = name;
//   this.age = age;
// };
//
// Cat.prototype.increaseAgeBy = function (years) {
//   this.age += years
// };
//
// walter = new Cat('Walter', 3);
// walter.increaseAgeBy(3);
// fido = new Dog('Fido', 2);
// walter.increaseAgeBy.myBind(fido, 7)();

function curriedSum(numArgs) {
  var numbers = [];
  function _curriedSum(argument) {
    numbers.push(argument);
    if (numbers.length === numArgs) {
      var result = 0;
      numbers.forEach(function (val) {
        result += val;
      });
      return result;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

Function.prototype.curry = function (numArgs) {
  var allArgs = [];
  var fn      = this;
  function _curry(argument) {
    allArgs.push(argument);
    if (allArgs.length === numArgs) {
      return fn.apply(null, allArgs);
    } else {
      return _curry;
    }
  }
  return _curry;
};

function addThree(n1, n2, n3) {
  return n1 + n2 + n3;
};

addThree.curry(3)(10)(20)(30);