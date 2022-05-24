import Compiler from './src/Compiler.mjs'
import Observer from './src/Observer.mjs'
import defineReactive from './src/defineReactive.mjs'
import proxyData from './src/proxyData.mjs'

export default class MVue {
  constructor(options) {
    this.$options = options
    this.$data = this.$options.data
    this.$set = this.set
    new Observer(this.$data)  // 数据劫持
    proxyData(this, this.$data) // 代理
    new Compiler(this.$options.el, this)  // 编译
  }
  /** 新增属性也要劫持 */
  set(obj, key, value) {
    this.$data[key] = value
    // 数组或对象
    if (value && typeof (value) === "object") {
      new Observer(value)
    } else {
      defineReactive(obj, key, value)
    }
    let newData = {}
    newData[key] = value
    proxyData(this, newData)  // 对新增的属性进行代理
  }
}

