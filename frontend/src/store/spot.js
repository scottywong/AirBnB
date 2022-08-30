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
    const response = await fetch('/api/spots');
   
    const spots = await response.json();
    console.log('spots: ', spots);
    dispatch(loadSpots(spots.spots));
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
        newState.spot = action.payload;
        return newState;
    case  UPDATE_SPOT:
        newState = Object.assign({}, state);
        newState.spot = action.payload;
        return newState;
    case REMOVE_SPOT:
        newState = Object.assign({}, state);
        newState.spot = null;
        return newState;
    default:
        return state;
    };
}

export default spotReducer;
