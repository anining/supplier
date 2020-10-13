import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Timeline, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import edit23 from '../../icons/edit/edit23.png'
import { push } from "../../utils/util"

function OrderRecView () {
  const [orders, setOrders] = useState([1])

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/order-manage")}>订单管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>订单历程</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.orderM}>
          <div className={c.orderMH}>订单编号：20201541254483</div>
          <ROrder orders={orders}/>
        </div>
      </div>
    </div>
  )
}

function ROrder ({ orders }) {
  if (!orders.length) {
    return (
      <div className={c.orderNull}>
            <img src={edit23} alt="" />
            <div>暂无订单历程~</div>
          </div>
    )
  }
  return (
    <Timeline className={c.orderLineView}>
            <Timeline.Item color="#1890FF" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>退款成功，您给用户退款：<span>¥25.1255</span>(退款数量：{10})，xxx给您退款：<span>¥30.1255</span>(退款数量：{10})，售后状态 <span>退款中</span>=><span style={{color:"#74C041"}}>已退款</span>，订单状态 <span style={{color:"#2C68FF"}}>进行中</span>=><span>已结束</span>。</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>用户发起退款申请，售后状态变为 <span>退款中</span>。</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>在 xxx (供应商/对接目标名称)下单成功(您在上级下单消耗：<span>¥120.1255</span>)，订单状态 <span style={{color:"#FF8D30"}}>待处理</span>=><span style={{color:"#2C68FF"}}>进行中</span>。 操作人：xxx</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>在 xxx (供应商/对接目标名称)下单成功(您在上级下单消耗：<span>¥120.1255</span>)，订单状态 <span style={{color:"#FF8D30"}}>待处理</span>=><span style={{color:"#2C68FF"}}>进行中</span>。 操作人：xxx</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>在 xxx (供应商/对接目标名称)下单失败。</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>用户下单成功(用户下单消耗：<span>¥125.1255</span>)，订单状态变为 <span style={{color:"#FF8D30"}}>待处理</span>。</div>
            </Timeline.Item>
            <Timeline.Item color="#1890FF" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>退款成功，您给用户退款：<span>¥25.1255</span>(退款数量：{10})，xxx给您退款：<span>¥30.1255</span>(退款数量：{10})，售后状态 <span>退款中</span>=><span style={{color:"#74C041"}}>已退款</span>，订单状态 <span style={{color:"#2C68FF"}}>进行中</span>=><span>已结束</span>。</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>用户发起退款申请，售后状态变为 <span>退款中</span>。</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>在 xxx (供应商/对接目标名称)下单成功(您在上级下单消耗：<span>¥120.1255</span>)，订单状态 <span style={{color:"#FF8D30"}}>待处理</span>=><span style={{color:"#2C68FF"}}>进行中</span>。 操作人：xxx</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>在 xxx (供应商/对接目标名称)下单成功(您在上级下单消耗：<span>¥120.1255</span>)，订单状态 <span style={{color:"#FF8D30"}}>待处理</span>=><span style={{color:"#2C68FF"}}>进行中</span>。 操作人：xxx</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>在 xxx (供应商/对接目标名称)下单失败。</div>
            </Timeline.Item>
            <Timeline.Item color="#979BA3" className={c.orderLine}>
              <div className={c.orderLineTime}>2020.01.15 15:01:04</div>
              <div>用户下单成功(用户下单消耗：<span>¥125.1255</span>)，订单状态变为 <span style={{color:"#FF8D30"}}>待处理</span>。</div>
            </Timeline.Item>
          </Timeline>
  )
}

export default OrderRecView
