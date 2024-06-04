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
  const { booksData, author } = booksState;

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
  }, []);
  useEffect(() => {
    updateBook(booksDispatch);
    getAuthor(booksDispatch);
  }, [bookData, imageMap]);

  return (
    <BooksContext.Provider
      value={{
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
