import React from 'react'
import BookShelf from '../Components-Parts/BookShelf';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyBooks(props) {
        return (
            <div>
                <BookShelf shelfName= "Currently Reading" 
                           books= {props.myBooks.filter(book => book.currentlyReading)}/>       
                <BookShelf shelfName= "Want to read"
                           books= {props.myBooks.filter(book => book.wantToRead)}/>
                <BookShelf shelfName= "Read" 
                           books= {props.myBooks.filter(book => book.read)}/>
            </div>
        )
}

const mapStateToProps = state => {
    return {myBooks: state.myBooks, booksFromQuery: state.booksFromQuery}
}

const ConnectedBooks = connect(mapStateToProps)(MyBooks);

export default ConnectedBooks