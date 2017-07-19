import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types';


class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchedBooks: []
    }
  }

  static propTypes = {
    onmoveBooksToDifferentShelf: PropTypes.func.isRequired
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if(query !== '') {
      BooksAPI.search(query).then(books => this.setState({
        searchedBooks: books
      }))
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  clearQuery = () => {
    console.log('clearQuery')
    this.setState({ query: '' })
  }

  render() {

    const { onmoveBooksToDifferentShelf, getBookById } = this.props
    const { query } = this.state

    let showingBooks = this.state.searchedBooks;
  
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-contacts'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {
              showingBooks.map((book) => (
              <Book
                book={book ? book : null}
                key={book.id}
                onmoveBooksToDifferentShelf={onmoveBooksToDifferentShelf}
                getBookById={getBookById}
               />
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
