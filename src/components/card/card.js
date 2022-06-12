import React from 'react'
import PropTypes from 'prop-types'

import { getTimeFromMins, formatPrice, formatStops, getFlyTime } from '../../functions'

import classes from './card.module.scss'

const Card = ({ data }) => (
  <li className={classes.card}>
    <div className={classes.card__header}>
      <span className={classes['card__header-price']}>{formatPrice(data.price)} Р</span>
      <span className={classes['card__header-logo']}>
        <img src={`//pics.avs.io/99/36/${data.carrier}.png`} width="110px" height="36px" alt="avia-company-logo" />
      </span>
    </div>
    <ul className={classes.card__list}>
      <li className={classes['card__list-item']}>
        <span className={classes['card__list-description']}>
          {data.segments[0].origin} – {data.segments[0].destination}
        </span>
        <span className={classes['card__list-text']}>
          {getFlyTime(data.segments[0].date, data.segments[0].duration)}
        </span>
      </li>
      <li className={classes['card__list-item']}>
        <span className={classes['card__list-description']}>В пути</span>
        <span className={classes['card__list-text']}>{getTimeFromMins(data.segments[0].duration)}</span>
      </li>
      <li className={classes['card__list-item']}>
        <span className={classes['card__list-description']}>{formatStops(data.segments[0].stops.length)}</span>
        <span className={classes['card__list-text']}>{data.segments[0].stops.join(', ')}</span>
      </li>
    </ul>
    <ul className={classes.card__list}>
      <li className={classes['card__list-item']}>
        <span className={classes['card__list-description']}>
          {data.segments[1].origin} – {data.segments[1].destination}
        </span>
        <span className={classes['card__list-text']}>
          {getFlyTime(data.segments[1].date, data.segments[1].duration)}
        </span>
      </li>
      <li className={classes['card__list-item']}>
        <span className={classes['card__list-description']}>В пути</span>
        <span className={classes['card__list-text']}>{getTimeFromMins(data.segments[1].duration)}</span>
      </li>
      <li className={classes['card__list-item']}>
        <span className={classes['card__list-description']}>{formatStops(data.segments[1].stops.length)}</span>
        <span className={classes['card__list-text']}>{data.segments[1].stops.join(', ')}</span>
      </li>
    </ul>
  </li>
)

Card.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape),
}

Card.defaultProps = {
  data: {},
}

export default Card
