import { useNavigate} from "react-router-dom";

import { useState, useEffect , useContext} from "react";

import React from "react";

import { BooksContext } from "../../contexts/BooksProvider";

const UploadSong = () => {
  const { addNewBook } =
  useContext(BooksContext);
  const navigate = useNavigate();

  const [bookName, setbookName] = useState("");
  const [bookNameError, setbookNameError] = useState("");

  const [authors, setAuthors] = useState([]);
  const [authorError, setAuthorError] = useState("");

  const [rating, setRating] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [publicationYear, setPublication] = useState("");
  const [publicationYearError, setPublicationYearError] = useState("");

  const [ISBN, setISBN] = useState("");
  const [ISBNError, setISBNError] = useState();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImagePost, setUploadedImagePost] = useState(null);

  const [isUploaded, setIsUploaded] = useState(false);

  const [isFormValid, setIsFormValid] = useState(true);
  const [responseData, setResponseData] = useState();

  const [uuid, setUuid] = useState(null);

  const [author, setAuthor] = useState();

  const [showPopup, setShowPopup] = useState(false);


const waitForAdd = () => {
    const loader = setTimeout(() => {
      setIsUploaded(true);
    }, 2000);
    return () => clearTimeout(loader);
}

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

    const newPath = "/";
    navigate(newPath);
    window.location.replace(newPath);
  };
  // Utility function to validate ISBN-10
  function isValidIsbn10(isbn) {
    const regex = /^(?:\d{9}\d|[A-Z]{1}|\d[A-Z]{1})$/;
    return regex.test(isbn);
  }

  // Utility function to validate ISBN-13
  function isValidIsbn13(isbn) {
    const regex =
      /^(?:\d{12}\d|[A-Z]{1}|\d[A-Z]{1}|\d{1,5}-\d{1,7}-\d{1,6}-\d)$/;
    return regex.test(isbn);
  }
  const checkISBN = (isbn) => {
    return isValidIsbn10(isbn) || isValidIsbn13(isbn);
  };
  const validateForm = (bookName, authors, rating, publicationYear, ISBN) => {
    const errors = {};
  
    // Validate Name
    if (!bookName) {
      errors.bookNameError = "Book's name is required";
    } else if (bookName.length > 100) {
      errors.bookNameError = "Book's name cannot be longer than 100 characters";
    }
  
    // Validate Authors
    if (authors.length === 0) {
      errors.authorError = "Author must have at least one";
    }
  
    // Validate Publication Year
    if (publicationYear && (publicationYear < 1800 || isNaN(publicationYear))) {
      errors.publicationYearError = "Publication year must be greater than 1800";
    }
  
    // Validate Rating
    if (rating && (isNaN(rating) || rating < 0 || rating > 10)) {
      errors.ratingError = "Rating must be a number between 0 and 10";
    }
  
    // Validate ISBN
    if (ISBN && !checkISBN(ISBN)) {
      errors.ISBNError = "ISBN is invalid";
    }
  
    return errors;
  };
  const handleInitialNotification = () => {
    if (bookName.length > 100) {
      setbookNameError("Book's name cannot be longer than 100 characters");
    } else {
      setbookNameError("");
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(bookName, authors, rating, publicationYear, ISBN);
    setbookNameError(errors.bookNameError || "");
    setAuthorError(errors.authorError || "");
    setRatingError(errors.ratingError || "");
    setPublicationYearError(errors.publicationYearError || "");
    setISBNError(errors.ISBNError || "");

    const isFormValid = Object.keys(errors).length === 0;

    if (isFormValid) {
      try {
        const newBook = {
          Name: bookName,
          Authors: authors,
          Rating: rating || 0,
          publicationYear: publicationYear || 0,
          ISBN: ISBN || ""
        };

        await addNewBook(newBook, crypto.randomUUID(), uploadedImagePost);

        setShowPopup(true);
        // resetForm();
      } catch (error) {
        console.error(error);
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
                  {authorError && <p className="text-red-500">{authorError}</p>}
                  <button
                    type="button"
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
          {showPopup && (
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
                    type="button"
                    onClick={handleContinue}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Continue Adding Books
                  </button>
                  <button
                    type="button"
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
              type="button"
              onClick={() => navigate("/")}
              className="bg-cancel_grey  px-8 py-4 my-2 rounded-xl   text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
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
export default UploadSong;
