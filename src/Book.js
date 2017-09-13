import React, { Component } from 'react';

class Book extends Component {

  /**
   * property initializer syntax
   * @param e
   */
  onChange = (e) => {
    const { book, updateBooks } = this.props;
    updateBooks(book, e.target.options[e.target.selectedIndex].value);
  }

  render() {
    const { book, shelf, shelves } = this.props;

    // prevent Mixed Content warnings and imageLinks not found
    const thumbnail = book.imageLinks ?
      book.imageLinks.thumbnail.replace("http://", "https://") :
      'https://books.google.com/googlebooks/images/no_cover_thumb.gif';

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                 style={{width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select defaultValue={shelf ? shelf : 'none'} onChange={this.onChange}>
                <option value="none" disabled>Move to...</option>
                {shelves.map((shelf) => {
                  return <option key={shelf.name} value={shelf.name}>{shelf.title}</option>
                })}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }

}

export default Book;