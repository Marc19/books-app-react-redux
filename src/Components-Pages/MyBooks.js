import React from 'react'
import BookShelf from '../Components-Parts/BookShelf';
import { connect } from "react-redux";
import { moveToCurrentlyReading, moveToWantToRead, moveToRead, removeBook } from '../Actions/index';
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

const mapDispatchToProps = dispatch => {
    return {
        moveToCurrentlyReading: payload => dispatch(moveToCurrentlyReading(payload)),
        moveToWantToRead: payload => dispatch(moveToWantToRead(payload)),
        moveToRead: payload => dispatch(moveToRead(payload)),
        removeBook: payload => dispatch(removeBook(payload))
      };
}

const ConnectedBooks = connect(mapStateToProps, mapDispatchToProps)(MyBooks);

export default ConnectedBooks