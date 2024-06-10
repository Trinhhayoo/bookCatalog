import { useNavigate } from "react-router-dom";

import { useState, useEffect, useContext } from "react";

import React from "react";
import { BooksContext } from "../../contexts/BooksProvider";

import { fireStore, storage } from "../../database/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const EditBook = () => {
    const { filtersState, booksState, allSortsAndFilters, updateBookData } =
    useContext(BooksContext);
    const { editingBook } = booksState;

  const navigate = useNavigate();

  const [bookName, setbookName] = useState(editingBook.Name);
  const [bookNameError, setbookNameError] = useState("");

  const [authors, setAuthors] = useState(editingBook.Authors);
  const [authorError, setAuthorError] = useState("");

  const [rating, setRating] = useState(editingBook.Rating);
  const [ratingError, setRatingError] = useState("");

  const [publicationYear, setPublication] = useState(editingBook.publicationYear);
  const [publicationYearError, setPublicationYearError] = useState("");

  const [ISBN, setISBN] = useState(editingBook.ISBN);
  const [ISBNError, setISBNError] = useState();

  const [uploadedImage, setUploadedImage] = useState(editingBook.imageUrl);
  const [uploadedImagePost, setUploadedImagePost] = useState(null);

  const [isUploaded, setIsUploaded] = useState(false);

  const [isFormValid, setIsFormValid] = useState(true);
  const [responseData, setResponseData] = useState();

  const [uuid, setUuid] = useState(null);

  const [author, setAuthor] = useState();

  const [showPopup, setShowPopup] = useState(false);

  const handleContinue = () => {
    setShowPopup(false);
    setbookName("");
    setAuthors([]);
    setRating("");
    setPublication("");
    setISBN("");
    setUploadedImage(null);
  };


  const handleHome = () => {
    setShowPopup(false);

    const newPath = '/';
    navigate(newPath);
    window.location.replace(newPath);
  };
  const  checkISBN = (isbn) => {
    // Remove any non-digit characters from the input
    isbn = isbn.replace(/\D/g, '');
  
    // Check the length of the ISBN
    if (isbn.length !== 10 && isbn.length !== 13) {
      return false;
    }
  
    // Calculate the checksum for the ISBN
    let sum = 0;
    let weight = isbn.length === 10 ? 10 : 1;
  
    for (let i = 0; i < isbn.length - 1; i++) {
      sum += parseInt(isbn[i]) * weight;
      weight--;
    }
  
    let checkDigit = isbn.length === 10 ? parseInt(isbn[9]) : parseInt(isbn[12]);
    let remainder = sum % 11;
    let calculatedCheckDigit = isbn.length === 10 ? (remainder === 0 ? 0 : 11 - remainder) : (10 - remainder) % 10;
  
    // Compare the calculated check digit with the provided check digit
    return checkDigit === calculatedCheckDigit;
  }

 

  const handleSubmit = async (event) => {
    //  event.preventDefault();
    event.preventDefault();

    if (authors.length === 0) {
      setAuthorError("Author must have at least one");
      setIsFormValid(false);
    } else {
      setAuthorError("");
    }

    if (bookName === "") {
      setbookNameError("Song name is required");
      setIsFormValid(false);
    } else {
      setbookNameError("");
    }
    if (rating === ""){
      setRating(0)
    };
    if (publicationYear === "")
      setPublication(0);

    if (ISBN !== ""){
      if(!checkISBN(ISBN)) {
        setISBNError("ISBN is not invalid");
        setIsFormValid(false);

      }
      else {
        setbookNameError("");
      }
    } else {
      setbookNameError("");
    }
      

    setUuid(crypto.randomUUID());

   

    if (isFormValid) {
      try {
        const book = {
            Name: bookName,
            Authors: authors,
            Rating: rating,
            publicationYear: publicationYear,
            ISBN: ISBN
        }
        
        updateBookData(book, editingBook.id);


        
        setShowPopup(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (responseData !== undefined) {
      debugger;
      if (responseData.avatar !== null) {
        navigate("/home");
      }
    }
  }, [responseData]);

  const handleImageUpload = (imageFile) => {
    if (imageFile) {
      setUploadedImage(URL.createObjectURL(imageFile));
      setUploadedImagePost(imageFile);
    } else {
      setUploadedImage(null);
      setUploadedImagePost("");
    }
  };

  return (
    <div className=" w-full bg-gray-900 flex flex-col ">
      <div className="relative py-24 mt-16 overflow-hidden bg-gray-900 lg:mt-0 isolate sm:pt-32 sm:pb-16">
        <img
          src="https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/boksbg.png?updatedAt=1684597529803"
          alt="header-books"
          className="absolute inset-0 object-cover object-right w-full h-full -z-10 md:object-center"
        />
        <div className=" text-white flex my-10  justify-center font-bold text-3xl ">
          CREATE NEW BOOK
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row h-1/2 my-8 mx-8 justify-center">
            <div className="border border-dashed border-gray-300 p-4 w-[400px] flex flex-col items-center justify-center">
              {!uploadedImage ? (
                <>
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    accept=".jpg, .jpeg, .png, .gif"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                  <label
                    htmlFor="avatar"
                    className="flex flex-col items-center text-white hover:cursor-pointer"
                  >
                    <div className="text-white text-3xl">+</div>
                    Book's Image
                  </label>
                </>
              ) : (
                <img
                  src={uploadedImage}
                  className=" h-[400px] object-cover"
                  onClick={(e) => handleImageUpload(null)}
                />
              )}
            </div>

            <div className=" ml-10  flex flex-col w-2/5 gap-4 ">
              <div>
                <label className="text-white block mb-2">Book's name</label>

                <input
                  type="text"
                  className="pl-2 text-white w-full h-10 rounded bg-near_black focus:outline-none focus:border-blue-500"
                  value={bookName}
                  onChange={(e) => setbookName(e.target.value)}
                />
                {bookNameError && (
                  <p className="text-red-500">{bookNameError}</p>
                )}
              </div>
              {/* <div>
                <label className="text-white block mb-2">Authors</label>

                <input
                  type="text"
                  className="pl-2 text-white w-full h-10 rounded bg-near_black focus:outline-none focus:border-blue-500"
                  value={authors}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                {authorError && <p className="text-red-500">{authorError}</p>}
              </div> */}
              <div>
                <label className="text-white block mb-2">Authors</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="pl-2 text-white w-full h-10 rounded bg-near_black focus:outline-none focus:border-blue-500"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => {
                      if (author.trim()) {
                        setAuthors([...authors, author.trim()]);
                        setAuthor("");
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2">
                  {authors.map((auth, index) => (
                    <div
                      key={index}
                      className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {auth}
                      <button
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setAuthors(authors.filter((_, i) => i !== index))
                        }
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-white block mb-2">
                  Publication year
                </label>

                <input
                  type="text"
                  className="pl-2 text-white w-full h-10 rounded bg-near_black focus:outline-none focus:border-blue-500"
                  value={publicationYear}
                  onChange={(e) => setPublication(e.target.value)}
                />
                {publicationYearError && (
                  <p className="text-red-500">{publicationYearError}</p>
                )}
              </div>
              <div>
                <label className="text-white block mb-2">Rating</label>

                <input
                  type="text"
                  className="pl-2 text-white w-full h-10 rounded bg-near_black focus:outline-none focus:border-blue-500"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                {ratingError && <p className="text-red-500">{ratingError}</p>}
              </div>

              <div>
                <label className="text-white block mb-2">ISBN</label>

                <input
                  type="text"
                  className="pl-2 text-white w-full h-10 rounded bg-near_black focus:outline-none focus:border-blue-500"
                  value={ISBN}
                  onChange={(e) => setISBN(e.target.value)}
                />
                {ISBNError && <p className="text-red-500">{ISBNError}</p>}
              </div>
            </div>
          </div>
         { showPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
              <div className="flex justify-center mb-4">
                <svg
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Success!</h2>
              <p className="mb-6">Your book has been added successfully.</p>
              <div className="flex justify-between">
                <button
                  onClick={handleContinue}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Continue Adding Books
                </button>
                <button
                  onClick={handleHome}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  Go to Home Page
                </button>
              </div>
            </div>
          </div>
          )}
          <div className="text-white my-10 flex flex-row gap-4 justify-end mr-20">
            <button
              onClick={() => navigate("/home")}
              className="bg-cancel_grey  px-8 py-4 my-2 rounded-xl   text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-submit_blue  px-8 py-4 my-2 rounded-xl   text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditBook;
