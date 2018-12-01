import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import './class.less'
import httpLists from '../../utils/http'
let { containHttp } = httpLists
const { addClass, getAllClass } = containHttp
class ClassPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstClassName: null,//一级分类
            secClassName: null,
            columns: [{
                title: '一级分类',
                dataIndex: 'firstClassName',
            }, {
                title: '二级分类',
                dataIndex: 'secClassName',
            }],
            tableData: [],//表格数据
        }
    }
    componentDidMount() {
        getAllClass().then(res => {
            if (res.success) {
                this.setState({
                    tableData: res.data
                })
            }
        })
    }
    componentWillReceiveProps() {
    }
    getValue(type, val) {
        let { firstClassName, secClassName } = this.state
        if (type === 'firstClassName') {
            firstClassName = val
            this.setState({ firstClassName })
        } else if (type === 'secClassName') {
            secClassName = val
            this.setState({ secClassName })
        }
    }
    handleAddClass() {
        const { firstClassName, secClassName } = this.state
        addClass({ firstClassName, secClassName })
    }
    render() {
        const { firstClassName, secClassName, columns, tableData } = this.state
        return (
            <div className="class_page">
                <div className="header example-input">
                    <Input placeholder="Basic usage" value={firstClassName} onChange={e => this.getValue('firstClassName', e.target.value)} />
                    <Input placeholder="Basic usage" value={secClassName} onChange={e => this.getValue('secClassName', e.target.value)} />
                    <Button type="primary" onClick={this.handleAddClass.bind(this)}>Add</Button>
                </div>
                <Table dataSource={tableData} rowKey="id" columns={columns} />
            </div>
        )
    }
}
export default ClassPage
