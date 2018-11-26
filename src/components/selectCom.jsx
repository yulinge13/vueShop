import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;
class SelectCom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: [],//数据
            selectValue:null
        }
    }
    componentDidMount() {
        this.setState({
            lists: this.props.selectLists || []
        })
    }
    componentWillReceiveProps(newProps) {
        const { selectLists ,value} = this.props
        if (selectLists !== newProps.selectLists) {
            this.setState({
                lists: newProps.selectLists
            })
        }
        if(value!== newProps.value){
            this.setState({
                selectValue: newProps.value
            })
        }
    }
    //选取
    selectRow(value, key) {
        this.props.onSelectList(key.props)
    }
    render() {
        const { lists ,selectValue} = this.state
        return (
            <div className="select_com">
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    value={selectValue}
                    onSelect={this.selectRow.bind(this)}
                >
                    {
                        lists && lists.length > 0 && lists.map((i, index) => {
                            return (
                                <Option value={i.id} key={index}>{i.name}</Option>
                            )
                        })
                    }
                </Select>
            </div>
        );
    }
}

export default SelectCom;
