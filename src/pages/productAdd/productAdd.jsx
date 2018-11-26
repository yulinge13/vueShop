import React, { Component } from 'react';
import {
    Input,
    Button,
    Table,
    Modal,
    Upload,
    Icon,
    message,
    Popconfirm
} from 'antd';
import './product_add.less'
import httpLists from '../../utils/http'
import SelectCom from '../../components/selectCom'
let { containHttp } = httpLists
const {
    getAllProduct,
    getFirstClass,
    getAllClass,
    addProduct,
    removeList
} = containHttp

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class productAddPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: [],
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
                        return (
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Button type="primary" shape="circle" icon="edit" style={{ marginRight: '10px' }} onClick={this.handleClickTableRow.bind(this, columns)} />
                                <Popconfirm title="Are you sure delete this list?" onConfirm={this.removeList.bind(this, columns.id)} onCancel={this.cancelDelete} okText="Yes" cancelText="No">
                                    <Button type="danger" shape="circle" icon="delete" />
                                </Popconfirm>
                            </div>
                        )
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
        }
    }
    componentDidMount() {
        this.getLists()
        this.getFirstClass()
    }
    //取消删除
    cancelDelete(){
        message.error('Click on No');
    }
    //删除
    removeList(id) {
        removeList(id).then(res => {
            if (res.success) {
                this.getLists()
                message.success(res.msg);
            }
        })
    }
    //table 列表的编辑事件
    handleClickTableRow(info) {
        console.log(info)
        let { addListInfo } = this.state
        addListInfo = JSON.parse(JSON.stringify(info))
        this.getSecClass(info.classFirstId, () => {
            this.setState({
                addListInfo,
                modalShow: true
            })
        })
    }
    //获取一级分类
    getFirstClass() {
        getFirstClass().then(res => {
            if (res.success) {
                this.setState({
                    selectFirstData: res.data
                })
            }
        })
    }
    //获取所有的商品
    getLists() {
        const { pageNum, pageSize, keyWord } = this.state
        getAllProduct({ pageNum, pageSize, search: keyWord }).then(res => {
            if (res.success) {
                this.setState({
                    lists: res.data
                })
            }
        })
    }
    //查询值
    getValue(val) {
        let { keyWord } = this.state
        keyWord = val
        this.setState({ keyWord })
    }
    //查询
    handleSearch() {
        this.getLists()
    }
    showModal = () => {
        this.setState({
            modalShow: true,
        });
    }

    hideModal = () => {
        this.setState({
            modalShow: false,
            addListInfo: {}
        });
    }
    //选取一级分类
    onSelectList(row) {
        let { addListInfo } = this.state
        addListInfo.classFirstId = row.value
        this.getSecClass(row.value)
        this.setState({
            addListInfo
        })
    }
    //获取二级分类
    getSecClass(classFirstId, fn) {
        getAllClass({ classFirstId }).then(res => {
            let { data } = res
            data && data.length > 0 && data.forEach(i => {
                i.name = i.secClassName
                i.id = i.classSecId
            });
            if (res.success) {
                this.setState({
                    selectSecData: res.data
                }, () => {
                    fn && fn()
                })
            }
        })
    }
    //选取二级分类
    onSelectListTwo(row) {
        let { addListInfo } = this.state
        addListInfo.classSecId = row.value
        this.setState({
            addListInfo
        })
    }
    //获取input的值
    getInputValue(type, value) {
        let { addListInfo } = this.state
        addListInfo[type] = value
        this.setState({
            addListInfo
        })
    }
    //添加商品
    addProduct() {
        console.log(this.state.addListInfo)
        let { addListInfo } = this.state
        let onOff = true
        for (let key in addListInfo) {
            if (!addListInfo[key]) {
                onOff = false
            }
        }
        if (onOff) {
            addProduct(this.state.addListInfo).then(res => {
                if (res.success) {
                    message.success(res.msg);
                    for (let key in addListInfo) {
                        addListInfo[key] = null
                    }
                    this.setState({
                        addListInfo,
                        modalShow: false
                    })
                    this.getLists()
                }
            })
        } else {
            message.error('请填写完整信息');
        }
    }
    //上传图片
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            let { addListInfo } = this.state
            addListInfo.productPic = info.file.response.url
            this.setState({
                addListInfo,
                loading: false
            })
        }
    }
    render() {
        const {
            columns,
            lists,
            keyWord,
            modalShow,
            selectFirstData,
            selectSecData,
            addListInfo
        } = this.state
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="product_add">
                <div className="header example-input">
                    <div className="btns_left">
                        <Input placeholder="Basic usage" value={keyWord} onChange={e => this.getValue(e.target.value)} />
                        <Button type="primary" onClick={this.handleSearch.bind(this)}>Search</Button>
                    </div>
                    <div className="btns_right">
                        <Button type="primary" onClick={this.showModal}>ADD</Button>
                    </div>
                </div>
                <Table dataSource={lists} columns={columns} />
                <div className="add_modal">
                    <Modal
                        title="Modal"
                        visible={modalShow}
                        onOk={this.addProduct.bind(this)}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                    >
                        <div className="modal_cont">
                            <div className="fill">
                                <div className="fill_name">
                                    一级分类
                                </div>
                                <div className="fill_input">
                                    <SelectCom
                                        selectLists={selectFirstData}
                                        onSelectList={this.onSelectList.bind(this)}
                                        value={addListInfo.classFirstId}
                                    ></SelectCom>
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    二级分类
                                </div>
                                <div className="fill_input">
                                    <SelectCom
                                        selectLists={selectSecData}
                                        onSelectList={this.onSelectListTwo.bind(this)}
                                        value={addListInfo.classSecId}
                                    ></SelectCom>
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    商品名称
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="商品名称"
                                        onChange={e => this.getInputValue('productName', e.target.value)}
                                        value={addListInfo.productName}
                                    />
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    商品价格
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="商品名称"
                                        onChange={e => this.getInputValue('price', e.target.value)}
                                        value={addListInfo.price}
                                    />
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    商品数量
                                </div>
                                <div className="fill_input">
                                    <Input
                                        placeholder="商品名称"
                                        onChange={e => this.getInputValue('productNum', e.target.value)}
                                        value={addListInfo.productNum}
                                    />
                                </div>
                            </div>
                            <div className="fill">
                                <div className="fill_name">
                                    商品图片
                                </div>
                                <div className="fill_input">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="http://localhost:7001/upload"
                                        onChange={this.handleChange}
                                    >
                                        {addListInfo.productPic ? <img
                                            src={'http://localhost:7001' + addListInfo.productPic}
                                            alt="avatar"
                                            style={{
                                                width: '200px',
                                                height: '200px'
                                            }}
                                        /> : uploadButton}
                                    </Upload>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default productAddPage;
