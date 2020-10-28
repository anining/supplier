import React, { useState, useEffect } from 'react'
import styles from '../../styles/modal'
import { Button, Popconfirm, Space, DatePicker, Modal, Table, Input, message } from 'antd'
import good10 from '../../icons/good/good10.png'
import c from '../../styles/view.module.css'
import good11 from '../../icons/good/good11.png'
import good12 from '../../icons/good/good12.png'
import good13 from '../../icons/good/good13.png'
import good9 from '../../icons/good/good9.png'
import auth12 from '../../icons/auth/auth12.png'
import DropdownComponent from "../../components/DropdownComponent";
import { push, getKey, saveSuccess, dateFormat } from "../../utils/util"
import TableHeaderComponent from "../../components/TableHeaderComponent"
import { orders, updateOrders } from "../../utils/api"
import { ORDER_STATUS } from "../../utils/config"

function OrderView () {
  const [visible, setVisible] = useState(false)
  const [visibleS, setVisibleS] = useState(false)
  const [visibleRemark, setVisibleRemark] = useState(false)
  const [selected, setSelected] = useState()
  const [oid, setOid] = useState({})
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()
  const [order_id, setOrder_id] = useState()
  const [goods_name, setGoods_name] = useState()
  const [status, setStatus] = useState()
  const [refund_status, setRefund_status] = useState()
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [comment,setComment] = useState()

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.comment = item.comment || '-'
      item.time = dateFormat(item.created_at, "yyyy-MM-dd HH:mm:ss")
    })
    return arr
  }

  function get (current) {
    let body = { page: current, size: pageSize }
    if (order_id) {
      body = { ...body, ...{ order_id } }
    }
    if (goods_name) {
      body = { ...body, ...{ goods_name } }
    }
    if (status) {
      body = { ...body, ...{ status } }
    }
    if (refund_status) {
      body = { ...body, ...{ refund_status } }
    }
    if (date.length) {
      body = { ...body, ...{ start_from: date[0], end_with: date[1] } }
    }
    setLoading(true)
    orders("get", undefined, body).then(r => {
      setLoading(false)
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  const [label] = useState([
    {
      label: '订单总数',
      number: '10,100',
      icon: good12,
      id: 111,
    },
    {
      label: '退款中',
      number: '10,111',
      icon: good10,
      id: 222,
    },
    {
      label: '待结算',
      number: '10,111',
      icon: good11,
      id: 333,
    },
    {
      label: '冻结中',
      number: '10,111',
      icon: good13,
      id: 444,
    },
  ])

  function handleOk () {

  }

  function handleCancel () {
    setVisibleS(false)
    setVisibleRemark(false)
    setVisible(false)
  }

  function modalOk (key) {
    switch (key) {
      case "status":
        if (!selected) {
          message.warning("请完善信息")
          return
        }
        updateOrders(oid.id, { status: selected }).then(r => {
          setVisibleS(false)
          if (!r.error) {
            saveSuccess(false)
            get(current)
          }
        }).catch(() => {
          setVisibleS(false)
        })
        break;
      case "remark":
        updateOrders(oid.id, { comment }).then(r => {
          setVisibleRemark(false)
          if (!r.error) {
            saveSuccess(false)
            get(current)
          }
        }).catch(() => {
          setVisibleRemark(false)
        })
        break;
      default:
    }
  }
  const { text: t, color } = getKey(oid.status, ORDER_STATUS)

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent data={label}/>
        <RTable setComment={setComment} status={status} get={get} current={current} setVisibleRemark={setVisibleRemark} setDate={setDate} setMoment={setMoment} setCurrent={setCurrent} setActionLoading={setActionLoading} data={data} setOrder_id={setOrder_id} setGoods_name={setGoods_name} setStatus={setStatus} setRefund_status={setRefund_status} goods_name={goods_name} moment={moment} actionLoading={actionLoading} loading={loading} total={total} pageSize={pageSize} refund_status={refund_status} order_id={order_id} setVisibleS={setVisibleS} setOid={setOid}/>
      </div>
      <Modal
        visible={visibleRemark}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <div style={styles.label}>
            <img src={auth12} alt="" style={styles.inputImg} />
            修改备注
          </div>
          <div style={{marginBottom:11}}>
            <div style={styles.refundSelect}>
              <div>修改备注：</div>
              <div onClick={()=>{

              }} className={c.itemSelect}>
                <Input maxLength={80} className={c.itemSelectP} value={comment} onChange={e=>setComment(e.target.value)} placeholder="请在这里输入备注内容"/>
              </div>
            </div>
            <div style={{color:"#3C3D3C"}}>当前修改商品：<span style={{color}}>{oid.goods_name}</span></div>
          </div>
          <div>
            <Button style={styles.cancelBtn} onClick={()=>setVisibleRemark(false)}>取消</Button>
            <Button type="primary" style={styles.okBtn} onClick={()=>modalOk("remark")}>确定</Button>
          </div>
        </div>
      </Modal>
      <Modal
        visible={visibleS}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <div style={styles.label}>
            <img src={auth12} alt="" style={styles.inputImg} />
            修改状态
          </div>
          <div>
            <div className={c.statusModelTips}>选中订单：{oid.id}    订单状态：<span style={{color}}>{t}</span></div>
            <div className={c.statusModelTitle}>修改为</div>
            <div>
              <Button className={c.statusBtn} onClick={()=>setSelected("processing")} style={{
                color:selected==="processing"?"#FFC415":"rgba(0, 0, 0, 0.25)",
                background:selected==="processing"?"#FFFAEB":"#fff",
                borderColor:selected==="processing"?"#FFCB31":"rgba(0, 0, 0, 0.15)",
              }}>进行中</Button>
              <Button className={c.statusBtn} onClick={()=>setSelected("completed")} style={{
                color:selected==="completed"?"#FFC415":"rgba(0, 0, 0, 0.25)",
                background:selected==="completed"?"#FFFAEB":"#fff",
                borderColor:selected==="completed"?"#FFCB31":"rgba(0, 0, 0, 0.15)",
              }}>已完成</Button>
              <Button className={c.statusBtn} onClick={()=>setSelected("closed")} style={{
                color:selected==="closed"?"#FFC415":"rgba(0, 0, 0, 0.25)",
                background:selected==="closed"?"#FFFAEB":"#fff",
                borderColor:selected==="closed"?"#FFCB31":"rgba(0, 0, 0, 0.15)",
              }}>已终止</Button>
            </div>
          </div>
          <div>
            <Button onClick={()=>setVisibleS(false)} style={styles.cancelBtn}>取消</Button>
            <Button type="primary" style={styles.okBtn} onClick={()=>modalOk("status")}>确定</Button>
          </div>
        </div>
      </Modal>
      <Modal
        visible={visible}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <div style={styles.label}>
            <img src={auth12} alt="" style={styles.inputImg} />
            退款
          </div>
          <div style={{marginBottom:11}}>
            <div style={styles.refundSelect}>
              <div>退款数量：</div>
              <div onClick={()=>{

              }} className={c.itemSelect}>
                <Input className={c.itemSelectP} addonAfter={
                  <div className={c.addonAfter} onClick={()=>alert((1))}>
                    全部数量
                  </div>
                } placeholder="请在这里输入退款数量"/>
              </div>
            </div>
            <div style={{color:"#3C3D3C"}}>当前退款商品：<span style={{color:"#ff7600"}}>音符点赞 飞速 (202001051010)</span></div>
          </div>
          <div>
            <Button style={styles.cancelBtn}>取消</Button>
            <Button type="primary" style={styles.okBtn}>确定</Button>
          </div>
        </div> <
    /Modal> < /
    div >
  )
}

function RTable ({ get, current,setVisibleRemark,setComment, setDate, setCurrent, setMoment, setActionLoading, data, setOrder_id, setGoods_name, setStatus, setRefund_status, order_id, goods_name, moment, loading, actionLoading, total, pageSize, status, refund_status, setVisibleS, setOid }) {
  const [selectedRows, setSelectRows] = useState([]);

  useEffect(() => {
    get(current)
  }, [])

  function dateChange (data, dataString) {
    setDate([new Date(dataString[0]).toISOString(), new Date(dataString[1]).toISOString()])
    setMoment(data)
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  function onConfirm () {

  }

  function onCancel () {

  }

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
    setActionLoading(true)
    const params = new URLSearchParams()
    selectedRows.forEach(i => params.append("ids", data[i].id))
    orders("modifys", undefined, params.toString(), { status: key }).then(r => {
      setActionLoading(false)
      if (!r.error) {
        saveSuccess(false)
        setSelectRows([])
        get(current)
      }
    }).catch(() => {
      setActionLoading(false)
    })
  }

  function reset () {
    setOrder_id(undefined)
    setGoods_name(undefined)
    setStatus(undefined)
    setRefund_status(undefined)
    setMoment(undefined)
    setDate([])
  }

  const obj2 = {
    available: {
      color: "#FF458BFF",
      text: '退款中',
    },
    unavailable: {
      color: "#FF61BD60",
      text: '已退款',
    },
    unavailable1: {
      color: "rgba(0, 0, 0, 0.65)",
      text: '-',
    },
  }
  const obj3 = {
    available: {
      color: "#FFFF7803",
      text: '待结算 ',
    },
    unavailable: {
      color: "#FF61BD60",
      text: '已结算',
    },
    unavailable1: {
      color: "#FFFF4D4F",
      text: '冻结中',
    },
  }
  const columns = [
      {
        title: '订单编号',
        dataIndex: 'id',
        align: 'center',
  },
      {
        title: '商品名称',
        dataIndex: 'goods_name',
        align: 'center',
  },
      {
        title: '下单数量',
        align: 'center',
        dataIndex: 'amount',
  },
      {
        title: '订单数量',
        align: 'center',
        dataIndex: 'disc_price',
        render: (text, record, index) => {
          return '-'
        }
  },
      {
        title: '备注',
        align: 'center',
        dataIndex: 'comment',
        render: (text, record, index) => <div className={c.noticeHtml}>{text}</div>
  },
      {
        title: '下单信息',
        align: 'center',
        render: (text, record, index) => {
          return (
            <Popconfirm icon={<img src="" alt="" style={styles.icon}/>
          }
          placement = "leftTop"
          title = {
              () => {
                return (
                  <div style={styles.popView}>
                    <div style={styles.popTitle}>下单信息：</div>
                      {
                        record.args ? Object.keys(JSON.parse(record.args || "{}")).map(i=><div key={i} style={styles.popText}>{i}：<span>{JSON.parse(record.args || "{}")[i]}</span></div>) : <div style={styles.popText}>暂无</div>
                      }
                </div>
                )
              }
            } >
            <div>查看详情</div> <
            /Popconfirm>
        )
      }
    },
    {
      title: '扩展信息',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return (
          <Popconfirm icon={<img src="" alt="" style={styles.icon}/>
        }
        placement = "leftTop"
        title = {
            () => {
              return (
                <div style={styles.popView}>
                  <div style={styles.popTitle}>扩展信息：</div>
                    {
                      record.extras ? Object.keys(JSON.parse(record.extras || "{}")).map(i=><div key={i} style={styles.popText}>{i}：<span>{JSON.parse(record.extras || "{}")[i]}</span></div>) : <div style={styles.popText}>暂无</div>
                    }
              </div>
              )
            }
          } >
          <div>查看详情</div> <
          /Popconfirm>
      )
    }
}, {
  title: '订单状态',
  align: 'center',
  dataIndex: 'status',
  render: (text, record, index) => {
    const { text: t, color } = getKey(text, ORDER_STATUS)
    return <div style={{color}}>{t}</div>
  }
}, {
  title: '售后状态',
  align: 'center',
  dataIndex: 'disc_price',
  render: (text, record, index) => {
    return '-'
  }
}, {
  title: '结算状态',
  align: 'center',
  dataIndex: 'disc_price',
  render: (text, record, index) => {
    return '-'
  }
}, {
  title: '订单历程',
  align: 'center',
  render: (text, record, index) => {
    return <div onClick={()=>push('/main/order-recording',record)}>查看详情</div>
  }
}, {
  title: '下单时间',
  align: 'center',
  dataIndex: 'time',
}, {
  title: '操作',
  align: 'center',
  render: (text, record, index) => (
    <Space size="small">
      <div onClick={()=>{
        setOid(record)
        setVisibleS(true)
      }} className={c.clickText}>修改状态</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{cursor:'wait'}} className={c.clickText}>退款</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
      <div onClick={()=>{
        setOid(record)
        setVisibleRemark(true)
        setComment(record.comment)
      }} className={c.clickText}>加备注</div>
        </Space>
  )
},
];

return (
  <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input value={order_id} onPressEnter={()=>get(current)} onChange={e=>setOrder_id(e.target.value)} placeholder="请输入订单编号" size="small" className={c.searchInput}/>
            <Input value={goods_name} onPressEnter={()=>get(current)} onChange={e=>setGoods_name(e.target.value)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
            <DropdownComponent action={status} setAction={setStatus} keys={[{name:"待处理",key:"pending"},{name:"进行中",key:"processing"},{name:"已完成",key:"completed"},{name:"已终止",key:"closed"}]} placeholder="请选择订单状态" style={{width:186}}/>
            <DropdownComponent action={refund_status} setAction={setRefund_status} keys={[{name:"已退款",key:"closed"},{name:"退款中",key:"refunding"}]} placeholder="请选择售后状态" style={{width:186}}/>
            {/* <DropdownComponent action={status} setAction={setStatus} keys={[{name:"已上架",key:"available"},{name:"已关闭订单",key:"unavailable"},{name:"已下架",key:"paused"}]} placeholder="请选择结算状态" style={{width:186}}/> */}
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              onChange={dateChange}
              value={moment}
              className={c.dataPicker}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button icon={
              <img src={good9} alt="" style={{width:14,marginRight:6}} />
            }
              type = "primary"
              size = "small"
              loading={loading}
              onClick={()=>get(current)}
              className={c.searchBtn}>搜索</Button>
            </div>
        </div>
      </div>
      <DropdownComponent loading={actionLoading} selectedRows={selectedRows} submit={submit} keys={[]}/>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection
        }}
        dataSource={data}
        size="small"
        pagination={{
          showQuickJumper:true,
          current,
          pageSize,
          showLessItems:true,
          total,
          onChange
        }}
      />
    </div>
)
}

export default OrderView
