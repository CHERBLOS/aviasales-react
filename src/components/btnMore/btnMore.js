import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../store/uiReducer/actions'

import style from './btnMore.module.scss'

const BtnMore = ({ getMoreTickets }) => (
  <button className={style.btn} type="button" onClick={getMoreTickets}>
    Показать еще 5 билетов!
  </button>
)

BtnMore.propTypes = {
  getMoreTickets: PropTypes.func,
}

BtnMore.defaultProps = {
  getMoreTickets: () => {},
}

const mapDispatchToProps = (dispatch) => {
  const { getMoreTickets } = bindActionCreators(actions, dispatch)
  return { getMoreTickets }
}

export default connect(null, mapDispatchToProps)(BtnMore)
