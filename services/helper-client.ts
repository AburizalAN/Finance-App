export const parseCurrency = (nmbr: number) => {
  return new Intl.NumberFormat('id').format(nmbr)
}