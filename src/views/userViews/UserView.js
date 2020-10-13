import React, { useState } from 'react'
import { Button, Modal, Switch } from 'antd'
import auth5 from '../../icons/auth/auth5.png'
import auth8 from '../../icons/auth/auth8.png'
import header1 from '../../icons/header/header1.png'
import c from '../../styles/user.module.css'

function UserView () {
  const [visible, setVisible] = useState(false)

  function handleOk () {

  }

  function handleCancel () {
    setVisible(false)
  }

  function onChange () {

  }

  return (
    <div className="view">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL}>
            <img src={header1} alt="" />
            <div>
              <div className={c.tips}>欢迎您，想喝冰阔泺，祝您开心每一天！</div>
              <div className={c.msg}>上次登录时间：<span>2021.01.01 01:15:23</span></div>
              <div className={c.msg}>上次登录地点：<span>127.0.0.1(重庆市 重庆)</span></div>
            </div>
          </div>
          <div className={c.headerR}>
            <div className={c.headerSec}>
              <div>供应商ID：</div>
              <div className={c.id}>12345</div>
            </div>
            <div className={c.headerSec}>
              <div>供应商密钥：</div>
              <Button type="primary" className={c.btn}>复制密钥</Button>
            </div>
            <div className={c.headerSec}>
              <div>API文档：</div>
              <Button type="primary" className={c.btn}>查看文档</Button>
            </div>
          </div>
        </div>
        <div className={c.main}>
          <div className={c.moneySection}>
            <div className={c.moneyView}>
              <div className={c.balance}>
                <div>1342.1255</div>
                <div>待结算</div>
              </div>
              <div className={c.line} />
              <div className={c.balance}>
                <div>1342.1255</div>
                <div>冻结中</div>
              </div>
            </div>
            <Button className={c.submitBtn} type="primary">申请结算</Button>
          </div>
          <div className={c.balanceTipsView}>
            <div className={c.closeTipsView}>
              <img src={auth5} alt="" />
              <div>待结算：可以向商户申请打款结算的数额。</div>
            </div>
            <div className={c.freeze}>冻结中：订单还在售后时间内，不可结算的数额。当订单超过售后时间，订单对应的数额将会从冻结中转入待结算。</div>
          </div>
          <div className={c.statusView}>
            <div>供货状态:</div>
            <Switch className={c.switch} onChange={onChange} />
            <div>当前状态：</div>
            <div>正常供货</div>
          </div>
          <div className={c.closeTipsView}>
            <img src={auth5} alt="" />
            <div>正常供货：商户可以下单。关闭供货：商户无法可以下单。</div>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <img src={auth8} alt="" style={styles.img} />
          <div style={styles.title}>请确认是否结算？</div>
          <div style={styles.text}>XXX社区申请结算金额：<span style={styles.balance}>12341.12</span>元</div>
          <div style={styles.tips}>请和商户协商后填写，由商户在线下打款给您。</div>
          <div>
            <Button style={styles.cancelBtn}>取消</Button>
            <Button type="primary" style={styles.okBtn}>确定</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const styles = {
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 104
  },
  title: {
    fontWeight: 500,
    marginTop: 32,
    marginBottom: 22,
    color: '#353535',
    fontSize: '1.285rem'
  },
  tips: {
    color: '#FF6A02',
    fontSize: '0.857rem',
    marginBottom: 31,
    marginTop: 6,
  },
  text: {
    color: '#3C3D3C',
    fontSize: '0.857rem',
  },
  balance: {
    color: '#FF7600',
    fontSize: '1.142rem'
  },
  okBtn: {
    height: 40,
    width: 170,
    color: '#333',
    marginLeft: 70
  },
  cancelBtn: {
    height: 40,
    width: 170,
    background: '#BDBDBD',
    color: '#fff',
  }
}

export default UserView
