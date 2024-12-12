import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import './styles/global.css'
import LoginPage from './pages/login'
import Header from './components/layout/header'
import RegisterPage from './pages/register'
import ForgotPassWordPage from './pages/forgotpassword'
import HomePage from './pages/home'
import ProductDetailPage from './pages/detailProduct'
import StoreManagement from './pages/managerStore'
import CreateStore from './pages/createStore'
import StoreDeletion from './pages/deleteStore'
import PaymentPage from './pages/payment'
import ShoppingCart from './pages/shoppingcart'
import AdminPage from './pages/admin'
import AccountManagement from './pages/AccountDetail'
import StorePage from './pages/store'
import App from './App'
import ErrorPage from './pages/error'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />
      },
      {
        path: "/cart",
        element: <ShoppingCart />
      },
      {
        path: "/payment",
        element: <PaymentPage />
      }
      , {
        path: "/store/create",
        element: <CreateStore />
      },
      {
        path: "/store/manage",
        element: <StoreManagement />
      },
      {
        path: "/store/delete",
        element: <StoreDeletion />
      },
      {
        path: "/admin",
        element: <AdminPage />
      },
      {
        path: "/account",
        element: <AccountManagement />
      },
      {
        path: "/store",
        element: <StorePage />
      }
    ]
  },
  {

    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />

  },
  {
    path: "/forgot-password",
    element: <ForgotPassWordPage />
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
