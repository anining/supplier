import React, { useState, useEffect } from 'react'
import { Button, Modal, Input } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import auth10 from '../../icons/auth/auth10.png'
import { paramTemplates } from "../../utils/api";
import DropdownComponent from '../../components/DropdownComponent'
import { push, transformTime, saveSuccess } from "../../utils/util";
import styles from "../../styles/modal"
import ActionComponent from '../../components/ActionComponent'
import Table from '../../components/Table.jsx'

function OrderModelView () {
  const [visible, setVisible] = useState(false)
  const [visibleD, setVisibleD] = useState(false)

  function handleOk () {

  }

  function handleCancel () {
    setVisible(false)
  }

  return (
    <div className="view">
      <div className={c.container}>
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
          <div style={styles.title}>删除下单模型</div>
          <div style={styles.text}>有商品正在使用您选中的下单模型，请先取消商品和下单模型的关联。</div>
          <div style={styles.tips}>只允许删除“包含商品数量”为0的下单模型。</div>
          <Button style={styles.closeBtn} type="primary">我知道了</Button>
        </div>
      </Modal>
      <Modal
        visible={visibleD}
        onOk={handleOk}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <div style={styles.view}>
          <img src={auth10} alt="" style={styles.img} />
          <div style={styles.title}>删除下单模型</div>
          <div style={styles.text}>您确定要删除选中的下单模型吗？</div>
          <div>
            <Button style={styles.cancelBtn}>立即删除</Button>
            <Button type="primary" style={styles.okBtn}>不要删除</Button>
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
  const [loading, setLoading] = useState(true)
  const [search_name, setSearch_name] = useState()

  useEffect(() => {
    get()
  }, [pageSize, current])

  function get (page = current) {
    setLoading(true)
    let body = {page ,size: pageSize}
    if (search_name) {
      body = {...body, ...{name: search_name}}
    }
    paramTemplates("get", undefined, body).then(r => {
      setLoading(false)
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    }).catch(() => setLoading(false))
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = transformTime(item.created_at)
    })
    return arr
  }

  const columns = [
    {
      title: '模型编号',
      dataIndex: 'id',
			ellipsis: true,
  },
    {
      title: '模型名称',
      dataIndex: 'name',
			ellipsis: true,
  },
    {
      title: '包含参数',
			ellipsis: true,
      dataIndex: 'used_by',
  },
    {
      title: '创建时间',
      dataIndex: 'time',
			ellipsis: true,
  },
    {
      title: '操作',
      render: (...args) => <div className={c.clickText} onClick={()=>push('/main/edit-order-model', args[1])}>编辑模型</div>
    }
  ];

  function submit (key) {
    switch (key) {
      case "delete":
        paramTemplates("delete", undefined, undefined, selectedRows.map(i => data[i].id).toString()).then(r => {
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

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL}>
              <Input value={search_name} onPressEnter={()=> {
                setCurrent(1)
                get(1)
              }} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入模型名称" size="small" className={c.searchInput}/>
              {
              <Button 
                icon={<img src={good31} alt="" style={{width:14, marginRight:6}} />}
                size="small"
                onClick={() => {
                  setCurrent(1)
                  get(1)
                }}
                className={c.searchBtn}>搜索模型</Button>
              }
            </div>
            <div className={c.searchR}>
              <Button
                icon={<img src={good7} alt="" style={{width:16,marginRight:6}} />}
                type="primary"
                size="small"
                onClick={()=>push('/main/edit-order-model')}
                className={c.searchBtn}>新增模型</Button>
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

export default OrderModelView
