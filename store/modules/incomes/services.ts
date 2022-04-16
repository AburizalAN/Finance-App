import { get } from 'services/fetch'

async function getIncomes() {
  const res = await get('/api/incomes')
  return res
}

const services = {
  getIncomes,
}

export default services