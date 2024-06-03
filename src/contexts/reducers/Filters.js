import { FILTERS_ACTION } from "../../constants/dispatchTypes";
import { filtersInitialState } from "../initialStates/FilterInitialState";

const filters = (state, { type, payload }) => {
  switch (type) {
    case FILTERS_ACTION.RESET:
      return filtersInitialState;

    case FILTERS_ACTION.UPDATE_PUBLICATION_YEAR:
      return { ...state, publicationYear: payload };

    case FILTERS_ACTION.UPDATE_AUTHOR:
      return { ...state, UPDATE_AUTHOR: [...payload] };


    case FILTERS_ACTION.UPDATE_RATING_SLIDER:
      return { ...state, ratingSlider: payload };
      
    default:
      return state;
  }
};
export default filters;
