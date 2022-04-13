import types from './types'

const { redux, saga } = types

function getExpenses(id?: any) {
  return {
    type: saga.GET_EXPENSES,
    id,
  }
}

function getTags() {
  return {
    type: saga.GET_TAGS
  }
}

function getDetailTag(tagId: string) {
  return {
    type: saga.GET_DETAIL_TAG,
    tagId,
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
    getDetailTag,
  }
}

export default actions