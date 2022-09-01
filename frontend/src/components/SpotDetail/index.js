import { useParams } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { fetchSpots } from "../../store/spot";
import { useEffect } from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { removeSpot } from "../../store/spot";
import { useHistory } from "react-router-dom";

import './SpotDetail.css';

const SpotDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const currentUser = useSelector(state=> state.session.user);
    let spots = useSelector(state=> state.spot.spot);

    let foundSpot;
    let isLoaded = false;

    useEffect(()=> {
      dispatch(sessionActions.restoreUser());
      dispatch(fetchSpots());
    },[dispatch]);
    
    /**** Check if State is Array and not individual Spot ****/
    if(id && Array.isArray(spots)){
    
      foundSpot = spots.find(spot => spot.id === parseInt(id));
      
      /**** Check if you own Spot, if so load "Edit" + "Delete" Nav Links */
      if(currentUser && currentUser.id === foundSpot.ownerId){
        isLoaded = true;
      }
    
    }

    const handleDelete = (e) => {

      e.preventDefault();
      
      return dispatch(removeSpot(id))
        .then((res) => history.push(`/users/${currentUser.id}/spots`));
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
            <NavLink onClick={handleDelete} className="spot-item-delete" to={`/spots/${foundSpot.id}`}> Delete </NavLink>  
            <br/>
            </>
            )   
        }  
        </div>
        </div>
    );
};

export default SpotDetail;