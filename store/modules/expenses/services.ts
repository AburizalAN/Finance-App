import { get } from 'services/fetch'

async function getExpenses() {
  const res = await get(`/api/expenses`)
  return res
}

async function getTags() {
  const res = await get(`/api/tags`)
  return res
}

const services = {
  getExpenses,
  getTags,
}

export default services