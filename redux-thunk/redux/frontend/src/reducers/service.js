import {
    FETCH_SERVICE_REQUEST,
    FETCH_SERVICE_FAILURE,
    FETCH_SERVICE_SUCCESS,
    CHANGE_SERVICE_EDIT_FIELD,
    FETCH_SERVICE_EDIT_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: null,
    data: { name: '', price: '', content: '' },
    success: false
};

export default function serviceReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICE_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case FETCH_SERVICE_FAILURE: {
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error,
            };
        }
        case FETCH_SERVICE_SUCCESS: {
            const { item } = action.payload;
            const { name, price, content } = item
            const { data } = state
            return {
                ...state,
                loading: false,
                error: null,
                data: {
                    ...data,
                    name,
                    price,
                    content
                    
                }
            };
        }
        case CHANGE_SERVICE_EDIT_FIELD: {
            const { name, value } = action.payload;
            const { data } = state;
            return {
                ...state,
                data: {
                    ...data,
                    [name]: value,
                }
            };
        }
        case FETCH_SERVICE_EDIT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                success: true
            };
        }
        default:
            return state;
    }
}
