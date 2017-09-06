import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {

  /**
   *
   * @type {{query: string, queriedBooks: Array}}
   */
  state = {
    query: '',
    result: []
  }

  onChange = (e) => {
    this.setState({query: e.target.value});

    BooksAPI.search(e.target.value, 30)
      .then((books) => {
        if (books && books.length > 0) {
          books = this.addCurrentShelf(books);
          this.setState({result: books});
        } else {
          this.setState({result: []});
        }
      });
  }

  /**
   *
   * @param books
   * @returns {*|Array|Object}
   */
  addCurrentShelf(books) {
    const { shelvesData } = this.props;

    return books.map((book) => {

      shelvesData.forEach((booksInShelf,shelf) => {
        booksInShelf.forEach((v) => {
          if (v.id === book.id) {
            book.shelf = v.shelf;
          }
        });
      });

      return book;
    });
  }

  render() {
    const { shelves, updateBooks } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.onChange}
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.result.map((book) => {
              return <Book
                key={book.id}
                shelf={book.shelf}
                shelves={shelves}
                book={book}
                updateBooks={updateBooks}
              />
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search