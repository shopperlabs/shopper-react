import _classCallCheck from "babel-runtime/helpers/classCallCheck";
export var IDGenerator = function () {
  function IDGenerator() {
    _classCallCheck(this, IDGenerator);

    this.id = 0;
  }

  IDGenerator.prototype.next = function next() {
    return this.id++ & 0xffff;
  };

  return IDGenerator;
}();