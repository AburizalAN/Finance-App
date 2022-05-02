import Cookie from 'js-cookie'

export async function get(uri: string) {
  try {
    const res = await fetch(uri, {
      headers: {
        Authorization: 'Bearer ' + Cookie.get('AuthToken'),
      }
    })
    const resJSON = await res.json()
  
    if (res.status !== 200) throw resJSON
    return resJSON
  } catch (err) {
    return err
  }
}

export async function post(uri: string, payload: any) {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]: any) => {
    formData.append(key, value)
  })

  try {
    const res = await fetch(uri, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + Cookie.get('AuthToken'),
        accept: 'application/json',
      }
    })
    const resJSON = await res.json()
    if (res.status !== 200) throw resJSON
    return resJSON
  } catch (err) {
    return err
  }
}