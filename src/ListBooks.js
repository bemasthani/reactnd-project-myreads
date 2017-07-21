import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
class ListBooks extends Component {

  state = {

    }


  static propTypes = {
    books: PropTypes.array.isRequired,
    onmoveBooksToDifferentShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }


  render() {
    const { books, onmoveBooksToDifferentShelf, shelf, getBookById } = this.props
    return (
            <div>
              <div className="bookshelf">
                <h1 className="bookshelf-title">{shelf}</h1>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      books.map((book) => (
                      //  <li>
                        <Book
                          book={book ? book : null}
                          key={book.id}
                          onmoveBooksToDifferentShelf={onmoveBooksToDifferentShelf}
                          getBookById={getBookById}
                         />
                         //</li>
                      ))
                    }
                  </ol>

                </div>
              </div>
            </div>
    )
  }
}

export default ListBooks
