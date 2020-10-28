import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, InputNumber, Button, Radio, Breadcrumb, message } from 'antd'
import ReactQuill from 'react-quill';
import good5 from '../../icons/good/good5.png'
import { goBack, saveSuccess, push } from "../../utils/util";
import { goods } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { MODULES } from "../../utils/config";

let win

function EditGoodsView () {
  const { state = {} } = useHistory().location
  const { id, intro: i = "", max_order_amount: max_o_a, min_order_amount: min_o_a, name: n, providing, refund_type, refund_period, status: s = "available", unit: u, price: u_p } = state
  const h = useHistory()
  const [name, setName] = useState(n)
  const [value, setValue] = useState(refund_period)
  const [unit_price, setUnit_price] = useState(u_p)
  const [unit, setUnit] = useState(u)
  const [status, setStatus] = useState(s)
  const [provider_param_template_id, setProvider_param_template_id] = useState()
  const [provider_param_template_name, setProvider_param_template_name] = useState()
  const [loading, setLoading] = useState(false)
  const [refund_method, setRefund_method] = useState(refund_type)
  const [min_order_amount, setMin_order_amount] = useState(min_o_a)
  const [max_order_amount, setMax_order_amount] = useState(max_o_a)
  const [introduction, setIntroduction] = useState(i)

  window.localClick = function (type, ids) {
    switch (type) {
      case 'provider_param_template_id':
        setProvider_param_template_id(ids.id)
        setProvider_param_template_name(ids.name)
        break
      default:
        ;
    }
    win && win.close()
  }

  function save (jump) {
    if (!name || !provider_param_template_id || !introduction || !unit_price || !unit) {
      message.warning("请完善信息")
      return
    }
    let body = {
      name,
      unit,
      status,
      ptpl_id: provider_param_template_id,
      intro: introduction,
      refund_method: refund_method ? { refund_type: refund_method, refund_period: value } : refund_method,
      min_order_amount: min_order_amount || 1,
      max_order_amount: max_order_amount || 100000,
      price: unit_price,
    }
    setLoading(true)
    const promise = goods(id ? "modify" : 'add', id, undefined, body)
    promise.then(r => {
      setLoading(false)
      if (!r.error) {
        if (!jump) {
          h.replace('/main/edit-goods')
        }
        saveSuccess(jump)
        setValue(undefined)
        setName(undefined)
        setUnit(undefined)
        setUnit_price(undefined)
        setStatus("available")
        setProvider_param_template_name(undefined)
        setProvider_param_template_id(undefined)
        setRefund_method(undefined)
        setMax_order_amount(undefined)
        setMin_order_amount(undefined)
        setIntroduction("");
      }
    }).catch(() => {
      if (!jump) {
        h.replace('/main/edit-goods')
      }
      setLoading(false)
    })
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/goods")}>商品管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id?"修改":"新增"}商品</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <Input maxLength={40} placeholder="请输入商品名称" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品单价</div>
          </div>
          <Input placeholder="请输入商品单价" onChange={e=>setUnit_price(e.target.value)} value={unit_price} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品单位</div>
          </div>
          <Input maxLength={20} placeholder="请输入商品单位" onChange={e=>setUnit(e.target.value)} value={unit} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>下单模型</div>
          </div>
            <div onClick={()=>{
               win = window.open("/select-order-model", "_blank", "left=390,top=145,width=1200,height=700")
            }} className={c.itemSelect}>
              <div className={c.itemSelectP} style={{color:provider_param_template_name?"rgba(0, 0, 0, 0.85)":"rgba(0,0,0,0.25)"}}>{provider_param_template_name?provider_param_template_name:'请设置下单模型'}</div>
              <div>选择</div>
            </div>
            <Button type="primary" className={c.itemBtn} onClick={()=>{
              push('/main/edit-order-model')
            }}>新增模型</Button>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>退款时限</div>
          </div>
          <Radio.Group onChange={e=>setRefund_method(e.target.value)} value={refund_method} className={c.closeTimeView}>
            <Radio value={undefined} className={c.closeTime}>不允许退款</Radio>
            <Radio value="after_started" className={c.closeTime}>从下单起<InputNumber onFocus={()=>{
              setRefund_method("after_started")
              setValue(undefined)
            }} maxLength={3} value={refund_method==="after_started"?value:""} onChange={e=>setValue(e)} className={c.closeTimeI}/>天内可以退款</Radio>
            <Radio value="after_closed" className={c.closeTime}>从订单完成起<InputNumber onFocus={()=>{
              setRefund_method("after_closed")
              setValue(undefined)
            }} maxLength={3} value={refund_method==="after_closed"?value:""} onChange={e=>setValue(e)} className={c.closeTimeI}/>天内可以退款</Radio>
          </Radio.Group>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最低下单</div>
          </div>
          <Input type="number" onChange={e=>setMin_order_amount(e.target.value)} value={min_order_amount} placeholder="最低下单数量，默认为1" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最高下单</div>
          </div>
          <Input type="number" onChange={e=>setMax_order_amount(e.target.value)} value={max_order_amount} placeholder="最高下单数量，默认为100000" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>状态</div>
          </div>
          <Radio.Group onChange={e=>setStatus(e.target.value)} value={status} className={c.itemGrop}>
            <Radio value="available" className={c.itemRadio}>已上架</Radio>
            <Radio value="paused" className={c.itemRadio}>已下架</Radio>
            <Radio value="unavailable" className={c.itemRadio}>已上架但关闭下单</Radio>
          </Radio.Group>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品说明</div>
          </div>
          <ReactQuill modules={MODULES} className={c.quill} theme="snow" value={introduction} onChange={e=>setIntroduction(e)}/>
        </div>
        <div className={c.item} style={{marginTop:80}}>
          <div className={c.itemName} />
          <div className={c.btnView}>
            <Button loading={loading} type="primary" onClick={()=>save(true)} className={c.submit}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn} onClick={goBack}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn} onClick={()=>save(false)}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditGoodsView
