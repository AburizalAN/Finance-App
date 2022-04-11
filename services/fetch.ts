export async function get(uri: string) {
  try {
    const res = await fetch(uri)
    const resJSON = await res.json()
  
    if (res.status !== 200) throw resJSON
    return resJSON
  } catch (err) {
    return err
  }
}
