import pkgJson from './package.json'
import { actionMixin } from 'mk-meta-engine'
import './style.less'

const meta = {
    name: 'root',
    component: '::div',
    className: 'a3',
    children: [{
        name: 'txt',
        component: '::div',  //可以使用所有原生html元素，前面加::
        children: '{{data.content}}' //可以绑定state的路径，{{表达式}}
    }, {
        name: 'btn',
        component: '::button',
        children: 'world',
        onClick: '{{$appendWorld}}' //可以调用action中的方法，{{$方法名}}
    }]
}

const state = {
    data: {
        content: 'hello'
    }
}

@actionMixin()
class action {
    constructor(option) {
        this.base = option.base
    }

    onInit = ({ component }) => {
        this.component = component
    }

    componentDidMount = () => {
        console.log('did mount')
    }

    appendWorld = () => {
        //this.base.sf 或 this.base.sfs设置状态，每次设置都会重新render
        //this.base.gf 获取状态
        this.base.sf('data.content', this.base.gf('data.content') + ' world')
    }
}

export default {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
    meta,
    state,
    action
}