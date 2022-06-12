/* eslint-disable no-restricted-syntax */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../store/uiReducer/actions'
import filterBalancer from '../../functions'

import style from './filter.module.scss'

const Filter = ({ filtersChanged, filters }) => {
  const checkboxArray = []

  const cEvent = (ev) => {
    if (ev.target.labels !== null) {
      if (ev.target.labels[0].textContent !== null) {
        const newFilters = filterBalancer(filters, ev.target.checked, ev.target.labels[0].textContent)
        filtersChanged(newFilters)
      }
    }
  }

  for (const key in filters) {
    if (typeof filters[key] === 'boolean') {
      const reactKey = typeof key[0] === 'number' ? key[0] : key.charCodeAt(0)
      checkboxArray.push(
        <label htmlFor={`chBox${key}`} key={reactKey} className={style['filter__list-item']}>
          <input
            id={`chBox${key}`}
            className={style['filter__list-input']}
            type="checkbox"
            checked={filters[key]}
            onChange={cEvent}
          />
          <span className={style.filter__checkbox} />
          {key}
        </label>
      )
    }
  }

  return (
    <div className={style.filter}>
      <p className={style.filter__capture}>Количество пересадок</p>
      <ul className={style.filter__list}>{checkboxArray}</ul>
    </div>
  )
}

Filter.propTypes = {
  filtersChanged: PropTypes.func,
}

Filter.defaultProps = {
  filtersChanged: () => {},
}

const mapStateToProps = (state) => ({
  filters: state.uiReducer.filters,
})

const mapDispatchToProps = (dispatch) => {
  const { filtersChanged } = bindActionCreators(actions, dispatch)
  return { filtersChanged }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
