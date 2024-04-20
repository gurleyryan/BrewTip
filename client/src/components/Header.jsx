// TODO: Add a comment explaining how we are able to extract the key value pairs from props
//this currentPage and handlePageChange were destructed from props
import React, { useEffect, useState } from "react";
import NavTabs from "./NavTabs";
import { DateTime } from "./Date";

function Header(props) {
  const { currentTab, handleTabChange } = props;
  const [quote, setQuotes] = useState();
  useEffect(() => {
    setQuotes(`"it's not about ideas. it's about making ideas happen."`)
  });


  

  return (

    <div className="main-header">
      <section>
        <header>
          <div>
          <a
          href="#about-me"
         
        >
    
        </a>
            <h1></h1>

          </div>

          <div >

            <NavTabs
              currentTab={currentTab}
              handleTabChange={handleTabChange}
            ></NavTabs>
            <DateTime />

          </div>
        </header>

        <div class="small-quote">
        <h1 >
         <span><em>{quote} </em></span>
       
        </h1>
      
        </div>



      </section>
      <section class="text-center">
    
        <h1><em>Welcome to my page</em></h1>
        <p>
          A page built with React. Here,
          you can find a small sample of the projects I have worked on over
          the course of the program.
        </p>

      </section>
    </div>
  );
}

export default Header;
