import types from './types'
import { HYDRATE } from 'next-redux-wrapper'

const { redux } = types

const initialState = {
  loading: true,
  expenses: [],
  summary: [],
  tags: [],
  tag: {},
  successSubmit: false,
  error: null,
}

const expenses = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case redux.GET_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: action.payload,
        error: null,
      }

    case redux.GET_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: action.payload,
        error: null,
      }
    
    case redux.GET_DETAIL_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        tag: action.payload,
        error: null,
      }

    case redux.GET_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        summary: action.payload,
      }

    case redux.POST_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successSubmit: true,
      }

    case redux.POST_EXPENSE_FAILURE:
    case redux.GET_SUMMARY_FAILURE:
    case redux.GET_DETAIL_TAG_FAILURE:
    case redux.GET_TAGS_FAILURE:
    case redux.GET_EXPENSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case redux.POST_EXPENSE_SUCCESS:
    case redux.GET_SUMMARY_LOADING:
    case redux.GET_DETAIL_TAG_LOADING:
    case redux.GET_TAGS_LOADING:
    case redux.GET_EXPENSES_LOADING:
      return {
        ...state,
        loading: true,
      }

    default:
      return state
  }
}

export default expenses