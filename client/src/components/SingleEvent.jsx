
import React, { useEffect, useState, useRef } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Donation from './Donation';
import DonationPayment from './DonationPayment';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Import the QUERY_SINGLE_THOUGHT query from our utility file
import { QUERY_SINGLE_EVENT_DETAIL } from '../utils/queries';

const SingleEvent = () => {
  // Use `useParams()` to retrieve value of the route parameter `:thoughtId`
  const { eventId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_EVENT_DETAIL, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { eventId: eventId },
  });

  const event = data?.event || {};
  // const [searchMap, setMap] = useState(coffeehouse.address);
  // useEffect(() => {

  //   setMap(coffeehouse.address)
  // }, [coffeehouse.address]);

  // function handleChange(e) {
  //   setMap(e.target.value);
  // }

  if (loading) {
    return <div>Loading...</div>;
  }




  return (
    <div className="my-3">

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header> {event.eventName}
          <br/><br/>
          Date Created: {event.Date}
          </Accordion.Header>
          <br/>
         
          <Accordion.Body>
            {event.eventDetail}
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
      <br/>
      <br/>


      <br/>
      <br/>
      <h1>Donations: </h1>
      <div className="my-5">
        <Donation donations={event.donations} />
      </div>

      
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <DonationPayment eventId={event._id} />
      </div>

    </div>
  



  );
};

export default SingleEvent;