import types from './types'

const { saga } = types

function addKantong(payload: any) {
  return {
    type: saga.ADD_KANTONG,
    formData: payload,
  }
}

function getIncomes(id?: string) {
  return {
    type: saga.GET_INCOMES,
    id,
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
  }
}

export default actions