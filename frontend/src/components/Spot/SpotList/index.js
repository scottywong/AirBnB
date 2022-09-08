import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../../store/spot"; 
import { useParams,  useHistory} from "react-router-dom";

import './SpotList.css';
import SpotListItem from './SpotListItem';

const SpotList = () => {

const dispatch = useDispatch();
const history = useHistory();
const {id} = useParams();
const currentUser = useSelector(state=> state.session.user);

let spots = useSelector(state=> state.spot.spot);
const [isLoaded,setIsLoaded] = useState(false);

useEffect(()=> {
  dispatch(fetchSpots());   
  if(currentUser && currentUser.id === parseInt(id)) setIsLoaded(true);
},[dispatch,isLoaded,currentUser]);

if(id && spots && Array.isArray(spots)){
  spots = spots.filter(spot => spot.ownerId === parseInt(id));
  
}

const handleCreateButton = () => {
    history.push("/spots/new");
};

  return (
    <div className="spot-listpage-container"> 
        {!id && (<h1 className="spot-list-header">Spot List</h1>)}
        {id && (
        <>
        <h1 className="spot-list-header">Owned Spots</h1>
        <button onClick={handleCreateButton} className="spot-button-create">Create New Spot</button>
        </>)}

        <div className="spot-list-container">
            <ol className="spot-list">
              {spots && Array.isArray(spots) && 
                (spots.map((spot) => {          
                  return <li key={spot.id}>
                            <SpotListItem spot={spot}/>
                        </li>
                  })
                )
              }
            </ol>
        </div>
        {id && !isLoaded && !spots && (<p> Sorry, we were unable to find any data.</p>)}
      </div>
  );
  
}

export default SpotList;