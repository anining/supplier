const DEVELOPER = "Production"
const API_URL = DEVELOPER === "Production" ? "https://test-omnivstore.prismslight.com/supp" : "http://192.168.1.36:8000/supp"
const JUMP_DELAY = 500
const MODULES = {
  toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],

        [{ 'header': 1 }, { 'header': 2 }], // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        [{ 'direction': 'rtl' }], // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'] // remove formatting button
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

const ORDER_STATUS = {
  closed: {
    color: "#FF5F5F",
    text: '已终止',
  },
  completed: {
    color: "#61BD60",
    text: '已完成',
  },
  processing: {
    color: "#458BFF",
    text: '进行中',
  },
  pending: {
    color: "#FF7600",
    text: '待处理',
  },
}
export { API_URL,ORDER_STATUS, PERMISSIONS, DEVELOPER, JUMP_DELAY, MODULES }
