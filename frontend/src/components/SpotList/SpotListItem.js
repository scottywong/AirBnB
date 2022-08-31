import { NavLink } from 'react-router-dom';
import './SpotListItem.css';
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const SpotListItem = ({spot}) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state=> state.session.user);
  let isLoaded = false;

  /**** Check if you own Spot, if so load "Edit" + "Delete" Nav Links */
  if(currentUser && currentUser.id === spot.ownerId){
    isLoaded = true;
  }

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

    return(
        <div className="spot-item-container">
            <br/>
            <NavLink className="spot-item-name" to={`/spots/${spot.id}`}>{spot.name}</NavLink>
            <p>{spot.city}, {spot.country} </p>
            <p><b>${spot.price}</b> night</p>
        
        {isLoaded &&
            (
            <>
            <NavLink className="spot-item-edit" to={`/spots/${spot.id}/edit`}> Edit </NavLink> 
            <NavLink className="spot-item-delete" to={`/spots/${spot.id}`}> Delete </NavLink>  
            <br/>
            </>
            )   
        }  
        </div>
    );
}

export default SpotListItem;