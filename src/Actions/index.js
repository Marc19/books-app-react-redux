import { 
    ADD_BOOKS_FROM_QUERY,
    MOVE_TO_CURRENTLY_READING,
    MOVE_TO_WANT_TO_READ,
    MOVE_TO_READ, 
    REMOVE_FROM_MY_BOOKS } from "../Constants/action-types";

export function addBooksFromQuery(payload) {
    return { type: ADD_BOOKS_FROM_QUERY, payload }
};

export function moveToCurrentlyReading(payload) {
    return { type: MOVE_TO_CURRENTLY_READING, payload }
};

export function moveToWantToRead(payload) {
    return { type: MOVE_TO_WANT_TO_READ, payload }
};

export function moveToRead(payload) {
    return { type: MOVE_TO_READ, payload }
};

export function removeBook(payload) {
    return { type: REMOVE_FROM_MY_BOOKS, payload }
};