import { useParams } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { fetchSpots } from "../../store/spot";
import { useEffect } from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";

import './SpotDetail.css';

const SpotDetail = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    let spots = useSelector(state=> state.spot.spot);
    let foundSpot;
    
    const currentUser = useSelector(state=> state.session.user);
    let isLoaded = false;

    useEffect(()=> {
      dispatch(sessionActions.restoreUser());
      dispatch(fetchSpots());
    },[dispatch]);
    
    if(id && Array.isArray(spots)){
    
      foundSpot = spots.find(spot => spot.id === parseInt(id));
      
      /**** Check if you own Spot, if so load "Edit" + "Delete" Nav Links */
      if(currentUser && currentUser.id === foundSpot.ownerId){
        isLoaded = true;
      }
    
    }

 
  
    return (
        <div className="spot-detail-container">
          <div className="spot-detail">
        {foundSpot && (
            <>
                <p><b>{foundSpot.name}</b></p>
                <p>{foundSpot.address}</p>
                <p>{foundSpot.city}</p>
                <p>{foundSpot.state}</p>
                <p>{foundSpot.country}</p>
                <p>{foundSpot.price}</p>
             </>
        )}
        </div>
        <div className="spot-detail-actions">
        {isLoaded &&
            (
            <>
            <NavLink className="spot-item-edit" to={`/spots/${foundSpot.id}/edit`}> Edit </NavLink> 
            <NavLink className="spot-item-delete" to={`/spots/${foundSpot.id}`}> Delete </NavLink>  
            <br/>
            </>
            )   
        }  
        </div>
        </div>
    );
};

export default SpotDetail;