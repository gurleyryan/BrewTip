import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useEffect, useState, useRef } from "react";
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';
import Auth from '../utils/auth';

function DonationPayment({ eventId }) {

 

  const [formState, setFormState] = useState({ nameOfdonator: '', donateAmount:null ,message:'' });
  const [amountDonate,setAmount]=useState()
  
  const [addDonation, { error }] = useMutation(ADD_DONATION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  

    try {

 

      
      const { data } = await addDonation({
        variables: { eventId,
                  ...formState,
                    donateAmount:parseInt(amountDonate)
                     },
      });
      console.log(typeof(donateAmount))
      console.log(typeof((formState.donateAmount)));
      console.log(eventId)
     
      
      //  // clear form values
       setFormState({
        nameOfdonator: '',
        donateAmount:null,
        message:''}
      )
      setAmount(null);

     window.location.reload();
    } catch (e) {
      console.error(e);

    }
  };



  const handleChange = (event) => {
    const { name, value } = event.target;

    if(name==='amountDonate')
    {
      setAmount(value)
      console.log(amountDonate)
    }
   
    setFormState({
      ...formState,  
      [name]: value,
    });




  };

  return (
    <>

      <form onSubmit={handleFormSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Donator Name"
          aria-label="nameOfdonator"
          aria-describedby="basic-addon2"
          type="text"
          name="nameOfdonator"
          value={formState.nameOfdonator}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Amount"
          aria-label="amountDonate"
          aria-describedby="basic-addon2"
          type="number"
          step="any"
          name="amountDonate"
          value={amountDonate}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Message for coffee owner</InputGroup.Text>
        <Form.Control as="textarea" aria-label="Message"
         placeholder="Message"
         name="message"
         aria-describedby="basic-addon2"
         type="text"
         value={formState.message}
         onChange={handleChange} />
      </InputGroup>
      <br />
      <button
        className="btn btn-block btn-primary"
        style={{ cursor: 'pointer' }}
        type="submit"
      >
        Donation
      </button>
      </form>


    </>
  );
}

export default DonationPayment;

/*


export const ADD_DONATION= gql`
  mutation addDonation(
    $eventId: ID!, 
    $nameOfdonator: String!
    $donateAmount: String!
    $message: String!
  ) {
    addDonation(
      eventId: $eventId
      nameOfdonator: $nameOfdonator
      donateAmount: $donateAmount
      message: $message
    ) 
    {
      
      donation {
        _id
        nameOfdonator
      }
    }
  }
`;
*/