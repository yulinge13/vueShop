import React, {
    Component
} from 'react';
import httpLists from '../../utils/http'
let { containHttp } = httpLists
const {
    getProductInfo
} = containHttp
class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        getProductInfo({productId:this.props.location.state.id})
    }
    render(){
        return(
            <div>detail</div>
        )
    }
}

export default ProductDetail