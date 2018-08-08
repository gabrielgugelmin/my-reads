import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../book/Book';

class Search extends Component {
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
							*/}
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
									/>
								))
							) : (
								this.props.searchMessage
							)
						}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search
