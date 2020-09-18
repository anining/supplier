import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Tooltip, Button, message, Radio, Checkbox } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'
import { goBack, saveSuccess } from "../../utils/util";
import { goods } from "../../utils/api";

function EditCommunityGoodView () {
  const [name, setName] = useState()
  const [status, setStatus] = useState("available")
  const [provider_param_template_id, setProvider_param_template_id] = useState(1)
  const [unit_price, setUnit_price] = useState()
  const [unit, setUnit] = useState()
  const [refundable, setRefundable] = useState()
  const [min_order_amount, setMin_order_amount] = useState()
  const [max_order_amount, setMax_order_amount] = useState()
  const [repeat_order, setRepeat_order] = useState()
  const [introduction, setIntroduction] = useState("")

  window.localClick = function (ids) {
    // setTags(ids)
  }

  function save (jump) {
    if (!name || !status || !unit || !provider_param_template_id || !unit_price || !refundable || !min_order_amount || !max_order_amount || !repeat_order || !introduction) {
      message.warning("请完善信息")
      return
    }
    goods('add', undefined, undefined, {
      name,
      unit_price,
      unit,
      status,
      provider_param_template_id,
      refundable,
      min_order_amount,
      max_order_amount,
      repeat_order,
      introduction
    }).then(r => {
      setName(undefined)
      setUnit_price(undefined)
      setUnit(undefined)
      setStatus("available")
      setProvider_param_template_id(undefined)
      setRefundable(undefined)
      setMax_order_amount(undefined)
      setMin_order_amount(undefined)
      setRepeat_order(undefined)
      setIntroduction("");
      !r.error && saveSuccess(jump)
    })
  }

  function parsing () {
    imageUrl && setPics([imageUrl])
  }

  function getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function handleChange (info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  function beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 社区业务 / <span>社区商品</span></div>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增社区商品</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <Input placeholder="请输入商品名称" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>单价</div>
          </div>
          <Input onChange={e=>setUnit_price(e.target.value)} value={unit_price} placeholder="请输入商品销售单价" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>单位</div>
          </div>
          <Input value={unit} onChange={e=>setUnit(e.target.value)} placeholder="请输入商品的计算单位" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最低数量</div>
          </div>
          <Input onChange={e=>setMin_order_amount(e.target.value)} value={min_order_amount} type="number" placeholder="该商品每一单最低多少起下，默认为0" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>最高数量</div>
          </div>
          <Input placeholder="该商品每一单最高多下多少个，默认为0" onChange={e=>setMax_order_amount(e.target.value)} value={max_order_amount} className={c.itemInput} type="number"></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>重复下单</div>
          </div>
          <Input type="number" onChange={e=>setRepeat_order(e.target.value)} value={repeat_order} placeholder="允许重复下单的数量" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>如果该商品不允许重复下单， 请填写0或者不填写</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>状态</div>
          </div>
          <Radio.Group onChange={e=>setStatus(e.target.value)} value={status} className={c.itemGrop}>
            <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="已上架 ： 用户可以看见并且购买该商品。">
              <Radio value="available" className={c.itemRadio}>已上架</Radio>
            </Tooltip>
          </Radio.Group>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>用户权限</div>
          </div>
          <div className={c.itemCheckView}>
            <Checkbox onChange={e=>{
              setRefundable(e.target.checked)
            }} checked={refundable} className={c.checkbox}>退单</Checkbox>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>目标描述</div>
          </div>
          <ReactQuill className={c.quill} theme="snow" value={introduction} onChange={e=>setIntroduction(e)}/>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" onClick={()=>save(true)} className={c.submit}>保存</Button>
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

export default EditCommunityGoodView
