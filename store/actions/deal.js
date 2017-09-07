export const getDealCategory = (...args) => ({
  type: 'deal/getDealCategory',
  args
})

export const setDealCategory = (data) => ({
  type: 'deal/setDealCategory',
  payload: data
})

export const createDeal = (...args) => ({
  type: 'deal/createDeal',
  args
})
