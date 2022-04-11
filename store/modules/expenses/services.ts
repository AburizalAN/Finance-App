import { get } from 'services/fetch'

async function getExpenses() {
  const res = await get(`/api/expenses`)
  return res
}

async function getTags() {
  const res = await get(`/api/tags`)
  return res
}

async function getSummaryExpenses() {
  const res = await get(`/api/summary-expenses`)
  return res
}

const services = {
  getExpenses,
  getTags,
  getSummaryExpenses,
}

export default services