import { all } from 'redux-saga/effects'
import expenses from './modules/expenses/sagas'

function* rootSaga() {
  yield all([
    expenses(),
  ])
}

export default rootSaga