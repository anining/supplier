import React, { useState, useEffect } from 'react'
import { Button, Menu, Dropdown, Table, message, Input, Space } from 'antd'
import good1 from '../../icons/good/good1.png'
import c from '../../styles/view.module.css'
import { DownOutlined } from '@ant-design/icons';
import { h } from '../../utils/history'
import good2 from '../../icons/good/good2.png'
import good3 from '../../icons/good/good3.png'
import good4 from '../../icons/good/good4.png'
import good7 from '../../icons/good/good7.png'
import good9 from '../../icons/good/good9.png'
import { goods } from "../../utils/api";

function CommunityGoodView () {

  return (
    <div className="view">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL}>
            <HeaderItem />
          </div>
          <Button icon={
            <img src={good7} alt="" style={{width:16,marginRight:6}} />
          }
          type = "primary"
          size = "small"
            onClick={()=>{
              const history = h.get()
              history.push("/main/editCommunityGood")
            }}
          className = {c.headerAddBtn}>添加商品</Button>
        </div>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    goods("get", undefined, { page: current, size: pageSize }).then(r => {
      if (!r.error) {
        const { data, total } = r
        setTotal(total)
        setData(format(data))
      }
    })
  }

  function format (arr = []) {
    arr.forEach((item, index) => {
      item.key = index
      // item.account = item.manager.account
    })
    return arr
  }

  function onChange (page, pageSize) {
    setCurrent(page)
    get(page)
  }

  const obj = [
    {
      color: "#2C68FF",
      text: '已上架',
    },
    {
      color: "#FF4D4F",
      text: '已下架',
    },
    {
      color: "#FF8D30",
      text: '已关闭订单',
    }
  ]
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '商品分类',
      align: 'center',
      dataIndex: 'category',
  },
    {
      title: '下单模型',
      dataIndex: 'model',
      align: 'center',
  },
    {
      title: '进价',
      dataIndex: 'in_price',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      }
  },
    {
      title: '售价',
      dataIndex: 'out_price',
      align: 'center',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      }
  },
    {
      title: '密价',
      align: 'center',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => {
          console.log(a, b)
        },
        multiple: 1,
      }
  },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
  },
    {
      title: '下单限制',
      align: 'center',
      dataIndex: 'text',
      render: (text, record, index) => {
        return (
          <div style={{color:'#595959'}}>
            <div>最低数量：100   重复下单：<span style={{color:"#52C41A"}}>开启</span></div>
            <div>最高数量：100   重复下单：<span style={{color:"#C8C8C8"}}>关闭</span></div>
          </div>
        )
      }
  },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      render: (text, record, index) => {
        const { text: t, color } = obj[text]
        return <div style={{color}}>{t}</div>
      }
  },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} onClick={()=>{
            const history = h.get()
            history.push("/main/editCommunityGood")
          }}>编辑商品</div>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
          <div style={{textDecoration:"underline",textDecorationColor:'#2C68FF'}} href="/main/editCommunityGood">调价历史</div>
        </Space>
      )
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      // name: record.name,
    }),
  };

  function handleMenuClick (e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={c.main}>
        <div className={c.searchView}>
          <div className={c.search}>
            <div className={c.searchL}>
              <Input placeholder="请输入商品编号" size="small" className={c.searchInput}/>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn}>
                  <div className={c.hiddenText}>
                    请选择商品分类
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn}>
                  <div className={c.hiddenText}>
                    请选择商品状态
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn}>
                  <div className={c.hiddenText}>
                    请选择用户权限
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button size="small" className={c.dropdownBtn}>
                  <div className={c.hiddenText}>
                    请选择供货商
                  </div>
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <div className={c.searchR}>
              <Button size="small" className={c.resetBtn}>重置</Button>
              <Button icon={
                <img src={good9} alt="" style={{width:14,marginRight:6}} />
              }
              type = "primary"
              size = "small"
              className={c.searchBtn}>搜索商品</Button>
            </div>
          </div>
      </div>
      <div className={c.actionView}>
        <Dropdown overlay={menu}>
          <Button size="small" className={c.actionBtn}>
            <div className={c.hiddenText}>
              批量操作
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button className={c.action} size="small">执行操作</Button>
      </div>
      <Table columns={columns} rowSelection={{
        type: selectionType,
        ...rowSelection
      }} dataSource={data} rowClassName={(record,index)=>{
        if (index % 2) {
          return "f1f5ff"
        }
      }} size="small" pagination={{
          showQuickJumper:true,
          current,
          pageSize,
          hideOnSinglePage:false,
          showLessItems:true,
          total,
          onChange
       }}
      />
    </div>
  )
}

function HeaderItem () {
  const views = [];
  const data = [
    {
      label: '商品总数',
      number: '10,100',
      icon: good3,
      id: 111,
    },
    {
      label: '已上架数',
      number: '10,111',
      icon: good1,
      id: 222,
    },
    {
      label: '已下架数',
      number: '10,111',
      icon: good2,
      id: 333,
    },
    {
      label: '关闭下单',
      number: '10,111',
      icon: good4,
      id: 444,
    },
  ]

  data.forEach((item, index) => {
    const { label, number, icon, id } = item;
    views.push(
      <div className={c.headerItem} key={id}>
        <img src={icon} alt="" className={c.headerItemImg} />
        <div className={c.headerIR} style={{borderRightWidth:index<data.length-1?1:0}}>
          <div className={c.headerNumber}>{number}</div>
          <div className={c.headerLabel}>{label}</div>
        </div>
      </div>
    )
  })

  return views
}

export default CommunityGoodView
