import * as actions from './actionTypes'

const initValue = {
  filters: {
    Все: true,
    'Без пересадок': true,
    '1 пересадка': true,
    '2 пересадки': true,
    '3 пересадки': true,
  },
  sorting: { filterName: 'Самый быстрый' },
  renderedTickets: 5,
  isLoading: true,
}

const uiReducer = (state = initValue, action = {}) => {
  switch (action.type) {
    case actions.FILTER_CHANGED:
      return {
        ...state,
        filters: action.payload.filters,
      }
    case actions.SORT_CHANGED:
      return {
        ...state,
        sorting: action.payload,
      }
    case actions.SET_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case actions.GET_MORE_TICKETS:
      return {
        ...state,
        renderedTickets: state.renderedTickets + 5,
      }
    default:
      return state
  }
}

export default uiReducer
