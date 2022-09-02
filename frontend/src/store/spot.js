import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/load'
const CREATE_SPOT = 'spots/create';
const UPDATE_SPOT = 'spots/update';
const REMOVE_SPOT = 'spots/delete';

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    payload: spots
  });
  
export const create = (spot) => ({
    type: CREATE_SPOT,
    payload: spot
  });

export const update = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot
  });
  
export const remove = (spotId) => ({
    type: REMOVE_SPOT,
    payload: spotId
  });
  

export const fetchSpots = () => async (dispatch) => {
    let response;
    response = await fetch('/api/spots');
    
    if(response.ok){
      const spots = await response.json();
      dispatch(loadSpots(spots.spots));
      return spots;
    }
  };

export const fetchSpotById = (spotId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/spots/${spotId}`);

    if(response.ok){
      const oneSpot = await response.json();
      dispatch(loadSpots(oneSpot));
      return oneSpot;
    }
    
};


export const createSpot = (spot) => async (dispatch) => {
    let response;
    response = await csrfFetch('/api/spots/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    }
    );
    
    if (response.ok) {
      const createdSpot = await response.json();
      dispatch(create(createdSpot));
      return createSpot;
    }

};

export const updateSpot = (spot,spotId) => async (dispatch) => {
  let response;
  response = await csrfFetch(`/api/spots/${spotId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  }
  );
  
  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(update(updatedSpot));
    return updatedSpot;
  }

};

export const removeSpot = (id) => async (dispatch) => {
  let response;
  response = await csrfFetch(`/api/spots/${id}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  );

  if (response.ok) {
    return dispatch(remove(id));
  }

};

const initialState = {};

console.log('initialState:', initialState)

const spotReducer = (state = initialState, action) => {

    let newState;

    switch (action.type) {
    case LOAD_SPOTS:
        newState = Object.assign({}, state);
        newState.spot = action.payload;
        return newState;
    case CREATE_SPOT:
        newState = Object.assign({}, state);
        newState.spot = action.payload
        return newState;
    case UPDATE_SPOT:
        newState = Object.assign({}, state);
        newState.spot = action.payload;
        return newState;
    case REMOVE_SPOT:
        newState = Object.assign({}, state);
        newState.spot = newState.spot.filter(spot=> spot.id !== action.payload);
        return newState;
    default:
        return state;
    };
}

export default spotReducer;
