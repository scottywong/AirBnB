import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spot"; 
import { useParams,  useHistory} from "react-router-dom";

import './SpotList.css';
import SpotListItem from './SpotListItem';

const SpotList = () => {

const dispatch = useDispatch();
const {id} = useParams();
let spots = useSelector(state=> state.spot.spot);

useEffect(()=> {
  dispatch(fetchSpots());
},[dispatch]);

if(id && spots && Array.isArray(spots)){

  spots = spots.filter(spot => spot.ownerId === parseInt(id));

}


let history = useHistory();
const handleCreateButton = () => {

    history.push("/spots/new");

};

  return (
    <> 
        {id && (
          <>
          <h1 className="spot-list-header">Owned Spots</h1>
          <button onClick={handleCreateButton} className="spot-button-create">Create New Spot</button>
          </>)}
          
        {!id && (<h1 className="spot-list-header">Spot List</h1>)}
        
        <div className="spot-list-container">
            <ol className="spot-list">
        
              {
              spots && Array.isArray(spots) && 
                (
                  spots.map((spot) => {          
                  return <li key={spot.id}>
                            <SpotListItem spot={spot}/>
                        </li>
              
                  })
                )
              }
            </ol>
        </div>
      </>
  );
  
}

export default SpotList;