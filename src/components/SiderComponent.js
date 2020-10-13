import * as React from 'karet'
import * as U from 'karet.util'
import * as R from 'kefir.ramda'
import { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import c from '../styles/header.module.css'
import sider1 from '../icons/sider/sider1.png'
import sider2 from '../icons/sider/sider2.png'
import sider3 from '../icons/sider/sider3.png'
import sider4 from '../icons/sider/sider4.png'
import sider5 from '../icons/sider/sider5.png'
import sider6 from '../icons/sider/sider6.png'
import sider7 from '../icons/sider/sider7.png'
import sider8 from '../icons/sider/sider8.png'
import { getter, setter } from "../utils/store"
import { push } from "../utils/util"

function SiderComponent ({ collapsed, toggle }) {
  const { openKeys, selectedKeys } = getter(["selectedKeys", "openKeys"])

  useEffect(() => {
    const { pathname } = window.location
    const arr = pathname.split('/')
    arr.length && setter([["selectedKeys", arr[arr.length - 1]]]);
  }, [])

  function menuItemClick ({ item, key, keyPath, domEvent }) {
    setter([["selectedKeys", keyPath]])
    push(`/main/${key}`)
  }

  function MyMenu () {

    return (
      <Menu karet-lift theme="light" mode="inline" openKeys={U.template(openKeys)} selectedKeys={U.template(selectedKeys)} onClick={menuItemClick} multiple={false}>
        <Menu.Item key="user-manage" icon={<Icon keys="user-manage" />}>
          用户管理
        </Menu.Item>
        <Menu.Item key="goods-manage" icon={<Icon keys="goods-manage" />}>
          商品管理
        </Menu.Item>
        <Menu.Item key="order-manage" icon={<Icon keys="order-manage" />}>
          订单管理
        </Menu.Item>
        <Menu.Item key="capital-flow" icon={<Icon keys="capital-flow" />}>
          资金流水
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Layout.Sider style={{paddingTop:24}} theme="light" trigger={null} collapsible={true} collapsed={collapsed} width={200} className={c.siderLayout}>
      <MyMenu />
    </Layout.Sider>
  )
}

function Icon ({ keys }) {
  const { selectedKeys } = getter(["selectedKeys"])
  const obj = {
    "user-manage": {
      icon: [sider6, sider5],
      keys: ["user-manage"]
    },
    "order-manage": {
      icon: [sider1, sider2],
      keys: ["order-manage"]
    },
    "goods-manage": {
      icon: [sider3, sider4],
      keys: ["goods-manage"]
    },
    "capital-flow": {
      icon: [sider7, sider8],
      keys: ["capital-flow"]
    },
  }

  return <>{U.ifElse(R.includes(selectedKeys, obj[keys].keys), <img src={obj[keys].icon[1]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />, <img src={obj[keys].icon[0]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />)
} < />
}

export default SiderComponent
