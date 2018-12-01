import React, { Component } from 'react';
import {
    Button,
    Table,
    Select,
    message,
    Form
} from 'antd';
import '../productAdd/product_add.less'
import httpLists from '../../utils/http'
import {connect} from 'react-redux'
const Option = Select.Option;
let { containHttp } = httpLists
const {
    addOrder,
    getOrderLists,
    getAllProduct,
    orderPay
} = containHttp
@connect(
    state => {
        return {
        }
    },
    dispatch => {
        return {

        }
    }
)
class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productlists: [],//所有的商品
            keyWord: '',
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'productName',
                    key: 'productName',
                },
                {
                    title: '商品价格',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '商品图片',
                    dataIndex: 'productPic',
                    key: 'productPic',
                    render: (row) => {
                        return (
                            row ? <img
                                src={'http://localhost:7001' + row}
                                alt="avatar"
                                style={{
                                    width: '50px',
                                    height: '50px'
                                }}
                            /> : '暂无图片'
                        )
                    }
                },
                {
                    title: '商品数量',
                    dataIndex: 'productNum',
                    key: 'productNum',
                },
                {
                    title: '操作',
                    dataIndex: 'opaction',
                    render: (row, columns) => {
                        return columns.orderStatus < 2 ?
                            (<div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Button type="primary" shape="circle" icon="shopping" style={{ marginRight: '10px' }} onClick={this.pay.bind(this, columns)} />
                            </div>) : (<div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Button type="primary" shape="circle" icon="book" style={{ marginRight: '10px' }} onClick={this.selectRowInfo.bind(this, columns)} />
                            </div>)

                    }
                }
            ],
            pageNum: 1,
            pageSize: 10,
            modalShow: false,
            selectFirstData: [],//一级分类的数据
            addListInfo: {
                productName: null,
                price: null,
                productPic: null,
                productNum: null,
                classFirstId: null,
                classSecId: null
            },//添加的商品的信息
            selectSecData: [],//二级分类的数据
            loading: false,//上传图片的loading效果
            productId: null,//商品信息ID
            orderLists: [],//所有的订单
        }
    }
    componentDidMount() {
        this.getLists()
        this.getAllProduct()
    }
    //支付
    pay(row) {
        orderPay({
            orderId: row.orderId
        }).then(res => {
            if (res.success) {
                message.success(res.msg)
                this.getLists()
            }
        })
    }
    //获取所有的商品
    getAllProduct() {
        getAllProduct({ pageNum: 1, pageSize: 1000 }).then(res => {
            if (res.success) {
                this.setState({
                    productlists: res.data
                })
            }
        })
    }
    //获取所有的订单
    getLists() {
        const { pageNum, pageSize, keyWord } = this.state
        getOrderLists({ pageNum, pageSize }).then(res => {
            if (res.success) {
                this.setState({
                    orderLists: res.data
                })
            }
        })
    }
    //添加订单
    addOrder() {
        const { productId } = this.state
        addOrder({
            productId
        }).then(res => {
            if (res.success) {
                message.success(res.msg)
                this.getLists()
            }
        })
    }
    //获取商品
    selectRow(val) {
        this.setState({
            productId: val
        })
    }
    //查看订单详情
    selectRowInfo(row){
        this.props.history.push({
            pathname:'/orderDetail',
            state:{
                id:row.orderId
            }
        })
    }
    render() {
        const {
            columns,
            orderLists,
            productlists,
            productId
        } = this.state
        return (
            <div className="product_add">
                <div className="header example-input">
                    <div className="btns_left">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            // optionFilterProp="children"
                            value={productId}
                            onSelect={this.selectRow.bind(this)}
                        >
                            {
                                productlists && productlists.length > 0 && productlists.map((i, index) => {
                                    return (
                                        <Option value={i.id} key={index}>{i.productName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="btns_right">
                        <Button type="primary" onClick={this.addOrder.bind(this)}>ADD Order</Button>
                    </div>
                </div>
                <Table dataSource={orderLists} columns={columns}/>
            </div>
        );
    }
}

export default Order;
