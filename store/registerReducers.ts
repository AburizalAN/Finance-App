import { combineReducers } from 'redux'
import expensesReducer from './modules/expenses/reducers'

const rootReducer = combineReducers({
  expenses: expensesReducer,
})

export default rootReducer