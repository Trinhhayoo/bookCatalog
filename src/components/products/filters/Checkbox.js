import { useContext } from "react";
import { BooksContext } from "../../../contexts/BooksProvider";
import { FILTERS_ACTION } from "../../../constants/dispatchTypes.js"

const Checkbox = () => {
  const {
    booksState: { author },
    filtersState: { selectedAuthor },
    filtersDispatch,
  } = useContext(BooksContext);
  console.log(author);

  const changeHandler = (e) => {
    let authors = selectedAuthor;
    if (selectedAuthor.includes(e.target.value)) {
      authors = selectedAuthor.filter((ele) => ele !== e.target.value);
    } else {
      authors = [...selectedAuthor, e.target.value];
    }
    filtersDispatch({
      type: FILTERS_ACTION.UPDATE_AUTHOR,
      payload:authors,
    });
  };
  return (
    <fieldset className="pb-4">
      <legend className="text-sm text-gray-100">Author</legend>
      <ul className="text-sm font-medium text-gray-100">
        {author.length !== 0 && author.forEach((name) => (
          <li key={name} className="w-full cursor-pointer">
            <div className="flex items-center pl-3">
              <input
                id={name}
                onChange={changeHandler}
                name="categories"
                value={name}
                type="checkbox"
                checked={selectedAuthor.includes(name)}
                className="w-4 h-4 bg-gray-700 border-gray-500 cursor-pointer text-cyan-600 focus:ring-cyan-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
              />
              <label
                htmlFor={name}
                className="w-full py-2 ml-2 text-sm font-medium text-gray-100 cursor-pointer"
              >
                {name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default Checkbox;
