import { Spin } from 'antd';
import Header from './components/layout/header'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';

const App = (props: any) => {
  const { user, setUser, isSpinning, setIsSpinning } = props;
  return (


    <>
      <Spin spinning={isSpinning}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Header
          user={user}
          setUser={setUser}
          setIsSpinning={setIsSpinning}
        />
        <Outlet
        />
      </Spin>
    </>
  )
}

export default App
