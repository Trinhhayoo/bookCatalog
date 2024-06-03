import { useContext } from "react";
import { BooksContext } from './../../../contexts/BooksProvider';
import { FILTERS_ACTION } from "../../../constants/dispatchTypes.js";

const Radio = () => {
  const {filtersDispatch,filtersState:{publicationYear}}=useContext(BooksContext)
  const handlePublicationYearChange=(e)=>{
    filtersDispatch({type:FILTERS_ACTION.UPDATE_PUBLICATION_YEAR,payload:e.target.value})
  }
    return (
        <fieldset className='pb-4 border-b border-gray-500'>
            <legend className='text-sm text-gray-100'>Publication Year</legend>
              <ul className="text-sm font-medium text-gray-100 ">
                  <li className="w-full">
                    <div className="flex items-center pl-3 ">
                      <input
                        id="true"
                        onChange={handlePublicationYearChange}
                        type="radio"
                        value={!publicationYear}
                        checked={publicationYear}
                        name="price-sort-radio"
                        className="w-4 h-4 bg-gray-700 border-gray-500 cursor-pointer text-cyan-600 focus:ring-cyan-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
                        />
                      
                    </div>
                  </li>
                
                </ul>
        </fieldset>
    );
};

export default Radio;