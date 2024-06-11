import { BOOKS_ACTIONS } from "../../constants/dispatchTypes";
import { booksInitialState } from "../initialStates/BooksInitialState";

const books = (state, { type, payload }) => {
  switch (type) {
    case BOOKS_ACTIONS.SAVE_BOOKS_DATA:
      return { ...state, booksData: payload };

    case BOOKS_ACTIONS.SAVE_AUTHOR_DATA:
      return { ...state, author: payload };


    case BOOKS_ACTIONS.SAVE_EDIT_BOOK:
      return { ...state,  editingBook: payload };

    case BOOKS_ACTIONS.RESET:
      return booksInitialState;

    case BOOKS_ACTIONS.EDIT_BOOK:
      return {
        ...state,
        booksData: state.booksData.map((book) =>
          book.id === payload.id ? { ...book, ...payload.updatedData } : book
        ),
      };
    case BOOKS_ACTIONS.DELETE_BOOK:
      return {
        ...state,
        booksData: state.booksData.filter((book) => book.id !== payload.id),
      };

    case BOOKS_ACTIONS.ADD_BOOK:
      return {
        ...state,
        booksData: [...state.booksData, payload.newBook],
      };

    default:
      return state;
  }
};
export default books;
