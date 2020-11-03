import {h} from './history'
import * as R from 'kefir.ramda'
import {message} from "antd"
import {JUMP_DELAY} from './config'

function saveSuccess(jump = true, path, state) {
  const history = h.get()
  message.success("操作成功")
  if (jump) {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (path) {
        history.push(path, state)
      } else {
        history.goBack();
      }
    }, JUMP_DELAY)
  }
}

function push(path, state) {
  const history = h.get()
  history.push(path, state)
}

function goBack() {
  const history = h.get()
  history.goBack();
}

function transformTime(old_time) {
  return `${old_time.slice(0, 10)} ${old_time.slice(11, 19)}`
}

function getKey(k, ks) {
  if (!R.has(k)(ks)) {
    k = R.keys(ks)[0]
  }
  return R.prop(k)(ks)
}

//html剔除富文本标签，留下纯文本
function getSimpleText(html) {
  var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  var msg = html.replace(re1, ''); //执行替换成空字符
  return msg;
}

function formatMoney(money) {
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function regexNumber (e, float) {
  const regex = /[^\d]/g
  const floatRegex = /[^\d.]/g

  if (float) {
    return e.replace(floatRegex, "")
  }
  return e.replace(regex, "")
}

function dateFormat(date, format) {
  date = new Date(date);
  var o = {
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'H+': date.getHours(), //hour+8小时
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    'S': date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
}

function _if(value, callback, elseCallBack) {
  try {
    if (value && typeof callback === 'function') {
      return callback(value);
    } else {
      if (elseCallBack && typeof elseCallBack === 'function') {
        return elseCallBack();
      }
    }
  } catch (e) {
    return null;
  }
}

function getPath(path, obj, defaultValue) {
  try {
    let ret = obj;
    path.forEach((keyName) => {
      ret = ret[keyName];
    });
    if (ret || typeof ret === 'number') {
      return ret;
    } else {
      return defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
}

function _toFixed(number, num = 2) {
  try {
    return Number(number).toFixed(num)
  } catch (e) {
    return 0
  }
}

export { _toFixed, getPath, regexNumber, formatMoney, dateFormat, getSimpleText, getKey, saveSuccess, transformTime, goBack, push }
