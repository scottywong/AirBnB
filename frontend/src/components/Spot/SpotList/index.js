import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, fetchUserSpots } from "../../../store/spot"; 
import { useParams,  useHistory} from "react-router-dom";
import './SpotList.css';
import SpotListItem from './SpotListItem';

const SpotList = () => {
  
const dispatch = useDispatch();
const history = useHistory();
const {id} = useParams();

const currentUser = useSelector(state=> state.session.user);
const spots = useSelector(state=> state.spot.spot);
const userSpots = useSelector(state=>state.spot.userSpot);

const [isOwner,setIsOwner] = useState(false);

useEffect(()=> {
  dispatch(fetchSpots());
  dispatch(fetchUserSpots());
  currentUser?.id === parseInt(id)?  setIsOwner(true): setIsOwner(false); //check if user is owner of spot
},[dispatch,id,currentUser]);

if(!currentUser && id) history.push('/'); //redirect user to home page if they're logged out


const handleCreateButton = () => {
    history.push("/spots/new");
};

  return (
    <div className="spot-container">
    {!id && spots?.length > 0 &&(<h1 className="spot-list-header">Spot List</h1>)}
        
    {id && isOwner && (
        <>
        <h1 className="spot-list-header">Owned Spots</h1>
        <button onClick={handleCreateButton} className="spot-button-create">Create New Spot</button>
        </>)}

     {id && userSpots?.length === 0 && (<p> Sorry, we were unable to find any data.</p>)}
    <div className="spot-listpage-container"> 
    
        <div className="spot-list-container">
            <ol className="spot-list">
              {!id && spots && Array.isArray(spots) && 
                (spots.map((spot) => {          
                  return <li key={spot.id}>
                            <SpotListItem spot={spot}/>
                        </li>
                  })
                )
              }
              {id && currentUser && userSpots && Array.isArray(userSpots) && 
                (userSpots.map((spot) => {          
                  return <li key={spot.id}>
                            <SpotListItem spot={spot}/>
                        </li>
                  })
                )
              }
            </ol>
        </div>
        
      </div>
      </div>
  );
  
}

export default SpotList;