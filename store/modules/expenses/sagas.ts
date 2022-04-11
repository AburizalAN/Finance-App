import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects'
import types from './types'
import SERVICES from './services'

const { redux, saga } = types

interface ResponseGenerator {
  status: number
  message: string
  data?: any
}

export function* getExpenses() {
  try {
    yield put({ type: redux.GET_EXPENSES_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.getExpenses)

    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    yield put({ type: redux.GET_EXPENSES_SUCCESS, payload })
  } catch(err) {
    yield put({ type: redux.GET_EXPENSES_FAILURE, payload: err })
  }
}

export function* getTags() {
  try {
    yield put({ type: redux.GET_TAGS_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.getTags)
    
    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    yield put({ type: redux.GET_TAGS_SUCCESS, payload })
  } catch(err) {
    yield put({ type: redux.GET_TAGS_FAILURE, payload: err })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    takeEvery(saga.GET_EXPENSES, getExpenses),
    takeEvery(saga.GET_TAGS, getTags)
  ])
}


