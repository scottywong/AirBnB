import { useState,useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeSpot } from '../../../store/spot';

import './SpotListItem.css';

const SpotListItem = ({spot}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state=> state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=> {
    /**** Check if you own Spot, if so load "Edit" + "Delete" Buttons */
    if(currentUser && currentUser.id === spot.ownerId) setIsLoaded(true);
  },[]);
  
  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(removeSpot(spot.id));
  }
    return(
        <div className="spot-item-container">
            <br/>
            <img className="spot-previewImage" src={spot.previewImage}></img>
            <NavLink className="spot-item-name" to={`/spots/${spot.id}`}>{spot.name}</NavLink>
            <p>{spot.city}, {spot.country} </p>
            <p><b>${spot.price}</b> night</p>
        
        {isLoaded &&
            (
            <>
            <button className="spot-item-edit" onClick={()=>history.push(`/spots/${spot.id}/edit`)}> Edit </button> 
            <button onClick={handleDelete} className="spot-item-delete"> Delete </button>  
            <br/>
            </>
            )   
        }  
        </div>
    );
}

export default SpotListItem;