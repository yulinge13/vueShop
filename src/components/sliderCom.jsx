import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import httpLists from '../utils/http'
import history from '../history';
import './common.less'
let { containHttp } = httpLists
const { getMenuLists } = containHttp
const SubMenu = Menu.SubMenu;
class SliderCom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            menuLists: []
        }
    }
    componentDidMount() {
        this.getMenuData()
    }
    //获取菜单
    getMenuData() {
        getMenuLists().then(res => {
            if (res.success) {
                this.setState({
                    menuLists: res.data
                })
            }
        })
    }
    render() {
        const { menuLists } = this.state
        return (
            <div className="slider">
                <Menu
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {
                        menuLists.map((i, index) => (
                            <Menu.Item key={index}>
                                <Link to={i.firstUrl}>
                                    <Icon type="pie-chart" />
                                    <span>{i.firstMenu}</span>
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        )
    }
}
export default SliderCom