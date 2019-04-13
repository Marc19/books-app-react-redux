import React from 'react';
import { connect } from "react-redux";
import { moveToCurrentlyReading, moveToWantToRead, moveToRead, removeBook } from '../Actions/index';
import store from '../Store/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Book.css';

function Book(props){
    function addToCurrentlyReading(){
        props.moveToCurrentlyReading({id: props.id});
        localStorage.setItem('myBooksPersisted', JSON.stringify(store.getState().myBooks));
    }

    function addToWantToRead(){
        props.moveToWantToRead({id: props.id});
        localStorage.setItem('myBooksPersisted', JSON.stringify(store.getState().myBooks));
    }

    function addToRead(){
        props.moveToRead({id: props.id});
        localStorage.setItem('myBooksPersisted', JSON.stringify(store.getState().myBooks));
    }   

    return(
        <div className="col-3 d-flex align-items-stretch">
            <div className="card">
                <img className="card-img-top" src={props.imageUrl} alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">by {props.author}</p>
                    {
                        props.disableActions?
                            null
                            :
                            <div className="bookActions">
                                {
                                    (props.shelfName !== "Currently Reading"?
                                    <button type="button" 
                                            className="btn btn-secondary" 
                                            data-toggle="tooltip" 
                                            data-placement="bottom" 
                                            title="Currently reading"
                                            onClick={addToCurrentlyReading}>
                                        <i className="fab fa-readme"></i>
                                    </button>
                                    :
                                    null)
                                }
                                {

                                    (props.shelfName !== "Want to read"?
                                    <button type="button" 
                                            className="btn btn-secondary" 
                                            data-toggle="tooltip" 
                                            data-placement="bottom" 
                                            title="Want to read"
                                            onClick={addToWantToRead}>
                                        <i className="fas fa-glasses"></i>
                                    </button>
                                    :
                                    null)
                                }
                                {
                                    (props.shelfName !== "Read"?
                                    <button type="button" 
                                            className="btn btn-secondary" 
                                            data-toggle="tooltip" 
                                            data-placement="bottom" 
                                            title="Read"
                                            onClick={addToRead}>
                                        <i className="fas fa-check"></i>
                                    </button>
                                    :
                                    null)
                                }
                            </div>
                    }
                </div>
            </div>
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

const ConnectedBook = connect(mapStateToProps, mapDispatchToProps)(Book);

export default ConnectedBook;