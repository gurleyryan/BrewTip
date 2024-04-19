import { Link } from 'react-router-dom';

const CoffeeList = ({coffeehouse, coffeeName }) => {
  if (!coffeehouse.length) {
    return <h3>No Coffee Houses Yet</h3>;
  }

  return (
    <div>
      <h3>{coffeeName}</h3>
      {coffeehouse &&
        coffeehouse.map((coffeehouse) => (
          <div key={coffeehouse._id} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{coffeehouse.address}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/coffeehouses/${coffeehouse._id}`}
            >
              Learn about this coffee house.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CoffeeList;
