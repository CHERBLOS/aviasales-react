import { combineReducers } from 'redux'

import uiReducer from './uiReducer/uiReducer'
import dataReducer from './dataReducer/dataReducer'

const reducer = combineReducers({ uiReducer, dataReducer })

export default reducer
