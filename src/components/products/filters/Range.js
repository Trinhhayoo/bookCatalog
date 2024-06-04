import { BooksContext } from "../../../contexts/BooksProvider"
import { FILTERS_ACTION } from "../../../constants/dispatchTypes";
import { useContext } from "react";

const Range = () => {
    const {filtersDispatch,filtersState:{ratingSort}}=useContext(BooksContext)
    const handleSortChange=(e)=>{
        console.log(e.target.value)
      filtersDispatch({type:FILTERS_ACTION.CHANGE_RATING_SORT,payload:e.target.value})
    }
      return (
          <fieldset className='pb-4 border-b border-gray-500'>
              <legend className='text-sm text-gray-100'>Rating</legend>
                <ul className="text-sm font-medium text-gray-100 ">
                    <li className="w-full">
                      <div className="flex items-center pl-3 ">
                        <input
                          id="desc"
                          onChange={handleSortChange}
                          type="radio"
                          value="DESC"
                          checked={ratingSort==="DESC"}
                          name="price-sort-radio"
                          className="w-4 h-4 bg-gray-700 border-gray-500 cursor-pointer text-cyan-600 focus:ring-cyan-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
                          />
                        <label
                          htmlFor="desc"
                          className="w-full py-2 ml-2 text-sm font-medium text-gray-100 cursor-pointer"
                        >
                          High to Low
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="asc"
                          type="radio"
                          onChange={handleSortChange}
                          checked={ratingSort==="ASC"}
                          value="ASC"
                          name="price-sort-radio"
                          className="w-4 h-4 bg-gray-700 border-gray-500 cursor-pointer text-cyan-600 focus:ring-cyan-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
                        />
                        <label
                          htmlFor="asc"
                          className="w-full py-2 ml-2 text-sm font-medium text-gray-100 cursor-pointer"
                        >
                          Low To High
                        </label>
                      </div>
                    </li>
                  </ul>
          </fieldset>
           );
};
   


export default Range;