Function.prototype.inherits = function (superClass) {
  function Surrogate() {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};



// Official Solution:

// Function.prototype.inherits = function (BaseClass) {
//   function Surrogate () {};
//   Surrogate.prototype = BaseClass.prototype;
//   this.prototype = new Surrogate();
// };
