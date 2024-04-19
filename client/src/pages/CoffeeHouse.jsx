// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_COFFEEHOUSE } from '../utils/queries';

const CoffeeHouse = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { coffeeId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_COFFEEHOUSE, {
    // pass URL parameter
    variables: { coffeeId: coffeeId },
  });

  const coffeehouse = data?.coffeehouse || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
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
          {coffeehouse.coffeeText}
        </blockquote>
      </div>
    </div>
  );
};

export default CoffeeHouse;
