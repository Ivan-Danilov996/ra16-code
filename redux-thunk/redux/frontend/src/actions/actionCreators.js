import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE,
  CHANGE_SERVICE_EDIT_FIELD,
  FETCH_SERVICE_EDIT_SUCCESS
  //FETCH_REMOVE_SERVICE_REQUEST
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
})

export const addServiceFailure = error => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});


export const changeServiceEditField = (name, value) => ({
  type: CHANGE_SERVICE_EDIT_FIELD,
  payload: {
    name,
    value
  }
})

export const removeService = id => ({
  type: REMOVE_SERVICE,
  payload: {
    id,
  },
});

// export const fetchRemoveServiceRequest = () => (
//   {
//     type: FETCH_REMOVE_SERVICE_REQUEST,
//   }
// )

export const fetchRemoveService = async (dispatch, id) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`http://localhost:7070/api/services/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    else if (response.status.toString().substr(0, 1) !== '2') {
      throw new Error('Произошла ошибка!');
    }
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
  fetchServices(dispatch)
}





export const addService = async (dispatch, name, price) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure('Произошла ошибка!'));
  }
  fetchServices(dispatch);
}

export const fetchServiceRequest = () => ({ 
  type: FETCH_SERVICE_REQUEST 
})

export const fetchServiceFailure = error => ({
  type: FETCH_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const fetchServiceSuccess = item => ({
  type: FETCH_SERVICE_SUCCESS,
  payload: {
    item,
  },
});

export const fetchServiceEditSuccess = () => ({
  type: FETCH_SERVICE_EDIT_SUCCESS
}) 

export const fetchService = async (dispatch, id) => {
  dispatch(fetchServiceRequest())
  try {
    const response = await fetch(`http://localhost:7070/api/services/${id}`)
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data)
    dispatch(fetchServiceSuccess(data));
  } catch (e) {
    dispatch(fetchServiceFailure('Произошла ошибка!'));
  }
}


export const fetchServices = async dispatch => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure('Произошла ошибка!'));
  }
}

export const editService = async (dispatch, name, price, content, id) => {
  dispatch(fetchServiceRequest())
  try {
    const response = await fetch(`http://localhost:7070/api/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, content, id }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(fetchServiceEditSuccess());
  } catch(e) {
    dispatch(fetchServiceFailure('Произошла ошибка!'));
  }
}
