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

function postExpenseData(value: any, callback?: () => void) {
  return {
    type: saga.POST_EXPENSE,
    value,
    callback,
  }
}

function setStartDate(date: any) {
  return {
    type: redux.SET_START_DATE,
    value: date,
  }
}

function setEndDate(date: any) {
  return {
    type: redux.SET_END_DATE,
    value: date,
  }
}

const actions: Object = {
  expenses: {
    getExpenses,
    getTags,
    getSummaryExpenses,
    getDetailTag,
    postExpenseData,
    setStartDate,
    setEndDate,
  }
}

export default actions