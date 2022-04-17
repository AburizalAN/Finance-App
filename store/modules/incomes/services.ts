import { get, post } from 'services/fetch'

async function getIncomes(id?: string) {
  const res = await get(`/api/incomes${id ? `?kantong=${id}` : ''}`)
  return res
}

async function getSummaryIncomes() {
  const res = await get('/api/summary-incomes')
  return res
}

async function addKantong(payload: any) {
  const res = await post('/api/kantong', payload)
  return res
}

const services = {
  getIncomes,
  getSummaryIncomes,
  addKantong,
}

export default services