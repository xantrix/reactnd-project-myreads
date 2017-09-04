import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search />
        )}/>
        <Route exact path='/' render={() => (
          <BookShelf />
        )}/>
      </div>
    )
  }
}

export default BooksApp
