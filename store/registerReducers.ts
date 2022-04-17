import { combineReducers } from 'redux'
import expensesReducer from './modules/expenses/reducers'
import incomesReducer from './modules/incomes/reducers'

const rootReducer = combineReducers({
  expenses: expensesReducer,
  incomes: incomesReducer,
})

export default rootReducer