import React, { Component } from 'react';
import { AddName,TestComp } from '../../components/HOC.js'
import { Form } from 'antd';
class HomePage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillReceiveProps() {
    }
    render() {

        return (
            <div className="home_page">
                this home page{this.props.name}
            </div>
        )
    }
}
export default TestComp(HomePage)
