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

        <div className="small-quote">
          <h1 >
            <span><em>{quote} </em></span>

          </h1>

        </div>


      </section>

      <section className="text-center">
        <h5 className="neon" data-text="U">W<span className="flicker-slow">el</span>C
          <span className="flicker-fast">o</span>mE
          <span className="flicker-fast"> T</span>o B
          <span className="flicker-fast">r</span>eW
          <span className="flicker-fast">T</span>i
          <span className="flicker-fast">p</span></h5>



      </section>

    </div>
  );
}

export default Header;
