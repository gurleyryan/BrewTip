import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
const Donation = ({ donations = [] }) => {
  // console.log(donations);
  // if (!donations.length) {
  //   return <h3>Ended Page</h3>;
  // }

  return (
    <>
    
      <div className="flex-row my-4">
        {donations &&
          donations.map((donation,index) => (
            <div key={donation._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{index}. {donation.nameOfdonator}</Accordion.Header>
                    <Accordion.Body>
                      <h5 className="card-header">
                     Donation Detail:<br /> 
                     <p className="card-body">{donation.nameOfdonator}</p>
                     <p className="card-body">Amount: ${donation.donateAmount+" "}
            
                        <span style={{ fontSize: '0.825rem' }}>
                          on {donation.donationDate}
                        </span>
                        <br /> 
                        </p>
                        message: {donation.message}
                      </h5>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                       
      {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/events/${event._id}`}
            >
              Click to see event details.
            </Link> */}

              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Donation;