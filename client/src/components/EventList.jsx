import Accordion from 'react-bootstrap/Accordion';
const EventList = ({ events = [] }) => {
  // console.log(events);
  // if (!events.length) {
  //   return <h3>Ended Page</h3>;
  // }

  return (
    <>
   
      <div className="flex-row my-4">
        {events &&
          events.map((event,index) => (
            <div key={event._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{index}. {event.eventName}</Accordion.Header>
                    <Accordion.Body>
                      <h5 className="card-header">
                     Event Detail:<br /> <p className="card-body">{event.eventDetail}</p>
                        <span style={{ fontSize: '0.825rem' }}>
                          on {event.Date}
                        </span>
                      </h5>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default EventList;