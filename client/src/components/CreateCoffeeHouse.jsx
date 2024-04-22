import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { ADD_COFFEE_HOUSE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

import Auth from '../utils/auth';

const CreateCoffeeHouse = () => {
  const { profileId } = useParams();

  const [formState, setFormState] = useState({
    coffeeName: '',
    address: '',
    bio: '',
    image:''
  });

  const [addCoffeeHouse, { error, }] = useMutation(ADD_COFFEE_HOUSE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({

      ...formState,
      [name]: value,
    });
  };

  

  const { loading, data } = useQuery(profileId ? QUERY_USER : QUERY_ME, {
    variables: { profileId: profileId },
  });
  console.log(data)


  const profile = data?.me || data?.profile || {};
  if (
    Auth.loggedIn() &&
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().data._id === profileId
  ) {
    console.log(data.me.coffeehouse)
    return <Navigate to={`/me/${Auth.getProfile().data._id}`} />;

  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addCoffeeHouse({
        variables: {
          ownerId: profile._id,
          ...formState
        },
        
      });
      console.log(data)

      setFormState({
        coffeeName: '',
        address:'',
        bio:''}
      )

      document.location.href=`/`;

    } catch (e) {
      console.error(e);
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.userName) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!

      </h4>
    );
  }

  

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {`${profile.userName}'s`} profile.
          <br />
          Id: {`${profile._id}`}
        </h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" class="form-control" name="coffeeName"
          value={formState.coffeeName} onChange={handleChange}/>
          <label class="form-label">Coffee House Name</label>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" class="form-control" name="address"
          value={formState.address} onChange={handleChange}/>
          <label class="form-label">Address</label>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
          <textarea class="form-control" rows="4" name="bio" 
          value={formState.bio} onChange={handleChange}></textarea>
          <label class="form-label" for="form6Example7">Tell more about your coffee story</label>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" class="form-control" name="image"
          value={formState.image} onChange={handleChange}/>
          <label class="form-label">Input Image Name</label>
        </div>
     
        <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block mb-4">Submit
         
        
              
             
        </button>
      </form>

      <br />  <br />  <br />
    </div>

  );
};

export default CreateCoffeeHouse;

/*
        /*
  <div className="col-12 col-md-10 mb-5">
          <CoffeeList
            coffeehouses={ownerId.coffeehouses}
            title={`${user.userName}'s coffeehouses...`} 
          />
        </div>


            {Object.keys(data.me.coffeehouse).map(key => {
            return <li>{data.me.coffeehouse[key].coffeeName}</li>
          })}
*/
