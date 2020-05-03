class SortType {
  constructor(type, availableTypes, defaultType, order) {
    let newType;
    let newOrder = order > 0 ? 1 : -1

    if (!availableTypes.includes(type.toLowerCase())) {
      newType = defaultType
    } else {
      newType = type.toLowerCase()
    }

    this.type = newType
    this.order = newOrder
  }

  getFieldName() {
    return this.type
  }

  getOrder() {
    return this.order
  }
}

module.exports = class SortWrapper {
  setType(type) {
    this.type = type

    return this
  }

  setOkTypes(types) {
    this.types = types

    return this
  }

  setOrder(order) {
    this.order = order

    return this
  }

  setDefault(def) {
    this.default = def
    
    return this
  }

  build() {
    return new SortType(this.type, this.types, this.default, this.order)
  }
}