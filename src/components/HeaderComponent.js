import * as React from 'karet'
import { Menu, Dropdown, Button, message } from 'antd'
import c from '../styles/header.module.css'
import { Layout } from 'antd'
import header1 from '../icons/header/header1.png'
import header3 from '../icons/header/header3.png'
import header4 from '../icons/header/header4.png'
import { clear, getter } from '../utils/store'
import LogoComponent from './LogoComponent'

function HeaderComponent ({ toggle }) {
  const { nickname } = getter(["nickname"])

  const menu = (
    <Menu>
      <Menu.Item className={c.item} onClick={clear} style={{display:"flex",alignItems:'center',width:164,height:50}}>
        <img src={header4} alt="" style={{width:14,marginRight:26}}/>
        <div>退出登录</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={c.container}>
      <div className={c.containerLeft}>
        <LogoComponent toggle={toggle}/>
      </div>
      <div className={c.containerRight}>
        <div className={c.containerR}>
          <div style={{marginRight:24,cursor:'pointer'}} onClick={()=>{
            message.info("敬请期待")
            // window.open("https://www.baidu.com")
          }}>帮助中心</div>
          <div style={{cursor:'pointer'}} onClick={()=>{
            message.info("敬请期待")
            // window.open("https://www.baidu.com")
          }}>开放平台</div>
          <Dropdown overlay={menu}>
            <Button className={c.btn}>
              <img src={header1} alt="" className={c.avatar}/>
              <div>{nickname}</div>
              <img src={header3} alt="" className={c.down}/>
            </Button>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}

export default HeaderComponent;
