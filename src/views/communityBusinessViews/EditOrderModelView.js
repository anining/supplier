import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message } from 'antd'
import good5 from '../../icons/good/good5.png'
import good8 from '../../icons/good/good8.png'
// import { communityParamTemplates } from "../../utils/api"
import { saveSuccess } from "../../utils/util"
import { useHistory } from "react-router-dom"
import {paramTemplates} from "../../utils/api"

function EditOrderModelView () {
  const { record = {} } = useHistory().location.state || {}
  const { id, name: n, weight: w, params: p = [] } = record
  const [name, setName] = useState(n)
  const [weight, setWeight] = useState(w)
  const [params, setParams] = useState(p)

  function save (value) {
    if (!name || !weight || !params.length) {
      message.warning("请完善信息")
      return;
    }
    paramTemplates(n ? 'modify' : 'add', id, undefined, { name, params, weight }).then(r => {
      setName(undefined)
      setWeight(0)
      setParams([])
      if (!r.error) {
        if (value) {
          saveSuccess()
        }
      }
    })
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 社区业务 / <span>下单模型</span></div>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增下单模型</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>模型名称</div>
          </div>
          <Input onChange={e=>setName(e.target.value)} value={name} placeholder="请输入模型名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>排序权重</div>
          </div>
          <Input placeholder="请填写权重数值，默认权重为1" type="number" onChange={e=>setWeight(e.target.value)} value={weight} className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>模型参数</div>
          </div>
          <div className={c.orderModelView}>
            <RModel params={params} setParams={setParams}/>
            <div onClick={()=>setParams([...params,...[{name:'',placeholder:'',type:''}]])} className={c.orderModelAdd}>
              <img src={good8} alt="" className={c.orderModelAddImg}/>
              <div className={c.orderModelAddText}>添加</div>
            </div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={()=>save(true)}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn} onClick={()=>save(false)}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RModel ({ params = [], setParams }) {
  const views = [];

  function deleteI (index) {
    const localParams = [...params]
    localParams.splice(index, 1)
    setParams(localParams)
  }

  function onChange (e, index, name) {
    const localParams = [...params]
    localParams[index][name] = e.target.value
    setParams(localParams)
  }

  params.forEach((item, index) => {
    const { name, placeholder, type } = item
    views.push(
      <div className={c.orderInputView} key={index}>
        <Input onChange={e=>onChange(e,index,"name")} value={name} placeholder="参数名称，如：数量" className={c.orderInput}></Input>
        <Input onChange={e=>onChange(e,index,'placeholder')} value={placeholder} placeholder="参数提示语，如：请输入数量" className={c.orderInput}></Input>
        <Input placeholder="参数类型，如：text" onChange={e=>onChange(e,index,'type')} value={type} className={c.orderInput}></Input>
        <Button size="small" danger className={c.orderBtn} onClick={()=>deleteI(index)}>删除</Button>
      </div>
    )
  })
  return views
}

export default EditOrderModelView
