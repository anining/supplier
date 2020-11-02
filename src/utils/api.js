import {transformFetch} from './request'

// 供货商登录
export function login(account, password) {
    return transformFetch("POST", "/login", {account, password})
}

// 修改密码
export function password(old_password, new_password) {
    return transformFetch("PUT", "/password", {old_password, new_password})
}

// 下单模型
export function paramTemplates(type, pid, table, body) {
    switch (type) {
        case "get":
            return transformFetch("GET", "/ptpls", table)
        case "add":
            return transformFetch("POST", "/ptpls", body)
        case "modify":
            return transformFetch("PATCH", `/ptpls/${pid}`, body)
        default:
        // return transformFetch("DELETE", `/ptpls?${body}`)
    }
}

// 商品
export function goods(type, gid, table, body) {
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
export function orders(type, oid, table, body) {
    switch (type) {
        case "get":
            return transformFetch("GET", "/orders", table)
        case "modify":
            return transformFetch("PATCH", `/orders/${oid}`, body);
        case "modifys":
            return transformFetch("PATCH", `/orders?${table}`, body);
        default:
        //   return transformFetch("DELETE", `/community-goods-categories/${gid}`);
    }
}

// 更新订单
export function updateOrders(oid, body) {
    return transformFetch("PATCH", `/orders/${oid}`, body)
}

/*LuoYuKun 2020.11.2*/

// 获取结算明细
export function getStlDetail() {
    return transformFetch("GET", `/stl`)
}

// 申请结算
export function applyStl() {
    return transformFetch("PUT", `/stl`)
}

/*LuoYuKun 2020.11.2*/
