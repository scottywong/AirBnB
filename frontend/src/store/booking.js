import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/load'
const LOAD_USERBOOKINGS = 'bookings/loaduser'
const CREATE_BOOKING = 'bookings/create';
const UPDATE_BOOKING = 'bookings/update';
const REMOVE_BOOKING = 'bookings/delete';

export const loadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    payload: bookings
  });

export const loadUserBookings = (bookings) => ({
  type: LOAD_USERBOOKINGS,
    payload: bookings
});
  
  
export const create = (booking) => ({
    type: CREATE_BOOKING,
    payload: booking
  });
export const update = (booking) => ({
    type: UPDATE_BOOKING,
    payload: booking
  });
  
export const remove = (bookingId) => ({
    type: REMOVE_BOOKING,
    payload: bookingId
  });
  

export const fetchBookings = () => async (dispatch) => {
    let response;
    response = await fetch('/api/bookings');
    
    if(response.ok){
      const bookings = await response.json();
      dispatch(loadBookings(bookings.bookings));
      return bookings;
    } else {

      return response;
    }
  };

export const fetchBookingById = (id) => async (dispatch) => {
    let response;
    response = await fetch(`/api/spots/${id}/currentUserBookings`);

    if(response.ok){
      const oneBooking = await response.json();
      dispatch(loadBookings(oneBooking));
      return oneBooking;
    } else {

      return response;
    }
    
};

export const fetchUserBookings = () => async (dispatch) => {
  let response;
  response = await fetch('/api/bookings/currentUserBookings');
  
  if(response.ok){
    const bookings = await response.json();
    console.log('bookings: ', bookings);
    dispatch(loadUserBookings(bookings.Bookings));
    return bookings.Bookings;
  } else {

    return response;
  }
};

export const createBooking = (booking,spotId) => async (dispatch) => {
    let response;
    response = await csrfFetch(`/api/spots/${spotId}/bookings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    }
    );
    
    if (response.ok) {
      const createdBooking = await response.json();
      dispatch(create(createdBooking));
      return createdBooking;
    } else {

      return response;
    }

};

export const updateBooking = (booking,bookingId) => async (dispatch) => {
  let response;
  response = await csrfFetch(`/api/bookings/${bookingId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking)
  }
  );
  
  if (response.ok) {
    const updatedBooking = await response.json();
    dispatch(update(updatedBooking));
    return updatedBooking;
  } else {
   
    return response;
  }

};

export const removeBooking = (id) => async (dispatch) => {
  let response;
  try{

    response = await csrfFetch(`/api/bookings/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return dispatch(remove(id));

   } catch(errors){

     console.log(response.errors);
  }

  // if (response.ok) {
  //   return dispatch(remove(id));
  // } else {
  //   console.log('did it return this error response?', response)
  //   return response;
  // }

};

const initialState = {};

console.log('initialState:', initialState)

const bookingReducer = (state = initialState, action) => {

    let newState;

    switch (action.type) {
    case LOAD_BOOKINGS:
        newState = Object.assign({}, state);
        newState.booking = action.payload;
        return newState;
    case LOAD_USERBOOKINGS:
        newState = Object.assign({}, state);
        newState.booking = action.payload;
        return newState;
    case CREATE_BOOKING:
        newState = Object.assign({}, state);
        newState.booking = action.payload
        return newState;
    case UPDATE_BOOKING:
        newState = Object.assign({}, state);

        if(Array.isArray(newState.booking)){
          let updatedBooking = newState.booking.find(booking => booking.id === action.payload.id)
          updatedBooking = action.payload;
        }
        return newState;
    case REMOVE_BOOKING:
        newState = Object.assign({}, state);
        newState.booking = newState.booking.filter(booking=> booking.id !== action.payload);
        return newState;
    default:
        return state;
    };
}

export default bookingReducer;
