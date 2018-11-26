import React, {
    Component
} from 'react';
export const AddName = function (Comp) {
    return class NewComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                Comp: null,
                name: 'yu'
            }
        }
        componentDidMount() {
            this.setState({
                Comp
            })
        }
        render() {
            const {
                Comp,
                name
            } = this.state
            return ( <
                Comp name = {
                    name
                }
                />
            )
        }
    }
}

export const TestComp = (LoadComponent) => {
    return class AsyncComponent extends Component {

        constructor() {
            super()
            this.state = {
                Child: null
            }
        }

        async componentDidMount() {
            console.log(LoadComponent)
            this.setState({
                Child: LoadComponent
            })
        }

        render() {
            const {
                Child
            } = this.state
            return ( 
                Child?< Child name={'hahahhaha'}/>:<div>11212</div>
            )
        }
    }
}