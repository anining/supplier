import React, { useState, useEffect } from 'react'
import styles from '../../styles/modal'
import * as R from 'kefir.ramda'
import { Badge, Button, Space, Modal, Input } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good9 from '../../icons/good/good9.png'
import auth10 from '../../icons/auth/auth10.png'
import auth11 from '../../icons/auth/auth11.png'
import auth12 from '../../icons/auth/auth12.png'
import DropdownComponent from "../../components/DropdownComponent";
import ActionComponent from "../../components/ActionComponent";
import { push, saveSuccess, getKey, getSimpleText } from "../../utils/util"
import TableHeaderComponent from "../../components/TableHeaderComponent"
import { goods } from "../../utils/api"
import { SCROLL, PLACE_ORDER_STATUS } from "../../utils/config"
import Table from "../../components/Table.jsx"

function GoodsView () {
  const [visible, setVisible] = useState(false)
  const [visibleOrder, setVisibleOrder] = useState(false)
  const [visibleBalance, setVisibleBalance] = useState(false)
  const [data] = useState([
    {
      label: '供货商品数',
      number: '-',
      icon: good3,
      id: 111,
    },
    {
      label: '供货中',
      number: '-',
      icon: good1,
      id: 222,
    },
    {
      label: '待供货',
      number: '-',
      icon: good2,
      id: 333,
    },
    {
      label: '关闭订单',
      number: '-',
      icon: good4,
      id: 444,
    },
  ])

	const sumIf = pred => R.pipe(
		R.filter(pred),
		R.map(R.prop("count")),
		R.sum
	)

	const getNums = () => {
		// ordersStat().then(r=>{
		// 	if(!r.error){
		// 		const goods_num = sumIf(() => true)(r.data)
		// 		const pending_num = sumIf(x => x.status === "pending")(r.data)
		// 		const refunding_num = sumIf(x => x.refund_status === "refunding")(r.data)
		// 		const failed_num = sumIf(x => x.sync_status === "failed")(r.data)
		// 		setLabels([
		// 			{
		// 				label: '订单总数',
		// 				number: goods_num,
		// 				icon: good19,
		// 				id: 111,
		// 			},
		// 			{
		// 				label: '待处理订单',
		// 				number: pending_num,
		// 				icon: good21,
		// 				id: 222,
		// 			},
		// 			{
		// 				label: '退款中',
		// 				number: refunding_num,
		// 				icon: good17,
		// 				id: 333,
		// 			},
		// 			{
		// 				label: '通信失败',
		// 				number: failed_num,
		// 				icon: good59,
		// 				id: 444,
		// 			}
		// 		])
		// 	}
		// })
	}

  function handleOk () {

  }

  function handleCancel () {
    setVisible(false)
  }

  return (
    <div className="view">
      <div className={c.container}>
        <TableHeaderComponent path="/main/edit-goods" data={data} text="新增"/>
        <RTable />
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <img src={auth10} alt="" style={styles.img} />
          <div style={styles.title}>您正在进行危险操作！</div>
          <div style={styles.text}>删除商品后，商户无法下单该商品！</div>
          <div style={styles.text}>请确认是否删除<span style={styles.balance}>音符点赞 飞速 (998)</span></div>
          <div>
            <Button style={styles.cancelBtn}>立即删除</Button>
            <Button type="primary" style={styles.okBtn}>不要删除</Button>
          </div>
        </div>
      </Modal>
      <Modal
        visible={visibleOrder}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <img src={auth11} alt="" style={styles.img} />
          <div style={styles.title}>您正在进行危险操作！</div>
          <div style={styles.text}>您选中了<span style={styles.balance}>5</span>个商品，确定要关闭下单吗？</div>
          <div style={styles.tips}>关闭下单之后，商户无法下单。请确认后操作。</div>
          <div>
            <Button style={styles.cancelBtn}>取消</Button>
            <Button type="primary" style={styles.okBtn}>确定</Button>
          </div>
        </div>
      </Modal>
      <Modal
        visible={visibleBalance}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <div style={styles.label}>
            <img src={auth12} alt="" style={styles.inputImg} />
            修改价格
          </div>
          <div style={styles.inputView}>修改价格：<Input placeholder="请在这里修改价格" style={styles.input}/></div>
          <div>
            <Button style={styles.cancelBtn}>取消</Button>
            <Button type="primary" style={styles.okBtn}>确定</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function RTable () {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [goods_id, setGoods_id] = useState()
  const [goods_name, setGoods_name] = useState()
  const [status, setStatus] = useState()
  const [place_status, setPlaceStatus] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get()
  }, [pageSize, current])

  function get (page = current) {
    let body = { page, size: pageSize }
    if (goods_id) {
      body = { ...body, ...{ id: goods_id } }
    }
    if (goods_name) {
      body = { ...body, ...{ name: goods_name } }
    }
    if (status) {
      body = { ...body, ...{ providing: status } }
    }
    if (place_status) {
      body = { ...body, ...{ status: place_status } }
    }
    setLoading(true)
    goods("get", undefined, body).then(r => {
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

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
    })
    return arr
  }

  function submit (key) {
    switch (key) {
      case "delete":
        goods("delete", undefined, undefined, selectedRows.map(i => data[i].id).toString()).then(r => {
          if (!r.error) {
            saveSuccess(false)
            setSelectRows([])
            get(1)
          }
        })
        break
      default:
    }
  }

  function reset () {
    setGoods_id(undefined)
    setGoods_name(undefined)
    setStatus(undefined)
    setPlaceStatus(undefined)
  }

  const columns = [
    {
      title: '商品编号',
      dataIndex: 'id',
			ellipsis: true,
  },
    {
      title: '商品名称',
      dataIndex: 'name',
			ellipsis: true,
  },
    {
      title: '单价',
      dataIndex: 'price',
			ellipsis: true,
  },
    {
      title: '单位',
      dataIndex: 'unit',
			ellipsis: true,
  },
    {
      title: '退款时限',
			ellipsis: true,
      render: (...args) => {
        const { refund_type, refund_period } = args[1]
        if (refund_type) {
          return `${refund_type==='after_started'?"下单":"完成"}${refund_period/3600/24}日内`
        }
        return "不允许退款"
      }
  },
    // {
    //   title: '供货状态',
    //   dataIndex: 'providing',
			// ellipsis: true,
    //   render: text => <Badge status={text?"processing":"warning"} text={text ? "正在供货" : "待供货"}/>
  // },
    {
      title: '最低下单',
      dataIndex: 'min_order_amount',
			ellipsis: true,
  },
    {
      title: '最高下单',
      dataIndex: 'max_order_amount',
			ellipsis: true,
  },
    {
      title: '下单状态',
      dataIndex: 'status',
			ellipsis: true,
      render: text => {
        const { text: t, status } = getKey(text, PLACE_ORDER_STATUS)
				return <div><Badge status={status} />{t}</div>
      }
  },
    {
      title: '商品说明',
			ellipsis: true,
      dataIndex: 'intro',
      render: text => <div className={c.noticeHtml}>{getSimpleText(text)}</div>
  },
    {
			title: () => <span style={{marginLeft:32}}>操作</span>,
			width: 209,
			fixed: 'right',
			ellipsis: true,
      render: (...args) => (
				<Space size="small" className={c.space}>
          <div className={c.clickText} onClick={()=>push('/main/edit-goods', args[1])}>修改商品</div>
          <div className={c.line} />
          <div style={{cursor:'wait'}} className={c.clickText}>修改价格</div>
        </Space>
      )
    }
  ];

  return (
    <div className={c.main}>
      <div className={c.searchView}>
        <div className={c.search}>
          <div className={c.searchL}>
            <Input value={goods_name} onPressEnter={()=> {
              setCurrent(1)
              get(1)
            }} onChange={e=>setGoods_name(e.target.value)} placeholder="请输入商品名称" size="small" className={c.searchInput}/>
            <Input value={goods_id} onPressEnter={()=> {
              setCurrent(1)
              get(1)
            }} onChange={e=>setGoods_id(e.target.value)} placeholder="请输入商品编号" size="small" className={c.searchInput}/>
            {/* <DropdownComponent action={status} setAction={setStatus} keys={[{name:"已上架",key:"available"},{name:"已关闭订单",key:"unavailable"},{name:"已下架",key:"paused"}]} placeholder="请选择供货状态" style={{width:186}}/> */}
            <DropdownComponent action={place_status} setAction={setPlaceStatus} keys={[{name:"关闭下单",key:"unavailable"},{name:"正常下单",key:"available"},{name:"暂停下单",key:"paused"}]} placeholder="请选择下单状态" style={{width:186}}/>
          </div>
          <div className={c.searchR}>
            <Button size="small" onClick={reset} className={c.resetBtn}>重置</Button>
            <Button icon={
              <img src={good9} alt="" style={{width:14,marginRight:6}} />
            }
              type = "primary"
              size = "small"
              onClick={()=> {
                setCurrent(1)
                get(1)
              }}
              className={c.searchBtn}>搜索</Button>
            </div>
        </div>
      </div>
			<ActionComponent selectedRows={selectedRows} setSelectRows={setSelectRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/>
      <Table
        setPageSize={setPageSize}
        setCurrent={setCurrent}
        setSelectedRowKeys={setSelectRows}
        selectedRowKeys={selectedRows}
        columns={columns}
        dataSource={data}
        pageSize={pageSize}
        total={total}
        current={current}
        loading={loading}
      />
    </div>
  )
}

export default GoodsView
