import React, {
    Component
} from 'react';
import httpLists from '../../utils/http'
import {
    Input,
    Button,
    message
} from 'antd';
import SelectCom from '../../components/selectCom'
import { connect } from 'react-redux';
let { containHttp } = httpLists
const { addUserInfo } = containHttp
@connect(
    state => {
        return {
            token: state.token,
        }
    },
    dispatch => {
        return {
            login: (username, password) => {
                dispatch({ type: 'LOGIN', username, password });
            },
        }
    }
)
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            passWord: null,
            age: null,
            sex: null,
            selectFirstData: [
                {
                    name: '男',
                    id: 1
                },
                {
                    name: '女',
                    id: 2
                }
            ]
        }
    }
    componentDidMount() {
    }
    //输入框
    handleChange(type, value) {
        this.setState({
            [type]: value
        })
    }
    //提交
    handleSubmit() {
        const { name, passWord, age, sex } = this.state
        if (name && passWord) {
            addUserInfo({ name, passWord, age, sex }).then(res => {
                if (res.success) {
                    message.success('注册成功！')
                }
            })
        } else {
            message.error('请填写完整信息')
        }
    }
    onSelectList(val) {
        this.setState({
            sex: val.value
        })
    }
    handleLogin() {
        const { name, passWord } = this.state
        this.props.login(name, passWord)
    }
    render() {
        const {
            name,
            passWord,
            selectFirstData,
            sex,
            age
        } = this.state
        return (
            <div className="user_page">
                <div>
                    <Input
                        placeholder="name"
                        value={name}
                        onChange={e => this.handleChange('name', e.target.value)}
                        style={{ width: '200px' }}
                    />
                    <Input
                        placeholder="password"
                        value={passWord}
                        onChange={e => this.handleChange('passWord', e.target.value)}
                        style={{ width: '200px' }}
                    />
                    <Input
                        placeholder="password"
                        value={age}
                        onChange={e => this.handleChange('age', e.target.value)}
                        style={{ width: '200px' }}
                    />
                    <SelectCom
                        selectLists={selectFirstData}
                        onSelectList={this.onSelectList.bind(this)}
                        value={sex}
                    ></SelectCom>
                    <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Input
                        placeholder="name"
                        value={name}
                        onChange={e => this.handleChange('name', e.target.value)}
                        style={{ width: '200px' }}
                    />
                    <Input
                        placeholder="password"
                        value={passWord}
                        onChange={e => this.handleChange('passWord', e.target.value)}
                        style={{ width: '200px' }}
                    />
                    <Button onClick={this.handleLogin.bind(this)}>Submit</Button>
                </div>
            </div>
        )
    }
}
export default User
