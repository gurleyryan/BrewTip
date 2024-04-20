// TODO: Add a comment explaining how we are able to extract the key value pairs from props
//this currentPage and handlePageChange were destructed from props

import { useQuery } from '@apollo/client';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';
import CoffeeList from './CoffeeList';
import { QUERY_COFFEEHOUSES } from '../utils/queries';


function Homepage() {



  const { loading, data } = useQuery(QUERY_COFFEEHOUSES);
  const coffeehouses = data?.coffeehouses || [];
  return (
    <main>
      <div >
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CoffeeList
              coffeehouses={coffeehouses}
              title="Welcome to CoffeeHouses"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Homepage;


