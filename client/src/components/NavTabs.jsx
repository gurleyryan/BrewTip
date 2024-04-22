// TODO: Add a comment explaining how we are able to extract the key value pairs from props
//this currentPage and handlePageChange were destructed from props

import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';


function NavTabs() {

  const currentPage = useLocation().pathname;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (

    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}

        >
          Home
        </Link>
      </li>
  
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/me/${Auth.getProfile().data._id}`}
            >
              {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
              {Auth.getProfile().data.userName}'s profile
            </Link>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <ul className="nav nav-tabs">
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
                to="/Signup"
                // This is a conditional (ternary) operator that checks to see if the current page is "Home"
                // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
                className={currentPage === '/Signup' ? 'nav-link active' : 'nav-link'}
              >
                Signup
              </Link>
            </li>
            </ul>



          </>
        )}
      </div>

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
          to="/Upload"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/Upload' ? 'nav-link active' : 'nav-link'}
        >
          Upload
        </Link>
      </li>


    </ul>
  );
}

export default NavTabs;
