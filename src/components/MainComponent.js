import React, { useState } from 'react'
import { Layout } from 'antd';
import HeaderComponent from './HeaderComponent'
import SiderComponent from './SiderComponent'
import ContentComponent from './ContentComponent'
import Contact from './Contact'

function MainComponent () {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className='layoutView'>
      <SiderComponent collapsed={collapsed} toggle={()=>setCollapsed(!collapsed)} />
      <HeaderComponent collapsed={collapsed}/>
      <Layout>
        <ContentComponent />
        <Contact />
      </Layout>
    </Layout>
  );
}

export default MainComponent;
