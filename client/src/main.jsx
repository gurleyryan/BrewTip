import ReactDOM from 'react-dom/client';
import App from './App';
import NavTabs from "./components/NavTabs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login"
import Contact from "./components/Contact";
import Homepage from './components/Homepage';
import Upload from './components/Upload';
import Error from './components/Error';
import Signup from './components/Signup';
import SingleCoffeeHouse from './components/SingleCoffeeHouse'
import { DateTime } from "./components/Date";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';





const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },

        {
          path: '/coffeehouses/:coffeeId',
          element: <SingleCoffeeHouse />,
        },

        {
          path: '/Login',
          element: <Login />,
        },

        {
          path: '/Upload',
          element: <Upload />,
        },


        
        {
          path: '/Signup',
          element: <Signup />,
        },
  
  
        {
          path: '/Contact',
          element: <Contact />,
        }

      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  );
  



//ReactDOM.createRoot(document.getElementById('root')).render(<App />);
