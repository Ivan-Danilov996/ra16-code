import {
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_SUCCESS,
  CHANGE_SEARCH_FIELD,
  CLEAR_LIST,
} from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
  cancel: false
};

export default function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_SKILLS_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case SEARCH_SKILLS_SUCCESS:
      const {items} = action.payload;
      if (state.cancel) {
        return {
          ...initialState,
          cancel: false
        }
      }
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    case CHANGE_SEARCH_FIELD:
      const {search} = action.payload;
      return {
        ...state,
        search
      };
      case CLEAR_LIST: {
        return {
          ...initialState,
          cancel: true
        }
      }
    
    default:
      return state;
  }
}
