// TODO: Add a comment explaining how we are able to extract the key value pairs from props
//this currentPage and handlePageChange were destructed from props

import { Link, useLocation } from 'react-router-dom';

function NavTabs() {

  const currentPage = useLocation().pathname;

  return (
    
    <ul className="nav nav-tabs">

      {/* <li className="nav-item">
        <a
          href="#about"
          onClick={() => handleTabChange('About')}
          // Conditional (ternary) operator is checking to see if currentPage is is 'Home'
          //if it's true,render the nav-link active' . If not render the following: nav-link*
          className={currentTab === 'About' ? 'nav-link active' : 'nav-link'}
        >
          About
        </a>
      </li> */}



      <li className="nav-item">
        <Link
          to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        
        >
          About
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/Login"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/Login' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/Contact"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/Contact' ? 'nav-link active' : 'nav-link'}
        >
          Contact
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/Signup"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/Signup' ? 'nav-link active' : 'nav-link'}
        >
          Signup
        </Link>
      </li>


      
      <li className="nav-item">
        <Link
          to="/Upload"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/Upload' ? 'nav-link active' : 'nav-link'}
        >
          Upload
        </Link>
      </li>

{/* ------------------------------------------------------------------------------------------------ */}
      {/* <li className="nav-item">
        <a
          href="#portfolio"
          onClick={() => handleTabChange('Portfolio')}
          //  TODO: Add a comment explaining what this logic is doing

          className={currentTab === 'Portfolio' ? 'nav-link active' : 'nav-link'}
        >
          Portfolio
        </a>
      </li> */}
{/* ------------------------------------------------------------------------------------------------ */}
      {/* <li className="nav-item">
        <a
          href="#contact"
          onClick={() => handleTabChange('Contact')}
          //  TODO: Add a comment explaining what this logic is doing

          className={currentTab === 'Contact' ? 'nav-link active' : 'nav-link'}
        >
          Contact
        </a>
      </li> */}
{/* ------------------------------------------------------------------------------------------------ */}
      {/* <li className="nav-item">
        <a
          href="#resume"
          //  TODO: Add a comment explaining what this logic is doing

          onClick={() => handleTabChange('Resume')}
          className={currentTab === 'Resume' ? 'nav-link active' : 'nav-link'}
        >
          Resume
        </a>
      </li> */}
    </ul>
  );
}

export default NavTabs;
