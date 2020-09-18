import React, { useState, useEffect } from 'react'
import { Button, Timeline, Menu, Dropdown, Table, message, Input, Space, Popconfirm, DatePicker } from 'antd'
import c from '../../styles/view.module.css'
import { DownOutlined } from '@ant-design/icons';
import good17 from '../../icons/good/good17.png'
import good18 from '../../icons/good/good18.png'
import good40 from '../../icons/good/good40.png'
import good19 from '../../icons/good/good19.png'
import good20 from '../../icons/good/good20.png'
import good21 from '../../icons/good/good21.png'
import good41 from '../../icons/good/good41.png'
import good9 from '../../icons/good/good9.png'
import { orders } from "../../utils/api";

function CommunityOrderView () {

  return (
    <div className="container">
      <div className={c.container}>
        <div className={c.header}>
          <div className={c.headerL} style={{width:'87.684%'}}>
            <HeaderItem />
          </div>
        </div>
        <RTable />
      </div>
    </div>
  )
}

function RTable () {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [visible, setVisible] = useState([])
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    get(current)
  }, [])

  function get (current) {
    orders(current, pageSize).then(r => {
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

  function detail (id, index) {
    const localVisible = []
    data.forEach((item, i) => {
      if (index === i) {
        localVisible.push(true)
      } else {
        localVisible.push(false)
      }
    })
    // localVisible[index] = true
    setVisible(localVisible)
    // managersPermissions(id).then(r => {
    //   const { error, data } = r;
    //   !error && setPurview(data)
    //   setVisible(true)
    //   console.log(data)
    // })
  }

  function close () {
    const localVisible = []
    data.forEach((item, i) => {
      localVisible.push(false)
    })
    // localVisible[index] = true
    setVisible(localVisible)
  }

  const obj = [
    {
      color: "#FF8D30",
      text: '待处理',
    },
    {
      color: "#2C68FF",
      text: '进行中',
    },
    {
      color: "#52C41A",
      text: '已完成',
    },
    {
      color: "#FF8D30",
      text: '异常',
    },
    {
      color: "#FF5730",
      text: '申请退款',
    }
  ]
  const columns = [
      {
        title: '订单编号',
        dataIndex: 'id',
        align: 'center',
  },
      {
        title: '下单信息',
        dataIndex: 'msg',
        align: 'center',
        render: (text, record, index) => {
          const { uri, number, password } = text;
          return (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div>
              <div>主页链接 :{uri}</div>
              <div style={{display:'flex'}}>
                <div style={{marginRight:30}}>账号: {number}</div>
                <div>密码: {password}</div>
              </div>
            </div>
          </div>
          )
        }
  },
      {
        title: '扩展信息',
        align: 'center',
        dataIndex: 'text',
        render: (text, record, index) => {
          const { begin_num, num } = text;
          return (
            <div>
            <div>初始量 :{begin_num}</div>
            <div>当前量: {num}</div>
          </div>
          )
        }
  },
      {
        title: '下单数量',
        dataIndex: 'number',
        align: 'center',
  },
      {
        title: '订单金额',
        dataIndex: 'price',
        align: 'center',
  },
      {
        title: '订单状态',
        align: 'center',
        dataIndex: 'status',
        render: (text, record, index) => {
          const { text: t, color } = obj[text]
          return <div style={{color}}>{t}</div>
        }
  },
      {
        title: '下单时间',
        dataIndex: 'time',
        align: 'center',
  },
      {
        title: '订单历程',
        align: 'center',
        render: (text, record, index) => (
          <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
        }
        visible = { visible[index] }
        placement = "left"
        title = {
          () => {
            return (
              <div style={styles.view}>
                    <div style={styles.close} onClick={close}>
                      <img src={good40} style={styles.closeImg} alt="" />
                    </div>
                    <Timeline>
                      <Timeline.Item color="#1890FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
                      <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item color="#1890FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
                      <Timeline.Item color="#1890FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
                      <Timeline.Item color="#1890FF">2020.01.15 15:01:04　用户下单，订单状态变为<span style={{color:'#4177FE'}}>待处理</span></Timeline.Item>
                      <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item color="#979BA3">Create a services site 2015-09-01</Timeline.Item>
                    </Timeline>
                  </div>
            )
          }
        } >
        <div style={{color:'#2C68FF',textDecoration:'underline',textDecorationColor:'#2C68FF'}} onClick={()=>detail(text,index)}>点击查看</div> <
        /Popconfirm>
      )
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space size="small" style={{color:'#2C68FF'}}>
            <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
              }
              placement = "left"
              title = {
                  () => {
                    return (
                      <div style={styles.view}>
                        <div style={styles.header}>
                          <img src={good41} alt="" style={styles.icon}/>
                          <div>请输入需要退款的数量</div>
                        </div>
                        <Input style={styles.input} placeholder="请在这里输入退款数量"/>
                        <div style={styles.tips}>全部退款</div>
                        <div style={styles.footer}>
                          <Button size="small" style={styles.cancelBtn}>取消</Button>
                          <Button size="small" type="primary" style={styles.okBtn}>确定</Button>
                        </div>
                      </div>
                    )
                  }
                } >
              <div style={{color:'#FF4D4F',textDecoration:'#FF4D4F underline'}}>退款</div>
            </Popconfirm>
          <div style={{height:14,width:1,background:'#D8D8D8'}}></div>
            <Popconfirm icon={()=><img src="" alt="" style={{width:0,height:0}}/>
              }
              placement = "left"
              title = {
                  () => {
                    return (
                      <div style={styles.view}>
                        <div style={styles.header}>
                          <img src={good41} alt="" style={styles.icon}/>
                          <div>请为此订单输入备注信息</div>
                        </div>
                        <Input style={styles.input} placeholder="请在这里输入备注信息"/>
                        <div style={styles.footer}>
                          <Button size="small" style={styles.cancelBtn}>取消</Button>
                          <Button size="small" type="primary" style={styles.okBtn}>确定</Button>
                        </div>
                      </div>
                    )
                  }
                } >
              <div style={{color:'#2C68FF',textDecoration:'#2C68FF underline'}}>添加备注</div>
            </Popconfirm>
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
      <div className={c.searchView} style={{height:72}}>
        <div className={c.search} style={{borderBottomWidth:0}}>
            <div className={c.searchL}>
              <Input placeholder="请输入订单编号" size="small" className={c.searchInput}/>
              <Input placeholder="请输入商品名称" size="small" className={c.searchInput}/>
              <Input placeholder="请输入下单账号" size="small" className={c.searchInput}/>
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
                    请选择订单状态
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
              className={c.searchBtn}>搜索订单</Button>
            </div>
          </div>
      </div>
      <div className={c.searchView} style={{height:52}}>
        <div className={c.search} style={{alignItems:'flex-start'}}>
          <div className={c.searchL} style={{width:'35.344%'}}>
            <Dropdown overlay={menu}>
              <Button size="small" className={c.dropdownBtn} style={{width:'32.404%'}}>
                <div className={c.hiddenText}>
                  请选择商品名称
                </div>
                <DownOutlined />
              </Button>
            </Dropdown>
            <DatePicker.RangePicker style={{width:'60.627%',height:32}}/>
            </div>
          </div>
      </div>
      <div className={c.actionView} style={{height:72}}>
        <Dropdown overlay={menu}>
          <Button size="small" className={c.actionBtn}>
            <div className={c.hiddenText}>
              批量操作
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button className={c.action} onClick={()=>setVisible(true)} size="small">执行操作</Button>
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
      label: '订单总数',
      number: '10,100',
      icon: good19,
      id: 111,
    },
    {
      label: '待处理订单',
      number: '10,111',
      icon: good21,
      id: 222,
    },
    {
      label: '申请退款',
      number: '10,111',
      icon: good17,
      id: 333,
    },
    {
      label: '申请补单',
      number: '10,111',
      icon: good18,
      id: 444,
    },
    {
      label: '异常订单',
      number: '1',
      icon: good20,
      id: 555,
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

const styles = {
  item: {
    width: '100%',
  },
  view: {
    width: 328,
    display: 'flex',
    flexDirection: 'column',
  },
  close: {
    width: '100%',
    height: 32,
    display: 'flex',
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  closeImg: {
    width: 13
  }
}

export default CommunityOrderView
