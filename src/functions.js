/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
import aviasales from './service/aviaService'

function filterBalancer(filtersObject, newFilterState, filterName) {
  let newFiltersObject = { ...filtersObject, [filterName]: newFilterState }
  if (filterName === 'Все') {
    newFiltersObject =
      newFilterState === true
        ? {
            Все: true,
            'Без пересадок': true,
            '1 пересадка': true,
            '2 пересадки': true,
            '3 пересадки': true,
          }
        : {
            Все: false,
            'Без пересадок': false,
            '1 пересадка': false,
            '2 пересадки': false,
            '3 пересадки': false,
          }
  } else {
    let counter = 0
    for (const key in newFiltersObject) {
      if (newFiltersObject[key]) {
        counter += newFiltersObject[key]
      }
    }
    if (counter === 4) {
      newFiltersObject['Все'] = newFilterState
    }
  }

  return newFiltersObject
}

const optimalValue = (price, duration) => price + 12.5 * duration

export const tabsSorter = {
  'Самый дешевый': (i, j) => i.price - j.price,
  'Самый быстрый': (i, j) => i.duration - j.duration,
  Оптимальный: (i, j) => optimalValue(i.price, i.duration) - optimalValue(j.price, j.duration),
}

export const stopsFilter = (filter, tickets) => {
  const newArr = []
  if (filter['Все']) {
    return tickets
  }
  if (filter['Без пересадок']) {
    newArr.push(0)
  }
  if (filter['1 пересадка']) {
    newArr.push(1)
  }
  if (filter['2 пересадки']) {
    newArr.push(2)
  }
  if (filter['3 пересадки']) {
    newArr.push(3)
  }
  return tickets.filter(
    (item) => newArr.includes(item.segments[0].stops.length) || newArr.includes(item.segments[1].stops.length)
  )
}

const digits = (time) => (time > 9 ? `${time}` : `0${time}`)

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60)
  const minutes = mins % 60
  return `${digits(hours)}:${digits(minutes)}`
}

export const formatDate = (date) => `${digits(date.getHours())}:${digits(date.getMinutes())}`

export const formatPrice = (amount) => {
  const thous = Math.trunc(amount / 1000)
  const rest = amount % 1000
  return `${thous} ${rest < 100 ? '0' + rest.toString() : rest}`
}

export const formatStops = (stops) => {
  switch (stops) {
    case 0:
      return 'Без пересадок'
    case 1:
      return `${stops} пересадка`
    case 2:
    case 3:
    case 4:
      return `${stops} пересадки`
    default:
      return `${stops} пересадок`
  }
}

export const getFlyTime = (date, duration) => {
  const dateMS = Date.parse(date)
  const destinationMS = dateMS + duration * 60 * 1000
  const date1 = new Date(dateMS)
  const date2 = new Date(destinationMS)
  return `${formatDate(date1)} – ${formatDate(date2)}`
}

export const getTicketsToDispatch = (store, addTickets, setLoader) => {
  aviasales.getTickets(store, setLoader).then((data) => {
    if (data.tickets && !data.stop) store.dispatch(addTickets(data.tickets))
    if (!data.stop || data === -1) {
      getTicketsToDispatch(store, addTickets, setLoader)
    } else {
      store.dispatch(setLoader(false))
    }
  })
}

export default filterBalancer
