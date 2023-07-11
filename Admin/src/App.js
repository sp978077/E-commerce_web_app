import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Root from './components/navigation/Root';
import Info from './components/userInfo/Info';
// import Home from './components/Home';
import { UserInfoProvider } from './components/userInfo/UserInfoProvider';
import Dashboard from './components/Dashboard';
import User from './components/User';
import Vendor from './components/Vendor';
import Category from './components/category/Category';
import { Product } from './components/product/Product';
import { ProductDetails } from './components/product/ProductDetails';
import Order from './components/Order';
import Offer from './components/Offer';
import { NotFound } from './components/NotFound';
import Navbar from './components/navigation/NavBar';
import QCRequest from './components/qcrequest/QCRequest';
import QCRequestReview from './components/qcrequest/QCRequestReview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: 'profile',
        element: <Info />
      },
      {
        path: 'qc-request',
        element: <QCRequest />
      },
      {
        path: 'qc-request/review',
        element: <QCRequestReview />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'vendor',
        element: <Vendor />
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'product',
        element: <Product />
      },
      {
        path: 'product/details',
        element: <ProductDetails />
      },
      {
        path: 'order',
        element: <Order />
      },
      {
        path: 'offer',
        element: <Offer />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
]);

function App() {
  return (
    <UserInfoProvider>
      <RouterProvider router={router} />
    </UserInfoProvider>
  );
}

export default App;
