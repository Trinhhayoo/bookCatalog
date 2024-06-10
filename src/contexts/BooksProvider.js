import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { filtersInitialState } from "./initialStates/FilterInitialState";
import { booksInitialState } from "./initialStates/BooksInitialState";
import filters from "./reducers/Filters";
import books from "./reducers/Books";
import { BOOKS_ACTIONS, FILTERS_ACTION } from "../constants/dispatchTypes";
import { toast } from "react-hot-toast";

import { fireStore, storage } from "../database/firebase";
import {
  onSnapshot,
  getFirestore,
  collection,
  getDocs,
  orderBy,
  doc,
  getDoc,
  setDoc,
  query,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import {
  uploadBytesResumable,
  getMetadata,
  getDownloadURL,
  ref as sRef,
  listAll,
} from "firebase/storage";

export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [filtersState, filtersDispatch] = useReducer(
    filters,
    filtersInitialState
  );
  const [booksState, booksDispatch] = useReducer(books, booksInitialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookData, setBooks] = useState([]);
  const [imageMap, setImageMap] = useState(new Map());

  const { selectedAuthor, publicationYear, ratingSort } = filtersState;
  const { booksData, author,  editingBook } = booksState;

  const searchProductsHandler = () =>
    searchTerm === ""
      ? booksData.sort((a, b) => b.publicationYear - a.publicationYear)
      : booksData.filter((books) =>
          books.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const changeAuthorHandler = (payload) => {
    console.log(payload);
    return selectedAuthor.length === 0
      ? payload
      : payload.filter(({ Authors }) => {
          // Kiểm tra xem selectedAuthor có tồn tại trong mảng Authors hay không
          return Authors.some((author) => selectedAuthor.includes(author));
        });
  };

  const changeRatingSort = (payload) => {
    console.log("check rating sort" + payload);
    if (ratingSort === "") return payload;
    return payload
      .slice()
      .sort((a, b) =>
        ratingSort === "ASC" ? a.Rating - b.Rating : b.Rating - a.Rating
      );
  };
  

  const changePublicationYear = (payload) => {
    if (publicationYear == true) return payload;
  };

  const handleFilterReset = () => {
    filtersDispatch({ type: FILTERS_ACTION.RESET, payload: "" });
  };

  const allSortsAndFilters = () => {
    let filteredData = searchProductsHandler();
    if (selectedAuthor.length !== 0) {
      filteredData = changeAuthorHandler(filteredData);
    } else if (ratingSort != "") {
      filteredData = changeRatingSort(filteredData);
    }

    return filteredData;
  };

  const handleError = (e) => {
    console.error(e);
    toast.error("Something Went Wrong, Try Later");
  };
  const updateBook = async (dispatch) => {
    if (bookData.length !== 0 && imageMap.length !== 0) {
      const updatedBookData = bookData.map((book) => {
        const bookIdStr = book.id.toString(); // Ensure book.id is a string
        const imageUrl = imageMap.get(bookIdStr);

        if (!imageUrl) {
          console.error(`No image URL found for book ID: ${bookIdStr}`);
        }

        return {
          ...book,
          imageUrl: imageUrl || "", // Default to empty string if no URL is found
        };
      });

      console.log(updatedBookData);

      booksDispatch({
        type: BOOKS_ACTIONS.SAVE_BOOKS_DATA,
        payload: updatedBookData,
      });
    }
  };
  const addNewBook = async (newBook) => {
    try {
      const booksRef = collection(fireStore, "Books");
      await setDoc(doc(booksRef), newBook);
      booksDispatch({ type: BOOKS_ACTIONS.ADD_BOOK, payload: newBook });
      toast.success("New book added successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  const saveEditBook = (book) => {
    booksDispatch({ type: BOOKS_ACTIONS.SAVE_EDIT_BOOK, payload: book});

  }
  const updateBookData = async (updatedBook, id) => {
    try {
      console.log(updatedBook)
      const booksRef = doc(fireStore, "Books", id);
      await updateDoc(booksRef, updatedBook);
      booksDispatch({ type: BOOKS_ACTIONS.EDIT_BOOK, payload: updatedBook });
      toast.success("Book updated successfully!");
    } catch (error) {
      handleError(error);
    }
  };

 
  
  const deleteBook = async (bookId) => {
    try {
      const booksRef = doc(fireStore, "Books", bookId);
      await deleteDoc(booksRef);
      booksDispatch({ type: BOOKS_ACTIONS.DELETE_BOOK, payload: bookId });
      toast.success("Book deleted successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  const getAuthor = async (dispatch) => {
    const uniqueAuthors = new Set();
    if (bookData.length !== 0) {
      booksData.forEach((book) => {
        if (Array.isArray(book.Authors)) {
          book.Authors.forEach((author) => uniqueAuthors.add(author));
        }
        console.log(uniqueAuthors);
        dispatch({
          type: BOOKS_ACTIONS.SAVE_AUTHOR_DATA,
          payload: uniqueAuthors,
        });
      });
    }
  };
  const recommendBook = () => {
    
    // Lọc ra các cuốn sách được xuất bản từ 3 năm trước trở về trước
    const oldBooks = booksData.filter(book => books.publicationYear <= new Date().getFullYear() - 3);
    console.log(oldBooks);
    // Lọc ra các cuốn sách có rating cao nhất
    const bestRatedBooks = oldBooks.filter(book => book.Rating === Math.max(...oldBooks.map(b => b.Rating)));
  console.log(bestRatedBooks)
    // Nếu có nhiều cuốn sách tốt khớp với tiêu chí, chọn một cuốn ngẫu nhiên
    if (bestRatedBooks.length > 1) {
      return bestRatedBooks[Math.floor(Math.random() * bestRatedBooks.length)];
    
    } else if (bestRatedBooks.length === 1) {
    
      return bestRatedBooks[0];
    } else {
      return null; // Không có cuốn sách nào khớp với tiêu chí
    }
  }

  const getAllData = async (dispatch) => {
    setBooks(await getAllBooks());
    const images = await getImageOfBooks();

    const imageMap = new Map(
      images.map((img) => [img.name.split(".")[0], img.url])
    );
    setImageMap(imageMap);
  };

  useEffect(() => {
    getAllData(booksDispatch);
  }, [bookData]);
  useEffect(() => {
    updateBook(booksDispatch);
    getAuthor(booksDispatch);
    
  }, [bookData, imageMap]);
  

  return (
    <BooksContext.Provider
      value={{
        addNewBook,
        deleteBook,
        updateBook,
        updateBookData,
        getAllData,
        filtersState,
        filtersDispatch,
        booksState,
        booksDispatch,
        searchProductsHandler,
        changeAuthorHandler,
        allSortsAndFilters,
        handleFilterReset,
        changePublicationYear,
        searchTerm,
        setSearchTerm,
        getAllBooks,
        saveEditBook,
        recommendBook
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;

const getAllBooks = async () => {
  try {
    const booksRef = collection(fireStore, "Books");

    const booksQuery = query(
      booksRef,
      orderBy("publicationYear", "desc"),
      orderBy("Name", "asc")
    );
    const snapshot = await getDocs(booksQuery);

    const booksData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Spread document data into the object
    }));

    return booksData;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const getImageOfBooks = async () => {
  const imageRef = sRef(storage, "booksImage");

  try {
    const result = await listAll(imageRef);

    const imagePromises = result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        url,
      };
    });

    const images = await Promise.all(imagePromises);

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};
