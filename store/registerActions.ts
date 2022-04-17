import expensesActions from 'store/modules/expenses/actions'
import incomesActions from 'store/modules/incomes/actions'

const registerActions: any = {
  ...expensesActions,
  ...incomesActions,
}

export default registerActions