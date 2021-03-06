import React from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import ErrorView from "../views/systemSettingViews/ErrorView"
import GoodsView from "../views/goodsViews/GoodsView"
import UserView from "../views/userViews/UserView"
import OrderView from "../views/orderViews/OrderView"
import CapitalFlowView from "../views/capitalFlowViews/CapitalFlowView"
import PassWordView from "../views/userViews/PassWordView"
import EditGoodsView from "../views/goodsViews/EditGoodsView"
import OrderRecView from "../views/orderViews/OrderRecView"
import OrderModelView from "../views/goodsViews/OrderModelView"
import EditOrderModelView from "../views/goodsViews/EditOrderModelView"

function ContentComponent () {

  return (
    <Layout.Content style={{
      marginLeft:224,
      marginRight:24,
      marginBottom:24,
      marginTop:84
    }}>
      <Switch>
        <Route path="/main/user-manage">
          <UserView />
        </Route>
        <Route path="/main/password">
          <PassWordView />
        </Route>
        <Route path="/main/error">
          <ErrorView />
        </Route>
        <Route path="/main/order-manage">
          <OrderView />
        </Route>
        <Route path="/main/order-recording">
          <OrderRecView />
        </Route>
        <Route path="/main/goods">
          <GoodsView />
        </Route>
        <Route path="/main/edit-goods">
          <EditGoodsView />
        </Route>
        <Route path="/main/order-model">
          <OrderModelView />
        </Route>
        <Route path="/main/edit-order-model">
          <EditOrderModelView />
        </Route>
        <Route path="/main/capital-flow">
          <CapitalFlowView />
        </Route>
        <Redirect to="/main/user-manage" />
      </Switch>
    </Layout.Content>
  )
}

export default ContentComponent
