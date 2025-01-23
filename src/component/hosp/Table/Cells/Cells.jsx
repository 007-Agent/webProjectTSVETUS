import { isoDate, strDate } from 'tinput'

const getDates = (from, to) => {
  let date = new Date(from)
  const dates = [{ date: isoDate(date), text: strDate(date) }]
  while (date < to) {
    date.setDate(date.getDate() + 1)
    dates.push({ date: isoDate(date), text: strDate(date) })
  }
  return dates
}

const parsePlaceInfo = info => {
  if (info) return { text: `${info.busyDescr || ''}${info.reserveDescr || ''}` }
  else return { text: 'NONE' }
}

const useCells = props => {
  const table = props.table || []
  const from = props.from || new Date()
  const to = props.to || new Date()
  const dates = getDates(from, to)
  const result = [[null, ...dates]]
  for (const row of table) {
    const placeRow = []
    const placeName = row[0].placeNumber || 'NONE'
    placeRow.push({ text: placeName })
    for (const date of dates) {
      const placeInfo = row.find(v => date.date === v.date)
      placeRow.push(parsePlaceInfo(placeInfo))
    }
    result.push(placeRow)
  }

  return result
}

export default useCells
