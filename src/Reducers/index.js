import { 
        ADD_BOOKS_FROM_QUERY,
        MOVE_TO_CURRENTLY_READING,
        MOVE_TO_WANT_TO_READ,
        MOVE_TO_READ, 
        REMOVE_FROM_MY_BOOKS } from "../Constants/action-types";

function rootReducer(state = [], action) {
    // console.log("state from reducer: ", state)
    // console.log("action from reducer: ", action)

    switch(action.type){
        case ADD_BOOKS_FROM_QUERY:
            return Object.assign({}, state, {booksFromQuery: action.payload});

        case MOVE_TO_CURRENTLY_READING:            
            return Object.assign({}, state,
                 {
                    myBooks: state.myBooks.filter(book => book.id === action.payload.id).length === 1? //is it already in myBooks? 
                             state.myBooks.map(book => {
                                if(book.id === action.payload.id){
                                    return Object.assign({}, book, {currentlyReading : true, wantToRead:false, read:false})
                                }
                                return book
                             })
                             :   
                             [
                                ...state.myBooks,
                                Object.assign({}, 
                                              state.booksFromQuery.find(book => book.id === action.payload.id),
                                              {currentlyReading : true, wantToRead:false, read:false})
                             ],

                    booksFromQuery: state.booksFromQuery.map(book => {
                        if(book.id === action.payload.id){
                            return Object.assign({}, book, {currentlyReading : true, wantToRead:false, read:false})
                        }
                        return book
                    })
                })

        case MOVE_TO_WANT_TO_READ:
            return Object.assign({}, state,
                 {
                     myBooks: state.myBooks.filter(book => book.id === action.payload.id).length === 1? //is it already in myBooks? 
                            state.myBooks.map(book => {
                                if(book.id === action.payload.id){
                                    return Object.assign({}, book, {currentlyReading:false, wantToRead:true, read:false})
                                }
                                return book
                            })
                            :   
                            [
                                ...state.myBooks,
                                Object.assign({}, 
                                              state.booksFromQuery.find(book => book.id === action.payload.id),
                                              {currentlyReading:false, wantToRead:true, read:false})
                            ],

                    booksFromQuery: state.booksFromQuery.map(book => {
                        if(book.id === action.payload.id){
                            return Object.assign({}, book, {currentlyReading:false, wantToRead:true, read:false})
                        }
                        return book
                    })
                    
                }) 

        case MOVE_TO_READ:
            return Object.assign({}, state,
                 {
                     myBooks: state.myBooks.filter(book => book.id === action.payload.id).length === 1? //is it already in myBooks? 
                            state.myBooks.map(book => {
                                if(book.id === action.payload.id){
                                    return Object.assign({}, book, {currentlyReading : false, wantToRead:false, read:true})
                                }
                                return book
                            })
                            :   
                            [
                                ...state.myBooks,
                                Object.assign({}, 
                                              state.booksFromQuery.find(book => book.id === action.payload.id),
                                              {currentlyReading : false, wantToRead:false, read:true})
                            ],

                    booksFromQuery: state.booksFromQuery.map(book => {
                        if(book.id === action.payload.id){
                            return Object.assign({}, book, {currentlyReading:false, wantToRead:false, read:true})
                        }
                        return book
                    })
                    
                }) 

        case REMOVE_FROM_MY_BOOKS:
            return Object.assign({}, state,
                 {
                     myBooks: state.myBooks.filter(book => book.id !== action.payload.id)
                 })

        default: 
            return state

    }
}

export default rootReducer