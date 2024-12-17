import { StrictMode, useState } from 'react'
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
import SuccessPage from './pages/success'


const Root = () => {
  const [user, setUser] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App
        user={user}
        setUser={setUser}
        isSpinning={isSpinning}
        setIsSpinning={setIsSpinning}
      />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage
            setIsSpinning={setIsSpinning}
          />
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
          element: <StoreManagement
            setIsSpinning={setIsSpinning}
          />
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
          element: <AccountManagement
            user={user}
            setUser={setUser}
            setIsSpinning={setIsSpinning}
          />
        },
        {
          path: "/store",
          element: <StorePage />
        },
        {
          path: "/success",
          element: <SuccessPage />
        }
      ]
    },
    {

      path: "/login",
      element: <LoginPage
        user={user}
      />
    },
    {
      path: "/register",
      element: <RegisterPage
        user={user}
      />

    },
    {
      path: "/forgot-password",
      element: <ForgotPassWordPage />
    },

  ])
  return (
    <RouterProvider router={router} />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
