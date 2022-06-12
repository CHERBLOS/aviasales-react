/* eslint-disable react/no-array-index-key */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BtnMore from '../btnMore'
import Card from '../card/card'
import { tabsSorter, stopsFilter } from '../../functions'

import classes from './cardList.module.scss'

const CardList = ({ renderedTickets, tickets, sorting, filters, isLoading }) => {
  const spinner = isLoading && <div className={classes.cardlist__spiner} />
  const renderArray = stopsFilter(filters, tickets).sort(tabsSorter[sorting])
  const buttonMore = renderArray.length > 5 && !isLoading && <BtnMore />
  const noTickets = !renderArray.length && !isLoading && (
    <div className={classes.cardlist__alert}>По вашим параметрам билетов не нашлось!</div>
  )
  const cardsArr = renderArray.length ? (
    <ul className={classes.cardlist__list}>
      {renderArray.slice(0, renderedTickets).map((item) => (
        <Card data={item} key={`ticket_p_${item.price}_c_${item.carrier}_d_${item.duration}`} />
      ))}{' '}
      {buttonMore}
    </ul>
  ) : null
  return (
    <>
      {cardsArr}
      {noTickets}
      {spinner}
    </>
  )
}

CardList.propTypes = {
  renderedTickets: PropTypes.number,
  sorting: PropTypes.string,
  isLoading: PropTypes.bool,
  tickets: PropTypes.arrayOf(PropTypes.shape),
}
CardList.defaultProps = {
  renderedTickets: 5,
  sorting: 'Самый быстрый',
  isLoading: true,
  tickets: [],
}

const mapStateToProps = (state) => ({
  renderedTickets: state.uiReducer.renderedTickets,
  sorting: state.uiReducer.sorting.filterName,
  filters: state.uiReducer.filters,
  isLoading: state.uiReducer.isLoading,
  tickets: state.dataReducer.tickets,
})

export default connect(mapStateToProps)(CardList)
