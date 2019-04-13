import { createStore } from "redux";
import rootReducer from "../Reducers/index";

var myBooksPersisted = JSON.parse(localStorage.getItem('myBooksPersisted')) || []

const store = createStore(rootReducer,
                          {myBooks:myBooksPersisted, booksFromQuery: []},
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;