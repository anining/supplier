import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Input } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import good31 from '../../icons/good/good31.png'
import auth10 from '../../icons/auth/auth10.png'
import { paramTemplates } from "../../utils/api";
import DropdownComponent from '../../components/DropdownComponent'
import { push, transformTime, saveSuccess } from "../../utils/util";
import styles from "../../styles/modal"

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
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [search_name, setSearch_name] = useState()

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    let body = { page: current, size: pageSize }
    paramTemplates("get", undefined, body).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    })
  }

  function format (arr) {
    arr.forEach((item, index) => {
      item.key = index
      item.time = transformTime(item.created_at)
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const columns = [
    {
      title: '模型编号',
      dataIndex: 'id',
      align: 'center',
      // sorter: {
      //   compare: (a, b) => {
      //     console.log(a, b)
      //   },
      //   multiple: 1,
      // }
  },
    {
      title: '模型名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '包含参数',
      align: 'center',
      dataIndex: 'used_by',
  },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <div className={c.clickText} onClick={()=>push('/main/edit-order-model',record)}>编辑模型</div>
      )
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, rows) => {
      setSelectRows(selectedRowKeys)
    },
    selectedRowKeys: selectedRows
  };

  function submit (key) {
    switch (key) {
      case "delete":
        paramTemplates("delete", undefined, undefined, "ids=" + selectedRows.map(i => data[i].id).toString()).then(r => {
          if (!r.error) {
            saveSuccess(false)
            setSelectRows([])
            get(current)
          }
        })
        break
      default:
        ;
    }
  }

  return (
    <div className={c.main} style={{marginTop:0}}>
      <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL}>
              {/* <Input value={search_name} onPressEnter={()=>get(current)} onChange={e=>setSearch_name(e.target.value)} placeholder="请输入分类名称" size="small" className={c.searchInput}/> */}
              {/* { */}
              {/* <Button icon={ */}
              {/*   <img src={good31} alt="" style={{width:14,marginRight:6}} /> */}
              {/* } */}
              {/*   size = "small" */}
              {/*   onClick={()=>get(current)} */}
              {/*   className={c.searchBtn}>搜索模型</Button> */}
              {/* } */}
            </div>
            <div className={c.searchR}>
              <Button icon={
                <img src={good7} alt="" style={{width:16,marginRight:6}} />
              }
                type = "primary"
                size = "small"
                onClick={()=>push('/main/edit-order-model')}
                className={c.searchBtn}>新增模型</Button>
            </div>
          </div>
      </div>
      <DropdownComponent selectedRows={selectedRows} submit={submit} keys={[]}/>
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

export default OrderModelView
