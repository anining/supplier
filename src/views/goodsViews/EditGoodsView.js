import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, InputNumber, Button, Radio, Breadcrumb, message } from 'antd'
import good5 from '../../icons/good/good5.png'
import { goBack, saveSuccess, push, regexNumber } from "../../utils/util";
import { goods, paramTemplates } from "../../utils/api";
import { storage } from "../../utils/storage"
import Quill from "../../components/Quill"
import { useHistory } from "react-router-dom";
import SearchInput from "../../components/SearchInput"

function EditGoodsView () {
  const { state = {} } = useHistory().location
  const { id, intro: i = "", ptpl_id, max_order_amount: max_o_a, min_order_amount: min_o_a, name: n="", providing, refund_type, refund_period, status: s = "available", unit: u, price: u_p } = state
  const h = useHistory()
  const [name, setName] = useState(n)
  const [value, setValue] = useState(refund_period)
  const [unit_price, setUnit_price] = useState(u_p)
  const [unit, setUnit] = useState(u)
  const [status, setStatus] = useState(s)
  const [provider_param_template_id, setProvider_param_template_id] = useState(ptpl_id)
  const [loading, setLoading] = useState(false)
  const [refund_method, setRefund_method] = useState(refund_type)
  const [min_order_amount, setMin_order_amount] = useState(min_o_a)
  const [max_order_amount, setMax_order_amount] = useState(max_o_a)
  const [introduction, setIntroduction] = useState(i)

  function save (jump) {
    if (!name || !provider_param_template_id || !introduction || !unit_price || !unit) {
      message.warning("请完善信息")
      return
    }
		const supplier_id = storage.getItem("supplier_id")
    let body = {
      name,
      unit,
      status,
      ptpl_id: provider_param_template_id,
      intro: introduction,
      min_order_amount: min_order_amount || 1,
      max_order_amount: max_order_amount || 100000,
      price: unit_price,
      supplier_id
    }
    if (refund_method) {
      body = {...body, ...{ refund_type: refund_method, refund_period: value*24*3600 }}
    }
    id && delete body.supplier_id
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

  function getParamTemplates (page, size, name) {
    const body = {page, size, name}
    !name && delete body.name
    return paramTemplates("get", undefined, body).then(r => {
      if (!r.error) {
        return r.data
      }
      return []
    }).catch(()=>[])
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
          <Input placeholder="请输入商品单价" onChange={e=>setUnit_price(regexNumber(e.target.value, true))} value={unit_price} className={c.itemInput}></Input>
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
            <SearchInput placeholder="请选择下单模型" fetchName={getParamTemplates} value={provider_param_template_id} setValue={setProvider_param_template_id}/>
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
					<Quill value={introduction} setValue={setIntroduction} />
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
