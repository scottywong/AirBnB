import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spot"; 
import { NavLink, Switch, Route } from "react-router-dom";

import './SpotList.css';
import SpotListItem from './SpotListItem';

//If Path is /user/:id/spots, then
//change Header to "Manage My Spots"
//display only spots that I own

//Otherwise show all spots

const SpotList = () => {

const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchSpots());
  },[dispatch]);

const spots = useSelector(state=> state.spot.spot);
console.log('hey spots', spots);

  return (
    <div className="spot-list-container">
      <h1 className="spot-list-header">Spot List</h1>
      <ol className="spot-list">
   
        {
        spots &&
          (
            spots.map((spot) => {
            console.log('ze spot: ', spot);
            
            return <li key={spot.id}>
                      <SpotListItem spot={spot}/>
                   </li>
        
              // return <li key={spot.id}><NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink></li>
            })
          )
        }

      </ol>
{/* 
      <Switch>
        <Route path='/spots/:id'>
          <SpotListItem spots={spots} />
        </Route>
      </Switch> */}
    </div>
  );
}

export default SpotList;