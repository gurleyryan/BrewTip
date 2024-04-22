import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CoffeeList from './CoffeeList';
import Accordion from 'react-bootstrap/Accordion';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();

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
          {Object.keys(data.me.coffeehouse).map(key => {
            return <div className='profileCoffee'>

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header> <h1><li>{data.me.coffeehouse[key].coffeeName}</li></h1></Accordion.Header>
                  <Accordion.Body>

                    <Alert key='warning' variant='warning'>
                      <div className='bio-story'>
                        My coffee story:<br /> {data.me.coffeehouse[key].bio}

                      </div>
                    </Alert>
                    <Link to={`/coffeehouses/${data.me.coffeehouse[key]._id}`}>


                      <Button variant="primary" size="lg" active>
                        Click to see details.
                      </Button>{' '}

                    </Link>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          })}

        </h2>





      </div>
    </div>
  );
};

export default Profile;

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
