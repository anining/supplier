import { transformFetch } from './request'

// 供货商登录
export function login (account, password) {
  return transformFetch("POST", "/login", { account, password })
}

// 修改密码
export function password (old_password, new_password) {
  return transformFetch("PUT", "/password", { old_password, new_password })
}

// 下单模型
export function paramTemplates (type, pid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/param-templates", table)
    case "add":
      return transformFetch("POST", "/param-templates", body)
    case "modify":
      return transformFetch("PATCH", `/param-templates/${pid}`, body)
    default:
      return transformFetch("DELETE", `/param-templates/${pid}`)
  }
}

// 商品
export function goods (type, gid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/goods", table)
    case "add":
      return transformFetch("POST", "/goods", body);
      // case "modify":
      //   return transformFetch("PATCH", `/community-goods-categories/${gid}`, body);
      // default:
      //   return transformFetch("DELETE", `/community-goods-categories/${gid}`);
  }
}

// 获取订单列表
export function orders (page, size, order_id, goods_name, status, refund_status, start_from, end_with) {
  let data = { page, size }
  if (order_id) {
    data = { ...data, ...{ order_id } }
  }
  if (goods_name) {
    data = { ...data, ...{ goods_name } }
  }
  if (status) {
    data = { ...data, ...{ status } }
  }
  if (refund_status) {
    data = { ...data, ...{ refund_status } }
  }
  if (start_from) {
    data = { ...data, ...{ start_from } }
  }
  if (end_with) {
    data = { ...data, ...{ end_with } }
  }
  return transformFetch("GET", "/orders", data)
}
