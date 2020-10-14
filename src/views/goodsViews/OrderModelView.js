import React, { useState, useEffect } from 'react'
import { Button, Table } from 'antd'
import c from '../../styles/view.module.css'
import good7 from '../../icons/good/good7.png'
import { paramTemplates } from "../../utils/api";
import DropdownComponent from '../../components/DropdownComponent'
import { push, transformTime, saveSuccess } from "../../utils/util";

function OrderModelView () {

  return (
    <div className="view">
      <div className={c.container}>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [selectedRows, setSelectRows] = useState([]);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    setLoading(true)
    let body = { page: current, size: pageSize }
    paramTemplates("get", undefined, body).then(r => {
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
    setActionLoading(true)
    switch (key) {
      case "delete":
        const params = new URLSearchParams()
        selectedRows.forEach(i => params.append("ids", data[i].id))
        paramTemplates("delete", undefined, undefined, params.toString()).then(r => {
          setActionLoading(false)
          if (!r.error) {
            saveSuccess(false)
            setSelectRows([])
            get(current)
          }
        }).catch(() => {
          setActionLoading(false)
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
            <div className={c.searchL} />
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
      {/* <DropdownComponent loading={actionLoading} selectedRows={selectedRows} submit={submit} keys={[{name:"批量删除",key:"delete"}]}/> */}
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

export default OrderModelView
