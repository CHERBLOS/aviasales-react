import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../store/uiReducer/actions'

import classes from './sortTabs.module.scss'

const SortTabs = ({ filterName, sortChanged }) => {
  const cEvent = (ev) => {
    if (ev.currentTarget.textContent) {
      const sortingValue = ev.currentTarget.textContent
      sortChanged(sortingValue)
    }
  }

  return (
    <ul className={classes.sort__list}>
      <button
        type="button"
        className={
          filterName === 'Самый дешевый'
            ? `${classes['sort__list-item']} ${classes['sort__list-item--active']}`
            : `${classes['sort__list-item']}`
        }
        onClick={cEvent}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        className={
          filterName === 'Самый быстрый'
            ? `${classes['sort__list-item']} ${classes['sort__list-item--active']}`
            : `${classes['sort__list-item']}`
        }
        onClick={cEvent}
      >
        Самый быстрый
      </button>
      <button
        type="button"
        className={
          filterName === 'Оптимальный'
            ? `${classes['sort__list-item']} ${classes['sort__list-item--active']}`
            : `${classes['sort__list-item']}`
        }
        onClick={cEvent}
      >
        Оптимальный
      </button>
    </ul>
  )
}

SortTabs.propTypes = {
  filterName: PropTypes.string,
  sortChanged: PropTypes.func,
}

SortTabs.defaultProps = {
  filterName: 'Самый быстрый',
  sortChanged: () => {},
}

const mapStateToProps = (state) => ({
  filterName: state.uiReducer.sorting.filterName,
})

const mapDispatchToProps = (dispatch) => {
  const { sortChanged } = bindActionCreators(actions, dispatch)
  return { sortChanged }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortTabs)
