"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var SortType = /*#__PURE__*/function () {
  function SortType(type, availableTypes, defaultType, order) {
    (0, _classCallCheck2["default"])(this, SortType);
    var newType;
    var newOrder = order > 0 ? 1 : -1;

    if (!availableTypes.includes(type.toLowerCase())) {
      newType = defaultType;
    } else {
      newType = type.toLowerCase();
    }

    this.type = newType;
    this.order = newOrder;
  }

  (0, _createClass2["default"])(SortType, [{
    key: "getFieldName",
    value: function getFieldName() {
      return this.type;
    }
  }, {
    key: "getOrder",
    value: function getOrder() {
      return this.order;
    }
  }]);
  return SortType;
}();

module.exports = /*#__PURE__*/function () {
  function SortWrapper() {
    (0, _classCallCheck2["default"])(this, SortWrapper);
  }

  (0, _createClass2["default"])(SortWrapper, [{
    key: "setType",
    value: function setType(type) {
      this.type = type;
      return this;
    }
  }, {
    key: "setOkTypes",
    value: function setOkTypes(types) {
      this.types = types;
      return this;
    }
  }, {
    key: "setOrder",
    value: function setOrder(order) {
      this.order = order;
      return this;
    }
  }, {
    key: "setDefault",
    value: function setDefault(def) {
      this["default"] = def;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return new SortType(this.type, this.types, this["default"], this.order);
    }
  }]);
  return SortWrapper;
}();