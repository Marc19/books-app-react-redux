import React from 'react';
import ConnectedBook from '../Components-Parts/Book'
import '../css/BookShelf.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function BookShelf(props){
    return(
        <div className= "bookShelf">
            <h5>{props.shelfName}</h5>

            <div className="horizontalBooks">
                {
                    props.books.length === 0?
                    <p>No Books here</p>
                    :
                    props.books.map( (book) => 
                        <ConnectedBook id={book.id}
                                       title={book.title} 
                                       author={book.author} 
                                       imageUrl={book.imageUrl} 
                                       shelfName={props.shelfName}
                                       disableActions={props.disableActions}
                                       key={book.id} />
                    )
                }
            </div>
        </div>
    )
}

export default BookShelf;