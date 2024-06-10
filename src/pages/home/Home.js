import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../contexts/BooksProvider";

import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/loader/Loader";
import { Transition } from "@headlessui/react";
const Home = () => {
  const [showLoader, setShowLoader] = useState(true);
  const { filtersState, booksState, allSortsAndFilters } =
    useContext(BooksContext);

  useEffect(() => {
    document.title = "Products | The Book Shelf";
    const loader = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(loader);
  }, []);

  

 

  

  const { booksData } = booksState;

  console.log(booksData)
  const { selectedAuthor, publicationYear, ratingSort } = filtersState;

  const [isBooksByYearExpanded, setIsBooksByYearExpanded] = useState({});
  const [booksPerYear, setBooksPerYear] = useState(4);
  console.log(booksData);
  console.log(allSortsAndFilters());
  const toggleBooksByYear = (year) => {
    setIsBooksByYearExpanded((prevState) => ({
      ...prevState,
      [year]: !prevState[year],
    }));
  };

  if (showLoader) return <Loader />;
  return (
    <>
      <Transition
        appear={true}
        enter="transition-all ease-in-out duration-500 delay-[100ms]"
        enterFrom="opacity-0 translate-y-6"
        show={true}
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {booksData && booksData.length > 0 && (
          <div>
            {Object.entries(
              allSortsAndFilters().reduce((acc, book) => {
                let year;
                if (publicationYear) year = book.publicationYear;
                if (ratingSort !== "") year = book.Rating;
                if (selectedAuthor.length !== 0) year = book.Authors;
                if (!acc[year]) {
                  acc[year] = [];
                }
                acc[year].push(book);
                return acc;
              }, {})
            )
              .sort(([yearA], [yearB]) => {
                if (ratingSort === "ASC") {
                  return yearA - yearB;
                } else {
                  return yearB - yearA;
                }
              })

              .map(([year, books]) => (
                <div key={year} className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-500 py-2 px-4">
                      <h3 className="text-lg font-bold text-white">{year}</h3>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
                        onClick={() =>
                          setBooksPerYear(Math.max(booksPerYear - 4, 4))
                        }
                      >
                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => setBooksPerYear(booksPerYear + 4)}
                      >
                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4 overflow-x-auto">
                    {books.slice(0, booksPerYear).map((book) => (
                      <ProductCard key={book.name} product={book} />
                    ))}
                  </div>
                  {books.length > booksPerYear && (
                    <div className="mt-4 flex justify-center">
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => toggleBooksByYear(year)}
                      >
                        {isBooksByYearExpanded[year] ? (
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                  {isBooksByYearExpanded[year] && (
                    <div className="mt-4 flex space-x-4 overflow-x-auto">
                      {books.slice(booksPerYear).map((book) => (
                        <ProductCard key={book.name} product={book} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </Transition>
      {booksData === 0 && allSortsAndFilters().length === 0 && (
        <div className="flex justify-center my-20 sm:my-32">
          <p className="text-2xl text-center text-gray-100 sm:text-4xl">
            Oops! Looks like our Book Shelf is empty. 😟
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
