import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, Radio, Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import good5 from '../../icons/good/good5.png'
import { goBack, saveSuccess, push } from "../../utils/util";
import { communityGoods } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { MODULES } from "../../utils/config";

let win

function EditGoodsView () {
  const { state = {} } = useHistory().location
  const h = useHistory()
  const { id, name: n, tags: tag_s = [], batch_order: b_o, category_name, weight: w, introduction: i_td = "", disc_price: d_p, pics: ps = [], max_order_amount: max_o_a, community_goods_category_id: c_id, community_param_template_id: t_id, min_order_amount: min_o_a, param_template_name, repeat_order: r_o, status: s = "available", unit: u, unit_cost: u_c, unit_price: u_p } = state
  const [name, setName] = useState(n)
  const [status, setStatus] = useState(s)
  const [pics, setPics] = useState(ps)
  const [community_goods_category_id, setCommunity_goods_category_id] = useState(c_id)
  const [community_param_template_id, setCommunity_param_template_id] = useState(t_id)
  const [community_goods_category_name, setCommunity_goods_category_name] = useState(category_name)
  const [community_param_template_name, setCommunity_param_template_name] = useState(param_template_name)
  const [tag_ids, setTag_ids] = useState(tag_s.map(i => i.id))
  const [tags, setTags] = useState(tag_s)
  const [unit, setUnit] = useState(u)
  const [unit_price, setUnit_price] = useState(u_p)
  const [refundable, setRefundable] = useState(true)
  const [unit_cost, setUnit_cost] = useState(u_c)
  const [disc_price, setDisc_price] = useState(d_p)
  const [min_order_amount, setMin_order_amount] = useState(min_o_a)
  const [max_order_amount, setMax_order_amount] = useState(max_o_a)
  const [repeat_order, setRepeat_order] = useState(r_o)
  const [batch_order, setBatch_order] = useState(b_o)
  const [weight, setWeight] = useState(w)
  const [introduction, setIntroduction] = useState(i_td)
  const [imageUrl, setImageUrl] = useState(pics[0])
  const [loading, setLoading] = useState(false)
  const [recommended, setRecommended] = useState(false)

  // window.localClick = function (type, ids) {
  //   switch (type) {
  //     case 'tables':
  //       setTags(ids)
  //       setTag_ids(ids.map(i => i.id))
  //       break
  //     case 'good_category_id':
  //       setCommunity_goods_category_id(ids.id)
  //       setCommunity_goods_category_name(ids.name)
  //       break
  //     case 'order-model-id':
  //       setCommunity_param_template_id(ids.id)
  //       setCommunity_param_template_name(ids.name)
  //       break
  //     default:
  //       ;
  //   }
  //   win && win.close()
  // }

  // window.localJump = function () {
  //   push("/main/table")
  //   win && win.close()
  // }

  function save (jump) {
    // if (!name || !pics.length || !community_param_template_id || !community_goods_category_id || !unit_price || !tag_ids.length || !unit) {
    //   message.warning("请完善信息")
    //   return
    // }
    // if (weight > 32767 || weight < -32768) {
    //   message.warning("权重值超出范围")
    //   return
    // }
    // let body = {
    //   name,
    //   status,
    //   provider_goods: { provider_type: 'internal', goods_id: 1 },
    //   pics,
    //   community_goods_category_id,
    //   community_param_template_id,
    //   tag_ids,
    //   unit_price,
    //   unit,
    //   refundable,
    //   recommended,
    //   min_order_amount: min_order_amount || 1,
    //   max_order_amount: max_order_amount || 1,
    //   weight: weight || 1,
    //   unit_cost,
    //   disc_price,
    //   repeat_order,
    //   batch_order,
    //   introduction
    // }
    // setLoading(true)
    // const promise = communityGoods(id ? "modify" : 'add', id, undefined, body)
    // promise.then(r => {
    //   setLoading(false)
    //   if (!r.error) {
    //     if (!jump) {
    //       h.replace('/main/editCommunityGood')
    //     }
    //     saveSuccess(jump)
    //     setName(undefined)
    //     setStatus("available")
    //     setPics([])
    //     setCommunity_param_template_id(undefined)
    //     setCommunity_goods_category_id(undefined)
    //     setCommunity_param_template_name(undefined)
    //     setCommunity_goods_category_name(undefined)
    //     setTag_ids([])
    //     setTags([])
    //     setUnit(undefined)
    //     setUnit_price(undefined)
    //     setRefundable(true)
    //     setUnit_cost(undefined)
    //     setDisc_price(undefined)
    //     setMax_order_amount(undefined)
    //     setMin_order_amount(undefined)
    //     setRepeat_order(undefined)
    //     setBatch_order(undefined)
    //     setWeight(undefined)
    //     setIntroduction("");
    //     setImageUrl(undefined)
    //   }
    // }).catch(() => {
    //   if (!jump) {
    //     h.replace('/main/editCommunityGood')
    //   }
    //   setLoading(false)
    // })
  }

  function parsing () {
    imageUrl && setPics([imageUrl])
  }

  function getBase64 (img, callback) {
    // const reader = new FileReader();
    // reader.addEventListener('load', () => callback(reader.result));
    // reader.readAsDataURL(img);
  }

  function handleChange (info) {
    // if (info.file.status === 'uploading') {
    //   this.setState({ loading: true });
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl =>
    //     this.setState({
    //       imageUrl,
    //       loading: false,
    //     }),
    //   );
    // }
  };

  function beforeUpload (file) {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
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
            <span onClick={()=>push("/main/goods-manage")}>商品管理</span>
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
          <Input maxLength={40} placeholder="请输入商品单价" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品单位</div>
          </div>
          <Input maxLength={40} placeholder="请输入商品单位" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>下单模型</div>
          </div>
            <div onClick={()=>{
               win = window.open("/select-order-model", "_blank", "left=390,top=145,width=1200,height=700")
            }} className={c.itemSelect}>
              <div className={c.itemSelectP} style={{color:community_param_template_name?"rgba(0, 0, 0, 0.85)":"rgba(0,0,0,0.25)"}}>{community_param_template_name?community_param_template_name:'请设置下单模型'}</div>
              <div>选择</div>
            </div>
            <Button type="primary" className={c.itemBtn} onClick={()=>{
              push('/main/editOrderModel')
            }}>新增模型</Button>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>退款时限</div>
          </div>
          <Radio.Group onChange={e=>setRecommended(e.target.value)} value={recommended} className={c.closeTimeView}>
            <Radio value={false} className={c.closeTime}>不允许退款</Radio>
            <Radio value={true} className={c.closeTime}>从下单起<Input className={c.closeTimeI}/>天内可以退款</Radio>
            <Radio value={1} className={c.closeTime}>从订单完成起<Input className={c.closeTimeI}/>天内可以退款</Radio>
          </Radio.Group>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最低下单</div>
          </div>
          <Input type="number" onChange={e=>setUnit_cost(e.target.value)} value={unit_cost} placeholder="最低下单数量，默认为1" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最高下单</div>
          </div>
          <Input type="number" onChange={e=>setUnit_price(e.target.value)} value={unit_price} placeholder="最高下单数量，默认为100000" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>重复下单</div>
          </div>
          <Input type="number" onChange={e=>setDisc_price(e.target.value)} value={disc_price} placeholder="允许重复下单的数量，默认为0" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>下单状态</div>
          </div>
          <Radio.Group onChange={e=>setRecommended(e.target.value)} value={recommended} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
            <Radio value={false} className={c.itemRadio} style={{width:'33.333%'}}>正常下单</Radio>
            <Radio value={true} className={c.itemRadio} style={{width:'33.333%'}}>关闭下单</Radio>
          </Radio.Group>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
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
