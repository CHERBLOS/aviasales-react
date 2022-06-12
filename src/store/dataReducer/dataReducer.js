import * as actions from '../uiReducer/actionTypes'

const initValue = {
  tickets: [],
}

const dataReducer = (state = initValue, action = {}) => {
  switch (action.type) {
    case actions.ADD_TICKETS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload.tickets],
      }
    default:
      return state
  }
}

export default dataReducer
