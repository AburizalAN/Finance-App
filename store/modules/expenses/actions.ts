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

function getSummaryExpenses() {
  return {
    type: saga.GET_SUMMARY,
  }
}

const actions: Object = {
  expenses: {
    getExpenses,
    getTags,
    getSummaryExpenses,
  }
}

export default actions