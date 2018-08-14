import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from '../book/Book';

class Search extends Component {
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							onChange={this.props.searchBooks}
							placeholder="Search by title or author"
							type="text"
							value={this.props.searchQuery}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{
							this.props.booksSearch.length > 0 ? (
								this.props.booksSearch.map(book => (
									<Book
										book={book}
										books={this.props.books}
										key={book.id}
										updateShelf={this.props.updateShelf}
										shelfs={this.props.shelfs}
									/>
								))
							) : (
								<p className="search__message">{this.props.searchMessage}</p>
							)
						}
					</ol>
				</div>
			</div>
		)
	}
}

Search.propTypes = {
	books: PropTypes.array.isRequired,
	booksSearch: PropTypes.array.isRequired,
	searchBooks: PropTypes.func.isRequired,
	searchMessage: PropTypes.string.isRequired,
	shelfs: PropTypes.array.isRequired,
	updateShelf: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default Search
