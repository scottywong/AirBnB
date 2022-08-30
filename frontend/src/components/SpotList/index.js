import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spot"; 
import { NavLink, Switch, Route } from "react-router-dom";


import SpotListItem from './SpotListItem';

const SpotList = () => {

const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchSpots());
  },[dispatch]);

const spots = useSelector(state=> state.spots.spot);
console.log('hey spots', spots);

  return (
    <div>
      <h1>Spot List</h1>
      <ol>
   
        {
        spots &&
          (
            spots.map((spot) => {
            console.log('ze spot: ', spot);
            
              return <li key={spot.id}><NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink></li>
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