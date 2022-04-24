import types from './types'

const { saga } = types

function addKantong(payload: any, callback?: () => void) {
  return {
    type: saga.ADD_KANTONG,
    formData: payload,
    callback,
  }
}

function getIncomes(id?: string) {
  return {
    type: saga.GET_INCOMES,
    id,
  }
}

function addIncomes(payload: any, callback?: () => void) {
  return {
    type: saga.ADD_INCOMES,
    formData: payload,
    callback,
  }
}

function getSummaryIncomes() {
  return {
    type: saga.GET_SUMMARY_INCOMES,
  }
}

const actions = {
  incomes: {
    addKantong,
    getSummaryIncomes,
    getIncomes,
    addIncomes,
  }
}

export default actions