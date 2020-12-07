import {parseDomain} from "./util";

const DEVELOPER = "Production"
// const API_URL = DEVELOPER === "Production" ? `${protocol}://${host}/supp` : "https://test-omnivstore.prismslight.com/supp"
// const API_URL = DEVELOPER === "Production" ? "http://api.panrb168.top/supp" : "https://test-omnivstore.prismslight.com/supp"
// const API_URL = DEVELOPER === "Test" ? "https://beta-omnivstore.prismslight.com/supp" : "https://test-omnivstore.prismslight.com/supp"
// const API_URL = DEVELOPER === "Test" ? "https://beta-omnivstore.prismslight.com/supp" : "http://192.168.1.36:8000/supp"
// const LOCAL_URL = 'https://test-omnivstore.prismslight.com/supp';// 本地测试地址
// const HOST = window.location.host.includes('localhost:') ? LOCAL_URL : parseDomain(window.location.host);
// const API_URL = `http://api.${HOST}/supp`;
const API_URL = "http://192.168.1.36:3000";
const JUMP_DELAY = 500
const MODULES = {
  toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],

        // [{ 'header': 1 }, { 'header': 2 }], // custom button values
        // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        // [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        // [{ 'direction': 'rtl' }], // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        // [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        // [{ 'font': [] }],
        // [{ 'align': [] }],

        // ['clean'] // remove formatting button
    ]
}
const PERMISSIONS = {
  orderlog: "订单记录",
  citecfg: "站点管理",
  usermng: "用户管理",
  capitalflow: "资金流水",
  valueaddedsrv: "增值服务",
  tagmng: '标签管理',
  statistics: '统计信息',
  subcitemng: '分站管理',
  commbiz: '社区业务',
  cardbiz: '卡密业务'
}
const REFUND_STATUS = {
  "-": {
		status: "default",
    text: '-',
  },
  refunding: {
		status: "processing",
    color: "#458BFF",
    text: '退款中',
  },
  refunded: {
		status: "success",
    text: '已退款',
  },
  rejected: {
		status: "error",
    text: '已拒绝',
  },
}
const ORDER_STATUS = {
  closed: {
		status: "error",
    text: '已终止',
  },
  completed: {
		status: "success",
    text: '已完成',
  },
  processing: {
		status: "processing",
    text: '进行中',
  },
  pending: {
		status: "warning",
    text: '待处理',
  }
}
const PLACE_ORDER_STATUS = {
	unavailable: {
		status: "error",
		text: '关闭下单',
	},
	available: {
		status: "default",
		text: '正常下单',
	},
	paused: {
		status: "default",
		text: '暂停下单',
	}
}
const CONTACTS = {
  "goods": "https://easydoc.xyz/s/85631950/b7F85hU0/rYdfh1bo",
  "order-model": "https://easydoc.xyz/s/85631950/b7F85hU0/WnnMKxt4",
  "order-manage": "https://easydoc.xyz/s/85631950/b7F85hU0/9vcOyNU6"
}
const SCROLL = {x:"120%"}
export { CONTACTS, PLACE_ORDER_STATUS, SCROLL, REFUND_STATUS, API_URL,ORDER_STATUS, PERMISSIONS, DEVELOPER, JUMP_DELAY, MODULES }
