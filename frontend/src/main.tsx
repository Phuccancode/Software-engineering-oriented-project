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
import PaymentPage from './pages/payment'
import ShoppingCart from './pages/shoppingcart'
const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Header
        isLogin={true}
      />
      <HomePage />
    </>
  },
  {

    path: "/login",
    element:
      <>
        <Header
          isLogin={false}
        />
        <LoginPage />
      </>
  },
  {
    path: "/register",
    element: <>
      <Header
        isLogin={false}
      />
      <RegisterPage />
    </>

  },
  {
    path: "/forgot-password",
    element: <>
      <Header
        isLogin={false}
      />
      <ForgotPassWordPage />
    </>
  },
  {
    path: "/product/:id",
    element: <>
      <Header
        isLogin={true}
      />
      <ProductDetailPage />
    </>
  },
  {
    path: "/cart",
    element: <>
      <Header
        isLogin={true}
      />
      <ShoppingCart />
    </>
  },
  {
    path: "/payment",
    element: <>
      <Header
        isLogin={true}
      />
      <PaymentPage />
    </>
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
