import React, { Component } from 'react';
import {
    Button,
    message,
    Input 
} from 'antd';
import './orderDetail.less'
import httpLists from '../../utils/http'
let { containHttp } = httpLists
const { TextArea } = Input;
const {
    orderInfo,
    getOrder,
    comments
} = containHttp
function getTime(time) {
    const date = new Date(time - 0)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const str = `${year}年${month}月${day}日 ${h}:${m}:${s}`
    return str
}
export default class OrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.id,
            orderInfo: {},//订单详情
            commentValue:'',//评论
        }
    }
    componentWillMount() {
        console.log(this.props)
        this.orderInfo()
    }
    //获取订单详情
    orderInfo() {
        const { id } = this.state
        orderInfo({ orderId: id }).then(res => {
            if (res.success) {
                res.data.creatTime = getTime(res.data.creatTime)
                this.setState({
                    orderInfo: res.data
                })
            }
        })
    }
    //获取订单状态对应的状态
    getOrderStatus(orderStatus = 0) {
        const enumStatus = {
            0: '刚下订单', //刚下订单
            1: '待支付', //待支付
            2: '待发货', //已完成支付 待发货
            3: '已发货', //已完成支付 已发货
            4: '已收货', //已完成支付 已收货
            5: '待评价', //待评价
            6: '已评价', //已评价
        }
        return enumStatus[orderStatus]
    }
    //收货
    getOrder(){
        const { id } = this.state
        getOrder({ orderId: id }).then(res => {
            if (res.success) {
                message.success(res.msg)
                this.orderInfo()
            }else{
                message.error(res.msg)
            }
        })
    }
    //发表评论
    sentComment(){
        const {
            commentValue,
            orderInfo
        } = this.state
        comments({
            content:commentValue,
            orderId:orderInfo.orderId
        }).then(res => {
            if(res.success){
                message.success(res.msg)
            }else{
                message.error(res.msg)
            }
        })
    }
    //评论框的内容
    changeComment(val){
        this.setState({
            commentValue:val
        })
    }
    render() {
        const { 
            orderInfo,
            commentValue 
        } = this.state
        const {
            productName,
            orderNo,
            price,
            creatTime,
            orderStatus
        } = orderInfo
        return (
            <div className="order_detail">
                <div className="fill_info">
                    <div className="fill_name">订单NO.</div>
                    <div className="fille_val">{orderNo}</div>
                </div>
                <div className="fill_info">
                    <div className="fill_name">商品名称</div>
                    <div className="fille_val">{productName}</div>
                </div>
                <div className="fill_info">
                    <div className="fill_name">商品价格</div>
                    <div className="fille_val">{price}￥</div>
                </div>
                <div className="fill_info">
                    <div className="fill_name">订单时间</div>
                    <div className="fille_val">{creatTime}</div>
                </div>
                <div className="fill_info">
                    <div className="fill_name">订单状态</div>
                    <div className="fille_val">{orderStatus && this.getOrderStatus(orderStatus)}</div>
                </div>
                <div className="btns">
                    <Button onClick={this.getOrder.bind(this)}>确认收货</Button>
                </div>
                <div className="comment">
                    <TextArea value={commentValue} onChange={e => this.changeComment(e.target.value)} placeholder="Autosize height based on content lines" autosize />
                    <Button onClick={this.sentComment.bind(this)}>发表评论</Button>
                </div>
            </div>
        )
    }
}