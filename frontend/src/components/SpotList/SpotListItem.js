import { NavLink } from 'react-router-dom';
import './SpotListItem.css';

//Restore User
//If current user is owner, then show Edit and Delete Button
//Otherwise only shot spot item name

const SpotListItem = ({spot}) => {

    return(
        <div className="spot-item-container">
            <br/>
            <NavLink className="spot-item-name" to={`/spots/${spot.id}`}>{spot.name}</NavLink>
            <p>{spot.city}, {spot.country} </p>
            <p><b>${spot.price}</b> night</p>
        
            <NavLink className="spot-item-edit" to={`/spots/${spot.id}/edit`}> Edit </NavLink> 
            <NavLink className="spot-item-delete" to={`/spots/${spot.id}`}> Delete </NavLink>  
            <br/>     
        </div>
    );
}

export default SpotListItem;