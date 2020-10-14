import React, { useState, useEffect } from 'react'
import styles from '../../styles/modal'
import { Button, DatePicker, Modal, Table, Input } from 'antd'
import good13 from '../../icons/good/good13.png'
import c from '../../styles/view.module.css'
import good21 from '../../icons/good/good21.png'
import good11 from '../../icons/good/good11.png'
import good23 from '../../icons/good/good23.png'
import good9 from '../../icons/good/good9.png'
import auth12 from '../../icons/auth/auth12.png'
import DropdownComponent from "../../components/DropdownComponent";
import { push, saveSuccess } from "../../utils/util"
import TableHeaderComponent from "../../components/TableHeaderComponent"
// import { communityGoods } from "../../utils/api"

let win

function CapitalFlowView () {
  const [visible, setVisible] = useState(false)
  const [visibleRemark, setVisibleRemark] = useState(false)
  const [data] = useState([
    {
      label: '待结算',
      number: '10,100',
      icon: good11,
      id: 111,
    },
    {
      label: '冻结中',
      number: '10,111',
      icon: good13,
      id: 222,
    },
    {
      label: '下单总额',
      number: '10,111',
      icon: good21,
      id: 333,
    },
    {
      label: '退单总额',
      number: '10,111',
      icon: good23,
      id: 444,
    },
  ])

  function handleOk () {

  }

  function handleCancel () {
    setVisible(false)
  }

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent data={data}/>
        <RTable />
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
            添加备注
          </div>
          <div style={{marginBottom:11}}>
            <div style={styles.refundSelect}>
              <div>添加备注：</div>
              <div onClick={()=>{

              }} className={c.itemSelect}>
                <Input className={c.itemSelectP} placeholder="请在这里输入备注内容"/>
              </div>
            </div>
            <div style={{color:"#3C3D3C"}}>当前退款商品：<span style={{color:"#ff7600"}}>音符点赞 飞速 (202001051010)</span></div>
          </div>
          <div>
            <Button style={styles.cancelBtn}>取消</Button>
            <Button type="primary" style={styles.okBtn}>确定</Button>
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

function RTable () {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [date, setDate] = useState([])
  const [moment, setMoment] = useState()

  const [id, setId] = useState()
  const [search_name, setSearch_name] = useState()
  const [community_goods_category_id, setCommunity_goods_category_id] = useState()
  const [community_goods_category_name, setCommunity_goods_category_name] = useState()
  const [status, setStatus] = useState()
  const [refundable, setRefundable] = useState()
  const [order_by, setOrder_by] = useState()
  const [ordering, setOrdering] = useState()
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  window.localClick = function (type, ids) {
    setCommunity_goods_category_id(ids.id)
    setCommunity_goods_category_name(ids.name)
    win && win.close()
  }

  useEffect(() => {
    get(current)
  }, [])

  function dateChange (data, dataString) {
    setDate([new Date(dataString[0]).toISOString(), new Date(dataString[1]).toISOString()])
    setMoment(data)
  }

  function get (current) {
    let body = { page: current, size: pageSize }
    if (id) {
      body = { ...body, ...{ id } }
    }
    if (search_name) {
      body = { ...body, ...{ search_name } }
    }
    if (community_goods_category_id) {
      body = { ...body, ...{ community_goods_category_id } }
    }
    if (status) {
      body = { ...body, ...{ status } }
    }
    if (refundable === "refundable" || refundable === "no_refundable") {
      body = { ...body, ...{ refundable: refundable === "refundable" } }
    }
    // if (order_by) {
    //   body = { ...body, ...{ order_by } }
    // }
    // if (ordering) {
    //   body = { ...body, ...{ ordering } }
    // }
    setLoading(true)
    // communityGoods("get", undefined, body).then(r => {
    //   setLoading(false)
    //   if (!r.error) {
    //     const { data, total } = r
    //     setTotal(total)
    //     setData(format(data))
    //   }
    // }).catch(() => {
    //   setLoading(false)
    // })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  function click () {
    win = window.open("/select-good-category", "_blank", "left=390,top=145,width=1200,height=700")
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
    // communityGoods("modifys", undefined, params.toString(), { status: key }).then(r => {
    //   setActionLoading(false)
    //   if (!r.error) {
    //     saveSuccess(false)
    //     setSelectRows([])
    //     get(current)
    //   }
    // }).catch(() => {
    //   setActionLoading(false)
    // })
  }

  function reset () {
    setId(undefined)
    setSearch_name(undefined)
    setCommunity_goods_category_name(undefined)
    setCommunity_goods_category_id(undefined)
    setStatus(undefined)
    setRefundable(undefined)
    setOrder_by(undefined)
  }

  const obj = {
    available: {
      color: "#FFFF5F5F",
      text: '-',
    },
    unavailable: {
      color: "#FF61BD60",
      text: '+',
    },
  }
  const obj3 = {
    available: {
      color: "#FFFF7600",
      text: '结算',
    },
    unavailable: {
      color: "#FF458BFF",
      text: '下单',
    },
    unavailable1: {
      color: "#FFFF5F5F",
      text: '退款',
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
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '资金类型',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return '-'
      }
  },
    {
      title: '订单数额',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return '-'
      }
  },
    {
      title: '下单时间',
      align: 'center',
      dataIndex: 'disc_price',
      render: (text, record, index) => {
        return '-'
      }
},
];

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input value={id} onPressEnter={()=>get(current)} onChange={e=>setId(e.target.value)} placeholder="请输入订单编号" size="small" className={c.searchInput}/>
            <Input value={search_name} onPressEnter={()=>get(current)} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
            <DropdownComponent action={status} setAction={setStatus} keys={[{name:"已上架",key:"available"},{name:"已关闭订单",key:"unavailable"},{name:"已下架",key:"paused"}]} placeholder="请选择资金类型" style={{width:186}}/>
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
              className={c.searchBtn}>搜索记录</Button>
            </div>
        </div>
      </div>
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

export default CapitalFlowView
