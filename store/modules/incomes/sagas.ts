import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects'
import types from './types'
import SERVICES from './services'

const { redux, saga } = types

interface ResponseGenerator {
  status: number
  message: string
  data?: any
}

export function* addKantong({
  formData,
  callback = () => {}
}: { formData: any, callback?: () => void }) {
  try {
    yield put({ type: redux.POST_ADD_KANTONG_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.addKantong, formData)

    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    console.log('success add kantong', payload)
    yield put({ type: redux.POST_ADD_KANTONG_SUCCESS })
    callback()
  } catch (err) {
    yield put({ type: redux.POST_ADD_KANTONG_FAILURE, payload: err })
  }
}

export function* addIncomes({
  formData,
  callback = () => {}
}: { formData: any, callback?: () => void }) {
  try {
    yield put({ type: redux.POST_ADD_INCOMES_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.addIncomes, formData)

    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    console.log('success add incomes', payload)
    yield put({ type: redux.POST_ADD_INCOMES_SUCCESS })
    callback()
  } catch (err) {
    yield put({ type: redux.POST_ADD_INCOMES_FAILURE, payload: err })
  }
}

export function* getIncomes({ id }: { id?: string }) {
  try {
    yield put({ type: redux.GET_INCOMES_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.getIncomes, id)

    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    yield put({ type: redux.GET_INCOMES_SUCCESS, payload })
  } catch (err) {
    yield put({ type: redux.GET_INCOMES_FAILURE, payload: err })
  }
}

export function* getSummaryIncomes() {
  try {
    yield put({ type: redux.GET_SUMMARY_INCOMES_LOADING })
    let res: ResponseGenerator = yield call(SERVICES.getSummaryIncomes)

    if (res.status !== 200) throw res.data.error

    const { data } = res
    const payload = data

    yield put({ type: redux.GET_SUMMARY_INCOMES_SUCCESS, payload })
  } catch (err) {
    yield put({ type: redux.GET_SUMMARY_INCOMES_FAILURE, payload: err })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    takeEvery(saga.ADD_KANTONG, (props: any) => addKantong(props)),
    takeEvery(saga.GET_SUMMARY_INCOMES, () => getSummaryIncomes()),
    takeEvery(saga.GET_INCOMES, (props: any) => getIncomes(props)),
    takeEvery(saga.ADD_INCOMES, (props: any) => addIncomes(props)),
  ])
}