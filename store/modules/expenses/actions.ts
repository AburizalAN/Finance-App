import types from './types'

const { redux, saga } = types

function getExpenses() {
  return {
    type: saga.GET_EXPENSES
  }
}

function getTags() {
  return {
    type: saga.GET_TAGS
  }
}

const actions: Object = {
  expenses: {
    getExpenses,
    getTags,
  }
}

export default actions