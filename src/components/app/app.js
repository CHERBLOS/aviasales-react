import React from 'react'

import Filter from '../filter'
import SortTabs from '../sortTabs'
import CardList from '../cardList'

import logo from './images/logo.svg'
import style from './app.module.scss'

const App = () => (
  <div className={style.app}>
    <img src={logo} className={style.app__logo} alt="logo" />
    <div className={style.app__container}>
      <Filter />
      <div className={style['app__container-block']}>
        <SortTabs />
        <CardList />
      </div>
    </div>
  </div>
)

export default App
