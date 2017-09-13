import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import Search from './Search';

class BooksApp extends React.Component {

  /**
   * shelves config
   * @type {{shelves: *[], data: Map}}
   */
  state = {
    shelves: [
      { name: 'currentlyReading', title: 'Currently Reading' },
      { name: 'wantToRead', title: 'Want To Read' },
      { name: 'read', title: 'Read' },
    ],
    data: new Map()
  }

  componentDidMount() {
    this.createShelvesData();
  }

  createShelvesData() {
    BooksAPI.getAll().then((books) => {

      let newData = new Map();

      books.forEach((book) => {

        //init shelves data as array
        if (!newData.has(book.shelf)) {
          newData.set(book.shelf, []);
        }
        //push book in shelf
        newData.get(book.shelf).push(book);
      });

      this.setState({ data: newData });
    })
  }

  /**
   * Update book shelf
   *
   * property initializer syntax
   * https://facebook.github.io/react/docs/handling-events.html
   *
   * called from Book
   * @param book
   * @param shelf
   */
  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.createShelvesData();
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            shelves={this.state.shelves}
            shelvesData={this.state.data}
            updateBooks={this.updateBooks}
          />
        )}/>
        <Route exact path='/' render={() => {
          return (
            <div>
              {this.state.shelves.map((shelf) => {
                const books = this.state.data.get(shelf.name);

                return <BookShelf
                  key={shelf.name}
                  books={books ? books : []}
                  title={shelf.title}
                  shelf={shelf.name}
                  shelves={this.state.shelves}
                  updateBooks={this.updateBooks}
                />
              })}
            </div>
          );
        }} />
      </div>
    )
  }
}

export default BooksApp
