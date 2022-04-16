import types from './types'
import { HYDRATE } from 'next-redux-wrapper'

const { redux } = types

const initialState = {
  loading: true,
  incomes: [],
  kantong: [],
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

    case redux.GET_INCOMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

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