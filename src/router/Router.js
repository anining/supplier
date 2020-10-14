import React, { useEffect } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import LoginView from '../views/authViews/LoginView'
import MainComponent from '../components/MainComponent'
import { proxyRouter } from "../utils/history"
import { storage } from '../utils/storage'
import { setter, getter } from '../utils/store'
import { push } from '../utils/util'
import SelectOrderModelView from "../views/goodsViews/SelectOrderModelView"

function Router () {
  proxyRouter(useHistory(), '/login')
  const { authorization, old_password, nickname } = getter(['old_password', 'nickname', 'authorization'])
  const localAuthorization = storage.getItem("authorization")
  const localNickname = storage.getItem("nickname");
  const local_old_password = storage.getItem("old_password");
  !authorization.get() && localAuthorization && setter([["authorization", localAuthorization.replace(/\"/g, "")]]);
  !nickname.get() && localNickname && setter([["nickname", localNickname.replace(/\"/g, "")]]);
  !old_password.get() && local_old_password && setter([["old_password", local_old_password.replace(/\"/g, "")]])

  useEffect(() => {
    const timer = setInterval(() => !storage.getItem("authorization") && push('/login'), 1000)
    return () => timer && clearInterval(timer)
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        {authorization.get() ? <Redirect to="/main/user-manage" /> : <LoginView />}
      </Route>
      <Route path="/main">
        <MainComponent />
      </Route>
      <Route path="/select-order-model">
        <SelectOrderModelView />
      </Route>
      <Route path="/login">
        <LoginView />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

export default Router;
