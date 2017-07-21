import React, { Component } from 'react';
import PropTypes from 'prop-types'
class Books extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bookShelf: ""
    }
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onmoveBooksToDifferentShelf: PropTypes.func.isRequired,
  }

  componentDidMount() {
      const { book, getBookById } = this.props
      let bookOnShelf = getBookById(book.id);
      let shelf;
      if(bookOnShelf !== null) {
          shelf = bookOnShelf.shelf

      } else {
          shelf = 'none'
      }
      this.setState({bookShelf: shelf})
  }

  render() {
    const { book, onmoveBooksToDifferentShelf } = this.props
    return (

              <div className="book" key={book.id}>
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                  <div className="book-shelf-changer">
                    <select value={this.state.bookShelf} onChange={(event) => onmoveBooksToDifferentShelf(event, book)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                  </div>
                </div>
                <div  className="book-title">{book.title !== undefined ? book.title:''}</div>
                <div  className="book-cover-subtitle">{book.subtitle !== undefined ? book.subtitle:''}</div>
                <div  className="book-authors">{book.authors !== undefined ? book.authors.join(", ") : ''}</div>
              </div>


    )
  }
}

export default Books
