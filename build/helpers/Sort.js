"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SortType = /*#__PURE__*/function () {
  function SortType(type, availableTypes, defaultType, order) {
    _classCallCheck(this, SortType);

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

  _createClass(SortType, [{
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
    _classCallCheck(this, SortWrapper);
  }

  _createClass(SortWrapper, [{
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