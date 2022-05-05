import { get, post } from 'services/fetch'

async function getExpenses(query: any) {
  const tempQuery: any = query
  Object.entries(tempQuery).forEach(([key, value]: Array<any>) => {
    if (!value) {
      delete tempQuery[key]
    }
  })
  if (tempQuery['id'] === 'total') {
    delete tempQuery['id']
  }
  const fixQuery = new URLSearchParams(tempQuery).toString()
  console.log('query', fixQuery)
  const res = await get(`/api/expenses${fixQuery ? `?${fixQuery}` : ''}`)
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

async function postExpenseData(payload: any) {
  const res = await post(`/api/expenses`, payload)
  return res
}

const services = {
  getExpenses,
  getTags,
  getSummaryExpenses,
  getDetailTag,
  postExpenseData,
}

export default services