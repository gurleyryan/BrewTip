import { useQuery } from '@apollo/client';

import CoffeeList from '../components/CoffeeList';
import CoffeeForm from '../components/CoffeeForm';

import { QUERY_COFFEEHOUSE } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_COFFEEHOUSE);
    const coffee = data?.coffeehouses || [];
  
    return (
      <main>
        <div className="flex-row justify-center">
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <CoffeeForm />
          </div>
          <div className="col-12 col-md-8 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <CoffeeList
                coffee={coffee}
                title="Tip your local brewsters!"
              />
            )}
          </div>
        </div>
      </main>
    );
  };
  
  export default Home;
