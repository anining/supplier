import {customizeFetch} from './customizeFetch'
import {transformFetch} from './request'

// 供货商登录
export function login(account, password) {
    return customizeFetch("POST", "/rpc/supplier_login", {account, password})
}

// 修改密码
export function password(old_password, new_password) {
    return customizeFetch("POST", "/rpc/supplier_update_password", {old_password, new_password})
}

// 下单模型
export function paramTemplates(type, pid, table, body) {
    switch (type) {
        case "get":
            return customizeFetch("GET", "/supplier_verbose_supp_ptpls", table)
        case "add":
            return customizeFetch("POST", "/supplier_supp_ptpls", body)
        case "modify":
            return customizeFetch("PATCH", "/supplier_supp_ptpls", body, pid)
        default:
            return customizeFetch("DELETE", "/supplier_supp_ptpls", body)
    }
}

// 商品
export function goods(type, gid, table, body) {
    switch (type) {
        case "get":
            return customizeFetch("GET", "/supplier_verbose_supp_goods", table)
        case "add":
            return customizeFetch("POST", "/supplier_supp_goods", body);
        case "modify":
            return customizeFetch("PATCH", "/supplier_supp_goods", body, gid);
        default:
            return customizeFetch("DELETE", "/supplier_supp_goods", body);
    }
}

// 订单
export function orders(type, oid, table, body) {
    switch (type) {
        case "get":
            return customizeFetch("GET", "/supplier_supp_orders", table)
        case "modify":
            return customizeFetch("PATCH", "/supplier_supp_orders", body, oid)
        default:
            return customizeFetch("DELETE", "/supplier_supp_orders", body)
    }
}

// 获取结算明细
export function getStlDetail() {
    return customizeFetch("GET", "/rpc/supplier_stl", {}, undefined, false)
}

// 申请结算
export function applyStl() {
    return customizeFetch("POST", "/rpc/supplier_req_stl")
}

//////////////////////////////////////////////////////////////////////////////////////////////////

//订单拒绝退款
export function refundReject (id,reason) {
  return transformFetch("PUT", "/rpc/supplier_reject_refund", {reason})
}

// 更新订单
export function updateOrders(oid, body) {
    return transformFetch("PATCH", "/rpc/supplier_update_order", body)
}

//订单同意退款
export function refundAccept (id,amount) {
  return transformFetch("PUT", "/rpc/supplier_accept_refund", {amount})
}

// 获取社区商品统计信息
export function goodsStat () {
	return transformFetch("GET", `/cmnt-goods-stat`);
}
