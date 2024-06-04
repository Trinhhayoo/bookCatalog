import { FILTERS_ACTION } from "../../constants/dispatchTypes";
import { filtersInitialState } from "../initialStates/FilterInitialState";

const filters = (state, { type, payload }) => {
  switch (type) {
    case FILTERS_ACTION.RESET:
      return filtersInitialState;

    case FILTERS_ACTION.UPDATE_PUBLICATION_YEAR:
      return {
        ...state,
        publicationYear: payload,
        selectedAuthor: [],
        ratingSort: "",
      };

    case FILTERS_ACTION.UPDATE_AUTHOR:
      return {
        ...state,
        selectedAuthor: [...payload],
        publicationYear: false,
        ratingSort: "",
      };

    case FILTERS_ACTION.CHANGE_RATING_SORT:
      return {
        ...state,
        ratingSort: payload,
        publicationYear: false,
        selectedAuthor: []
      };

    default:
      return state;
  }
};
export default filters;
