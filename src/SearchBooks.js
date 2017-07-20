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

  updateQuery = (query, maxResults) => {
    this.setState({ query: query.trim() })
    if(query.length === 0) {
               this.setState({query, searchedBooks: []})
           }
    if(query.length>0) {
      BooksAPI.search(query,maxResults).then(books => {
        books.error ? (this.setState({searchedBooks: []})) : (this.setState({searchedBooks: books instanceof Array ? books : []}))
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
              showingBooks.map((book, i) => (
                <li key={i}>
              <Book
                book={book ? book : null}
                key={book.id}
                onmoveBooksToDifferentShelf={onmoveBooksToDifferentShelf}
                getBookById={getBookById}
               />
               </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
