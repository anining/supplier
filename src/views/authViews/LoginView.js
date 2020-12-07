import React, { useState } from 'react'
import c from '../../styles/login.module.css'
import { Input, message, Button } from 'antd';
import auth2 from '../../icons/auth/auth2.png'
import auth3 from '../../icons/auth/auth3.png'
import auth4 from '../../icons/auth/auth4.png'
import { login } from '../../utils/api'
import { setter } from '../../utils/store'
import { push } from "../../utils/util";
import jwt_decode from 'jwt-decode'

function LoginView () {
  const [account, setAccount] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  function onChange (e, key) {
    const { value } = e.target;
    switch (key) {
      case 1:
        setAccount(value);
        break;
      default:
        setPassword(value)
    }
  }

  function submit () {
    if (!account || !password) {
      message.warning("请完善信息")
      return;
    }
    setLoading(true)
    const promise = login(account, password)
    setPassword(undefined)
    promise.then(r => {
      setLoading(false)
      const { error, data } = r;
      if (!error) {
        const { access_token } = data;
				const {exp, supplier_id, role} = jwt_decode(access_token);
        setter([['authorization', `Bearer ${access_token}`], ['role', role], ['supplier_id', supplier_id]], true);
        push('/main')
      }
    }).catch(() => setLoading(false))
  }

  return (
    <div className="container">
      <div className={c.bg}>
        <div className={c.topView}>
          <div className={c.leftView}>
            <img src={auth2} alt="" className={c.img} />
          </div>
          <div className={c.rightView}>
            <div className={c.inputView}>
              <div className={c.inputTitle}>供货商登录</div>
              <div className={c.inputItem}>
                <div className={c.inputText}>账号</div>
                <Input size="small" maxLength={20} onChange={e=>onChange(e,1)} value={account} className={c.input} placeholder="请输入登录手机号" prefix={
                  <img src={ auth3 } alt="" className={c.inputImg}/>
                } />
              </div>
              <div className={c.inputItem} style={{height:'25.677%',marginTop:'9.576%',marginBottom:'18.04%'}}>
                <div className={c.inputText}>密码</div>
                <Input size="small" maxLength={40} onPressEnter={submit} type="password" onChange={e=>onChange(e,2)} value={password} className={c.input}  placeholder="请输入登录密码" prefix={
                  <img src={ auth4 } alt="" className={c.inputImg}/>
                  } style={{height:'40.15%'}}/>
                <div style={{opacity:0}}>login</div>
              </div>
              <Button loading={loading} type="primary" onClick={submit} className={c.btn}>登录</Button>
            </div>
          </div>
        </div>
        {/* <div className={c.bottomView}> */}
        {/*   <div className={c.footerView}> */}
        {/*     <div className={c.item}>帮助中心</div> */}
        {/*     <div className={c.item}>开放平台</div> */}
        {/*     <div className={c.item}>免责条款</div> */}
        {/*   </div> */}
        {/*   <div className={c.footer}>Cooyright © 2020 光棱科技 </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default LoginView;
