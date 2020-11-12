import React, { useState, useEffect } from 'react'
import styles from '../../styles/modal'
import { Badge, Button, Popconfirm, Space, DatePicker, Modal, Table, Input, message } from 'antd'
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
import { orders, updateOrders, refundReject, refundAccept } from "../../utils/api"
import { REFUND_STATUS, ORDER_STATUS, SCROLL } from "../../utils/config"
import ActionComponent from '../../components/ActionComponent'

function OrderView () {
  const [visible, setVisible] = useState(false)
  const [visibleS, setVisibleS] = useState(false)
  const [visibleRemark, setVisibleRemark] = useState(false)
  const [visibleRef, setVisibleRef] = useState(false)
  const [selected, setSelected] = useState()
  const [refundReason, setRefundReason] = useState()
  const [refundNum, setRefundNum] = useState()
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
  const [selectedRows, setSelectRows] = useState([]);

  function refund () {
    setVisibleRef(false)
    refundReject(oid.id, refundReason).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setRefundReason(undefined)
        get(current)
      }
    })
  }

  function refunds () {
    setVisible(false)
    refundAccept(oid.id, refundNum).then(r => {
      if (!r.error) {
        saveSuccess(false)
        setRefundNum(undefined)
        get(current)
      }
    })
  }

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
				ellipsis: true,
  },
      {
        title: '商品名称',
        dataIndex: 'goods_name',
				ellipsis: true,
  },
      {
        title: '下单数量',
				ellipsis: true,
        dataIndex: 'amount',
  },
      {
        title: '订单金额',
				ellipsis: true,
        dataIndex: 'disc_price',
  },
      {
        title: '备注',
        dataIndex: 'comment',
				ellipsis: true,
        render: (text, record, index) => <div className={c.noticeHtml}>{text}</div>
  },
      {
        title: '下单信息',
				ellipsis: true,
        render: (text, record, index) => (
					<Popconfirm icon={<img src="" alt="" style={styles.icon}/>}
						placement="leftTop"
						title={
							() => (
								<div style={styles.popView}>
									<div style={styles.popTitle}>下单信息：</div>
										{
											record.args ? Object.keys(JSON.parse(record.args || "{}")).map(i=><div key={i} style={styles.popText}>{i}：<span>{JSON.parse(record.args || "{}")[i]}</span></div>) : <div style={styles.popText}>暂无</div>
										}
									</div>
							)
						}>
						<div className={c.view_text}>查看</div> 
					</Popconfirm>
				)
	},
			{
      title: '扩展信息',
			ellipsis: true,
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return (
          <Popconfirm icon={<img src="" alt="" style={styles.icon}/>}
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
						<div className={c.view_text}>查看</div> 
          </Popconfirm>
      )
    }
	}, {
		title: '订单状态',
		ellipsis: true,
		dataIndex: 'status',
		render: (text, record, index) => {
			const { text: t, status} = getKey(text, ORDER_STATUS)
			return <div><Badge status={status} />{t}</div>
		}
	}, 
		{
			title: '售后状态',
			ellipsis: true,
			dataIndex: 'refund_status',
			render: (text, record, index) => {
				const { text: t, status } = getKey(text, REFUND_STATUS)
				return (
					<Popconfirm
						icon={<img src="" alt="" style={styles.icon}/>}
						placement="bottomRight"
						title={() => <div style={{color:'#FF5F5F',fontSize:'0.857rem',paddingTop:8}}>{t}</div>}
					>
						<div><Badge status={status} />{t}</div>
					</Popconfirm>
				)
			}
	},
		{
			title: '结算状态',
			ellipsis: true,
			dataIndex: 'disc_price',
	}, 
		{
			title: '订单历程',
			ellipsis: true,
			render: (text, record, index) => {
				return <div onClick={()=>push('/main/order-recording',record)}>查看详情</div>
			}
	}, 
		{
			title: '下单时间',
			dataIndex: 'time',
			ellipsis: true,
	}, 
		{
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 355,
			fixed: 'right',
			render: (text, record, index) => {
				const { refund_status, status } = record
				return (
					<Space size="small" className={c.space}>
						<div onClick={()=>{
							setOid(record)
							setVisibleS(true)
						}} className={c.clickText}>修改状态</div>
						<div style={{height:14,width:1,background:'#D8D8D8'}}></div>
						<div onClick={()=>{
							setOid(record)
							setVisibleRemark(true)
							setComment(record.comment)
						}} className={c.clickText}>添加备注</div>
						<div style={{height:14,width:1,background:'#D8D8D8'}}></div>
						<div onClick={()=>{
							setOid(record)
							setVisible(true)
						}} className={c.clickText}>申请退款</div>
						<div style={{height:14,width:1,background:'#D8D8D8'}}></div>
						<div onClick={()=>{
							setOid(record)
							setVisibleRef(true)
						}} className={c.clickText}>拒绝退款</div>
					</Space>
				)
		}
	},
	];

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
        <div className={c.main}>
            <div className={c.searchView}>
              <div className={c.search}>
                <div className={c.searchL}>
                  <Input value={order_id} onPressEnter={()=>get(current)} onChange={e=>setOrder_id(e.target.value)} placeholder="请输入订单编号" size="small" className={c.searchInput}/>
                  <Input value={goods_name} onPressEnter={()=>get(current)} onChange={e=>setGoods_name(e.target.value)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
                  <DropdownComponent action={status} setAction={setStatus} keys={[{name:"待处理",key:"pending"},{name:"进行中",key:"processing"},{name:"已完成",key:"completed"},{name:"已终止",key:"closed"}]} placeholder="请选择订单状态" style={{width:186}}/>
                  <DropdownComponent action={refund_status} setAction={setRefund_status} keys={[{name:"退款中",key:"refunding"},{name:"已退款",key:"refunded"},{name:"已拒绝",key:"rejected"}]} placeholder="请选择售后状态" style={{width:186}}/>
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
						<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[]}/>
            <Table
							scroll={SCROLL}
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
              {/* <Button classname={c.statusbtn} onclick={()=>setselected("processing")} style={{ */}
              {/*   color:selected==="processing"?"#ffc415":"rgba(0, 0, 0, 0.25)", */}
              {/*   background:selected==="processing"?"#FFFAEB":"#fff", */}
              {/*   borderColor:selected==="processing"?"#FFCB31":"rgba(0, 0, 0, 0.15)", */}
              {/* }}>进行中</Button> */}
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
              <div className={c.itemSelect}>
                <Input className={c.itemSelectP} addonAfter={<div className={c.addonAfter} onClick={()=>setRefundNum(oid.amount)}>全部数量</div>} value={refundNum} onChange={e=>setRefundNum(e.target.value)} placeholder="请在这里输入退款数量"/>
              </div>
            </div>
            <div style={{color:"#3C3D3C"}}>当前退款商品：<span style={{color:"#ff7600"}}>音符点赞 飞速 (202001051010)</span></div>
          </div>
          <div>
            <Button onClick={()=>{
              setRefundReason(undefined)
              setVisible(false)
            }} style={styles.cancelBtn}>取消</Button>
            <Button type="primary" onClick={refunds} style={styles.okBtn}>确定</Button>
          </div>
        </div>
      </Modal>
      <Modal
        visible={visibleRef}
        footer={null}
        centered={true}
        width={520}
        closable={false}
        onCancel={()=>setVisibleRef(false)}
      >
        <div style={styles.view}>
          <div style={styles.label}>
            <img src={auth12} alt="" style={styles.inputImg} />
            拒绝退款
          </div>
          <div style={styles.inputView}>拒绝原因：<Input value={refundReason} onChange={e=>setRefundReason(e.target.value)} placeholder="请输入拒绝原因（选填）" style={styles.input}/></div>
          <div style={{...styles.inputView,...{paddingLeft: 70,marginTop: 6}}}>当前选中订单：<span style={{color:"#FF7600"}}>{ oid.goods_name || ''}</span></div>
          <div>
            <Button onClick={()=>{
              setRefundReason(undefined)
              setVisibleRef(false)
            }} style={styles.cancelBtn}>取消</Button>
            <Button type="primary" onClick={refund} style={styles.okBtn}>确定</Button>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default OrderView
