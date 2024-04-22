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
      <h5 class="neon" data-text="U">W<span class="flicker-slow">el</span>C
      <span class="flicker-fast">o</span>mE
      <span class="flicker-fast"> T</span>o B
      <span class="flicker-fast">r</span>eW
      <span class="flicker-fast">T</span>i
      <span class="flicker-fast">p</span></h5>
 
 
        
      </section>
      
    </div>
  );
}

export default Header;
