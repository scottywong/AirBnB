import { NavLink } from 'react-router-dom';
import './SpotListItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeSpot } from '../../store/spot';

const SpotListItem = ({spot}) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state=> state.session.user);
  let isLoaded = false;

  /**** Check if you own Spot, if so load "Edit" + "Delete" Nav Links */
  if(currentUser && currentUser.id === spot.ownerId){
    isLoaded = true;
  }

  const handleDelete = (e) => {

    e.preventDefault();
    
    return dispatch(removeSpot(spot.id));
  }
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
            <NavLink onClick={handleDelete} className="spot-item-delete" to={`/spots/${spot.id}`}> Delete </NavLink>  
            <br/>
            </>
            )   
        }  
        </div>
    );
}

export default SpotListItem;