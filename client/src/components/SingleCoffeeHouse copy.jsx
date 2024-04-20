
import React, { useEffect, useState ,useRef} from "react";

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import EventList from './EventList';
// Import the QUERY_SINGLE_THOUGHT query from our utility file
import { QUERY_SINGLE_COFFEEHOUSE } from '../utils/queries';

const SingleCoffeeHouse = () => {
  // Use `useParams()` to retrieve value of the route parameter `:thoughtId`
  const { coffeeId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_COFFEEHOUSE, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { coffeeId: coffeeId },
  });

  const coffeehouse = data?.coffeehouse || {};
  const [searchMap, setMap] = useState(coffeehouse.address);
  useEffect(() => {
  	
  	setMap(coffeehouse.address)
  }, [coffeehouse.address]);

  function handleChange(e) {
    setMap(e.target.value);
  }

  if (loading) {
    return <div>Loading...</div>;
  }




  return (
    <div className="my-3">
 
              
<h2>Search Map</h2>
<input value={searchMap} onChange={handleChange} />
<br />
<br />
      

      <h3 className="card-header bg-dark text-light p-2 m-0">
        {coffeehouse.coffeeName} <br />
        <span style={{ fontSize: '1rem' }}>
           {coffeehouse.address}
        </span>
        
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
            

          {coffeehouse.bio}

     
        </blockquote>
  
          
        {/* <div id="google-map" class="map-responsive">
            <iframe style={{width:600,height:400}}src=
            {"https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q="+searchMap}></iframe>
            </div>
         */}

              <img
                src={"./public/"+coffeehouse.image}
                className="shadow-1-strong rounded mb-4"
                alt="picture not displayed"
              />
        
      </div>







      <div className="my-5">
        <EventList events={coffeehouse.events} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <EventList coffeeId={coffeehouse._id} />
      </div>
    </div>


  
  );
  
};

export default SingleCoffeeHouse;