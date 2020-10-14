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
    default:
      // return transformFetch("DELETE", `/goods/${gid}`);
  }
}

// 订单
export function orders (type, oid, table, body) {
  switch (type) {
    case "get":
      return transformFetch("GET", "/orders", table)
    case "modify":
      return transformFetch("PATCH", `/orders/${oid}`, body);
    default:
      //   return transformFetch("DELETE", `/community-goods-categories/${gid}`);
  }
}
