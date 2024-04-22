import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useEffect, useState, useRef } from "react";
import { loadStripe } from '@stripe/stripe-js'
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';

import Auth from '../utils/auth';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
function DonationPayment() {

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);


  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);


  function submitCheckout() {
 

    getCheckout({
      variables: { 
        donations: [...donation],
       
      },
      
    });
  }
  return (
    <>


      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Donator Name"
          aria-label="nameOfdonator"
          aria-describedby="basic-addon2"
        />
      </InputGroup>



      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>Message for coffee owner</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>

      <br />
      <button
        className="btn btn-block btn-primary"
        style={{ cursor: 'pointer' }}
        type="submit"
      >
        Donation
      </button>

      {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : 
            (
              <span>(log in to check out)</span>
            )}
        



    </>
  );
}

export default DonationPayment;