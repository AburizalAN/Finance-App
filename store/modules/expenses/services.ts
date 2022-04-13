import { get } from 'services/fetch'

async function getExpenses(id: any) {
  const res = await get(`/api/expenses${id !== null && id !== 'total' ? `?tag=${id}` : ''}`)
  return res
}

async function getTags() {
  const res = await get(`/api/tags`)
  return res
}

async function getDetailTag(tagId: string) {
  const res = await get(`/api/tags/${tagId}`)
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
  getDetailTag,
}

export default services