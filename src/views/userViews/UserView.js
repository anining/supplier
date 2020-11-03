import { Button, Upload, Modal, Switch, message } from 'antd'
import React, {useEffect, useState} from 'react'
import styles from '../../styles/modal'
import auth5 from '../../icons/auth/auth5.png'
import auth13 from '../../icons/auth/auth13.png'
import auth8 from '../../icons/auth/auth8.png'
import header1 from '../../icons/header/header1.png'
import c from '../../styles/user.module.css'
import {applyStl, getStlDetail} from "../../utils/api"
import {_toFixed, getPath, saveSuccess} from "../../utils/util"

function UserView() {
  const [visible, setVisible] = useState(false);
  const [stlData, setStlData] = useState({});

  useEffect(() => {
    getDetail()
  }, []);

  function getDetail () {
    getStlDetail().then(r=>{
      !r.error && setStlData(r.data)
    })
  }

  function onChange () {

  }

  function settlement () {
    setVisible(false)
    applyStl().then(r=>{
      if (!r.error) {
        saveSuccess(false)
        getDetail()
      }
    });
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
  }

  function beforeUpload (file) {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // async function _getStlDetail() {
    //   try {
    //     // eslint-disable-next-line no-undef
    //     const ret = await getStlDetail();
    //     if (ret && ret.data) {
    //       // console.log(ret, '==');
    //       setStlData(ret.data);
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }

  /*LuoYuKun 2020.11.2*/
  function handleOk() {

  }

  function handleCancel() {
    setVisible(false)
  }

  function onChange() {

  }

  function getBase64(img, callback) {
    // const reader = new FileReader();
    // reader.addEventListener('load', () => callback(reader.result));
    // reader.readAsDataURL(img);
  }

  function handleChange(info) {
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
  }

  function beforeUpload(file) {
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

  const canBeSettled = getPath(['can_be_settled'], stlData, 0);
  const requested = getPath(['requested'], stlData, 0);
  const notSettled = getPath(['not_settled'], stlData, 0);
  return (
    <div className="view">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL}>
            <img src={header1} alt=""/>
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
        <div className={c.section}>
          <div className={c.mainLeft}>
            <div className={c.label}>供货状态</div>
            <div className={c.moneySection}>
              <div className={c.moneyView}>
                <div className={c.balance}>
                  <div>{_toFixed(canBeSettled - requested)}</div>
                  <div>待结算</div>
                </div>
                <div className={c.line}/>
                <div className={c.balance}>
                  <div>{_toFixed(notSettled - canBeSettled)}</div>
                  <div>冻结中</div>
                </div>
                <div className={c.line}/>
                <div className={c.balance}>
                  <div>{_toFixed(requested)}</div>
                  <div>已申请</div>
                </div>
              </div>
              <Button className={c.submitBtn} type="primary" onClick={() => setVisible(true)}>申请结算</Button>
            </div>
            <div className={c.balanceTipsView}>
              <div className={c.closeTipsView}>
                <img src={auth5} alt=""/>
                <div>待结算：可以向商户申请打款结算的数额。</div>
              </div>
              <div className={c.freeze}>冻结中：订单还在售后时间内，不可结算的数额。当订单超过售后时间，订单对应的数额将会从冻结中转入待结算。</div>
            </div>
          </div>
          <div className={c.mainRight}>
            <div className={c.label}>结算二维码</div>
            <div className={c.qrCodeView}>
              <img
                src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
                alt="" className={c.qrImg}/>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <div>
                  <img src={auth13} alt="" className={c.uploadImg}/>
                  <div className={c.uploadText}>上传图片</div>
                </div>
              </Upload>
              <div>
                <div>结算二维码上传成功立即生效。</div>
                <div>需要更改结算二维码时，重新上传图片覆盖即可。</div>
              </div>
            </div>
          </div>
        </div>
        <div className={c.main}>
          <div className={c.label}>供货状态</div>
          <div className={c.statusView}>
            <div>供货状态:</div>
            <Switch className={c.switch} onChange={onChange}/>
            <div>当前状态：</div>
            <div>正常供货</div>
          </div>
          <div className={c.closeTipsView}>
            <img src={auth5} alt=""/>
            <div>正常供货：商户可以下单。关闭供货：商户无法可以下单。</div>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        footer={null}
        centered={true}
        onCancel={()=>setVisible(false)}
      >
        <div style={{...styles.view,...{paddingTop:44}}}>
          <img src={auth8} alt="" style={styles.img} />
          <div style={styles.view}>
            <img src={auth8} alt="" style={styles.img}/>
            <div style={styles.title}>请确认是否结算？</div>
            <div style={styles.text}>XXX社区申请结算金额：<span style={styles.balance}>{_toFixed(canBeSettled - requested)}</span>元</div>
            <div style={styles.tips}>请和商户协商后填写，由商户在线下打款给您。</div>
            <div>
              <Button style={styles.cancelBtn} onClick={()=>setVisible(false)}>取消</Button>
              <Button type="primary" style={styles.okBtn} onClick={settlement}>确定</Button>
            </div>
          </div>
        </div>
      </Modal>
  </div>
  )
}

export default UserView
