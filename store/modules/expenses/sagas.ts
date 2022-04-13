import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects'
import types from './types'
import SERVICES from './services'

const { redux, saga } = types

interface ResponseGenerator {
  status: number
  message: string
  data?: any
}

export function* getExpenses({ id = null }: { id?: any }) {
  try {
    yield put({ type: redux.GET_EXPENSES_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.getExpenses, id)

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

export function* getDetailTag({ tagId }: {tagId: string}) {
  try {
    yield put({ type: redux.GET_DETAIL_TAG_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.getDetailTag, tagId)
  
    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    yield put({ type: redux.GET_DETAIL_TAG_SUCCESS, payload })
  } catch (err) {
    yield put({ type: redux.GET_DETAIL_TAG_FAILURE, payload: err })
  }
}

export function* getSummaryExpenses() {
  try {
    yield put ({ type: redux.GET_SUMMARY_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.getSummaryExpenses)

    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    yield put({ type: redux.GET_SUMMARY_SUCCESS, payload })
  } catch(err) {
    yield put({ type: redux.GET_SUMMARY_FAILURE, payload: err })
  }
}

export function* postExpenseData({ value, callback }: any) {
  try {
    yield put({ type: redux.POST_EXPENSE_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.postExpenseData, value)
    
    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    yield put({ type: redux.POST_EXPENSE_SUCCESS })
    callback()
  } catch(err) {
    yield put({ type: redux.POST_EXPENSE_FAILURE, payload: err })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    takeEvery(saga.GET_EXPENSES, (props: any) => getExpenses(props)),
    takeEvery(saga.GET_TAGS, getTags),
    takeEvery(saga.GET_SUMMARY, getSummaryExpenses),
    takeEvery(saga.GET_DETAIL_TAG, (props: any) => getDetailTag(props)),
    takeEvery(saga.POST_EXPENSE, (props: any) => postExpenseData(props)),
  ])
}


