"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Pagination = /*#__PURE__*/function () {
  function Pagination(perPage, currentPage, count) {
    (0, _classCallCheck2["default"])(this, Pagination);
    this._perPage = perPage;
    this._currentPage = currentPage;
    this._totalPages = Math.max(Math.ceil(count / perPage), 1);
    this.count = count;
  }

  (0, _createClass2["default"])(Pagination, [{
    key: "getCurrentPage",
    value: function getCurrentPage() {
      return Math.min(this._currentPage, this._totalPages);
    }
  }, {
    key: "getSkippedItemsCount",
    value: function getSkippedItemsCount() {
      return Math.max(0, this.getPerPage() * (this.getCurrentPage() - 1));
    }
  }, {
    key: "getPerPage",
    value: function getPerPage() {
      return this._perPage;
    }
  }, {
    key: "getTotalPages",
    value: function getTotalPages() {
      return this._totalPages;
    }
  }]);
  return Pagination;
}();

var MAX_LIMIT = 100;
var MIN_LIMIT = 1;
var MIN_PAGE_VALUE = 1;

var PaginationWrapper = /*#__PURE__*/function () {
  function PaginationWrapper() {
    (0, _classCallCheck2["default"])(this, PaginationWrapper);
  }

  (0, _createClass2["default"])(PaginationWrapper, [{
    key: "setPage",
    value: function setPage(page) {
      this.page = Math.max(MIN_PAGE_VALUE, +page || 0);
      return this;
    }
  }, {
    key: "setLimit",
    value: function setLimit(limit) {
      this.limit = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, +limit || 0));
      return this;
    }
  }, {
    key: "setCount",
    value: function setCount(count) {
      this.count = count || 0;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return new Pagination(this.limit, this.page, this.count, this);
    }
  }]);
  return PaginationWrapper;
}();

var PaginationFormatter = /*#__PURE__*/function () {
  function PaginationFormatter(pagination) {
    (0, _classCallCheck2["default"])(this, PaginationFormatter);
    this.pagination = pagination;
    return this.format();
  }

  (0, _createClass2["default"])(PaginationFormatter, [{
    key: "format",
    value: function format() {
      return {
        current_page: this.pagination.getCurrentPage(),
        per_page: this.pagination.getPerPage(),
        total_pages: this.pagination.getTotalPages(),
        count: this.pagination.count
      };
    }
  }]);
  return PaginationFormatter;
}();

module.exports = {
  PaginationWrapper: PaginationWrapper,
  PaginationFormatter: PaginationFormatter
};