import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COFFEEHOUSE } from '../../utils/mutations';
import { QUERY_COFFEEHOUSE } from '../../utils/queries';

import Auth from '../../utils/auth';

const CoffeeForm = () => {
  const [coffeeText, setCoffeeText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addCoffeeHouse, { error }] = useMutation
  (ADD_COFFEEHOUSE, {
    refetchQueries: [
      QUERY_COFFEEHOUSE,
      'query Coffeehouses'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCoffeeHouse({
        variables: {
          coffeeText,
          coffeeOwner: Auth.getOwner().data.username,
        },
      });

      setCoffeeText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'coffeeText' && value.length <= 280) {
      setCoffeeText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Add your Coffee House!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="coffeeText"
                placeholder="Enter new Coffee House"
                value={coffeeText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Coffee House
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add a Coffee House. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CoffeeForm;
