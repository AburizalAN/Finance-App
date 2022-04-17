import types from './types'
import { HYDRATE } from 'next-redux-wrapper'

const { redux } = types

const initialState = {
  loading: true,
  loadingAddKantong: false,
  incomes: [],
  kantong: [],
  summaryIncomes: [],
  error: null,
}

const incomes = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case redux.GET_INCOMES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        incomes: action.payload,
      }

    case redux.POST_ADD_KANTONG_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAddKantong: false,
        error: null,
      }

    case redux.GET_SUMMARY_INCOMES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        summaryIncomes: action.payload,
      }

    case redux.GET_SUMMARY_INCOMES_FAILURE:
    case redux.POST_ADD_KANTONG_FAILURE:
    case redux.GET_INCOMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case redux.POST_ADD_KANTONG_LOADING:
      return {
        ...state,
        loadingAddKantong: true,
      }

    case redux.GET_SUMMARY_INCOMES_LOADING:
    case redux.GET_INCOMES_LOADING:
      return {
        ...state,
        loading: true,
      }
    
    default:
      return state
  }
}

export default incomes