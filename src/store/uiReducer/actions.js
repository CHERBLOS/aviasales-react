/* eslint-disable import/prefer-default-export */
import * as actions from './actionTypes'

export const filtersChanged = (newFilters) => ({
  type: actions.FILTER_CHANGED,
  payload: {
    filters: newFilters,
  },
})

export const sortChanged = (sortName) => ({
  type: actions.SORT_CHANGED,
  payload: {
    filterName: sortName,
  },
})

export const getMoreTickets = () => ({
  type: actions.GET_MORE_TICKETS,
})

export const addTickets = (data) => ({
  type: actions.ADD_TICKETS,
  payload: {
    tickets: data.map((elem) => ({
      ...elem,
      duration: elem.segments[0].duration + elem.segments[1].duration,
      stops: [elem.segments[0].stops.length, elem.segments[1].stops.length],
    })),
  },
})

export const setLoader = (value) => ({
  type: actions.SET_LOADER,
  payload: {
    isLoading: value,
  },
})
