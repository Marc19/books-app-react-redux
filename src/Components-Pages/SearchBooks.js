import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SearchBooks.css';
import axios from 'axios'
import { connect } from "react-redux";
import { addBooksFromQuery } from '../Actions/index';
import BookShelf from '../Components-Parts/BookShelf';

const API_KEY = "vwRIG0hWLZTJXk8UZ6pUVA";
const URL = `http://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml`

class SearchBooks extends Component {
    
    componentDidMount(){
      this.props.addBooksFromQuery([]);
    }

    dataChanged(e){
        this.setState({[e.target.id]: e.target.value}, () => {
            if(this.state.searchInput.trim().length === 0){
                this.props.addBooksFromQuery([]);
                return;
            }
            axios.get(URL, {
                params: {
                  key: API_KEY,
                  q: this.state.searchInput
                }
              }).then(response => {
                //parsing xml
                  var parser = new DOMParser();
                  var xmlDoc = parser.parseFromString(response.data, "text/xml");
                  var GoodreadsResponse = xmlDoc.getElementsByTagName("GoodreadsResponse")[0]
                  var search = GoodreadsResponse.childNodes[3]
                  var query = search.childNodes[13]
                  var resultsHtmlCollection = query.children
                                    
                  var resultBooksFromQuery = [];
                  for (let work of resultsHtmlCollection) {
                    let best_book = work.childNodes[17]

                    let id = best_book.childNodes[1].childNodes[0].nodeValue
                    let title = best_book.childNodes[3].childNodes[0].nodeValue
                    let author = best_book.childNodes[5].childNodes[3].childNodes[0].nodeValue
                    let imageUrl = best_book.childNodes[7].childNodes[0].nodeValue

                    var book = Object.assign({}, {id:id}, {title:title}, {author:author}, {imageUrl:imageUrl})

                    var myBook = this.props.myBooks.find(b => b.id === id)
                    if(myBook){
                      book.currentlyReading = myBook.currentlyReading
                      book.wantToRead = myBook.wantToRead
                      book.read = myBook.read
                    }
                    else{
                      book.currentlyReading = false
                      book.wantToRead = false
                      book.read = false
                    }

                    resultBooksFromQuery.push(book)
                  }  

                  this.props.addBooksFromQuery(resultBooksFromQuery)
              })
        });

    }

    render () {
        return (
            <div>
                <input 
                    id="searchInput" 
                    type="text" 
                    className="form-control mt-2"
                    placeholder="Search for books..."
                    onChange={this.dataChanged.bind(this)}/> 
                
                <BookShelf shelfName= "Currently Reading" 
                           books= {this.props.booksFromQuery.filter(book => book.currentlyReading)}
                           disableActions={true}/>
                
                <BookShelf shelfName= "Want to read" 
                           books= {this.props.booksFromQuery.filter(book => book.wantToRead)}
                           disableActions={true}/>
                
                <BookShelf shelfName= "Read" 
                           books= {this.props.booksFromQuery.filter(book => book.read)}
                           disableActions={true}/>

                <BookShelf shelfName= "None" 
                           books= {this.props.booksFromQuery.filter(book => 
                                  (!book.currentlyReading) && (!book.wantToRead) && (!book.read))}/>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {myBooks: state.myBooks, booksFromQuery: state.booksFromQuery}
}

const mapDispatchToProps = dispatch => {
    return {
        addBooksFromQuery: payload => dispatch(addBooksFromQuery(payload))
      };
}

const ConnectedSearchBooks = connect(mapStateToProps, mapDispatchToProps)(SearchBooks);

export default ConnectedSearchBooks