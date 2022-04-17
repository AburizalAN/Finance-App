import { all } from 'redux-saga/effects'
import expenses from './modules/expenses/sagas'
import incomes from './modules/incomes/sagas'

function* rootSaga() {
  yield all([
    expenses(),
    incomes(),
  ])
}

export default rootSaga