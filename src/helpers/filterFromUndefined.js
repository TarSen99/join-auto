module.exports = (object) => {
  const filtered = Object.entries(object)
    .filter(([key, value]) => {
      return value !== undefined
    })

  const res = {}

  filtered.forEach(([key, value]) => {
    res[key] = value
  })

  return res
}