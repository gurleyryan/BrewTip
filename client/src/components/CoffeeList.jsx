import { Link } from 'react-router-dom';
import React, { useEffect, useState ,useRef} from "react";


const CoffeeList = ({ coffeehouses, title }) => {

  const [filteredUsers, setFilteredUsers] = useState(coffeehouses);

  if (!coffeehouses.length) {
    return <h3>No Data Yet</h3>;
  }

  const handleFilter = (event) => {
    const value = event.target.value;
    const filtered = coffeehouses.filter(coffeehouse => coffeehouse.coffeeName.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(filtered);
  };

  return (
    <div>



<div id="portfolio" className="main-portfolio">
<h2>{title}</h2>
 <input type="text" placeholder=" Search Coffee House" onChange={handleFilter} />
 <div className="grid-portfolio">
        {coffeehouses &&
        filteredUsers.map((coffeehouse) => {
          return (
            <div className="grid-item">
      
            <div key={coffeehouse._id} className="row">
              
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
         
            <img
                src={"./public/"+coffeehouse.image}
                className="shadow-1-strong rounded mb-4"
                alt="picture not displayed"
              />
              
            <div>
              <h3 className="Main-Text">
                {coffeehouse.coffeeName}
              </h3>
              <div className="Extra-Text">
                <p>
                 {coffeehouse.address}
                </p>
              </div>
            </div>
              </div>
              
           
            <br />
            <br />
            
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/coffeehouses/${coffeehouse._id}`}
            >
              Click to see details.
            </Link>
            </div>
              </div>
              
            );
          })}
       
        </div>
        </div>
     </div>
 
  );
};

export default CoffeeList;

/*
return (

    <div id="portfolio" className="main-portfolio">
      <h4>Work Portfolio</h4>
      
        <div className="grid-portfolio">
        {data.map(({ id, name, description, link, img, img_description }) => {
          return (
            <div className="grid-item">
            <div className="row"key={id}>
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <a href={link}>
              <img
                src={img}
                className="shadow-1-strong rounded mb-4"
                alt={img_description}
              />
            </a>
            <div>
              <h3 className="Main-Text">
                {name}
              </h3>
              <div className="Extra-Text">
                <p>
                 {description}
                </p>
              </div>
            </div>
            <br />
            <br />
            </div>
              </div>
              </div>
            );
          })}
        </div>
     
      

             
          
       
    </div>
    


  );
};


















<div id="portfolio" className="main-portfolio">
<h2>{title}</h2>
      
      
        <div className="grid-portfolio">
        {coffeehouses &&
        coffeehouses.map((coffeehouse) => {
          return (
            <div className="grid-item">
      
            <div key={coffeehouse._id} className="row">
              
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
         
            <div>
              <h3 className="Main-Text">
                {coffeehouse.coffeeName}
             
      
          
              </h3>
              <di
              <div className="Extra-Text">
                <p>
                Location:{coffeehouse.address}
                </p>
              </div>
              
            </div>
            <br />
            <br />
            
            </div>
              </div>
              </div>
            );
          })}
        </div>
        </div>


*/