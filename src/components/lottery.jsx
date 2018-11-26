import React, { Component } from 'react';
class Lottery extends Component {
    constructor(props) {
        super(props)
        this.canvas = React.createRef()
        this.state = {
            content: null,
            awards: [
                { level: '特等奖', name: '我的亲笔签名', color: '#576c0a' },
                { level: '未中奖', name: '未中奖', color: '#ad4411' },
                { level: '一等奖', name: '玛莎拉蒂超级经典限量跑车', color: '#43ed04' },
                { level: '未中奖', name: '未中奖', color: '#d5ed1d' },
                { level: '二等奖', name: '辣条一包', color: '#32acc6' },
                { level: '未中奖', name: '未中奖', color: '#e06510' },
            ]
        }
    }
    componentDidMount() {
        console.log(this.canvas.current)
        const canvas = this.canvas.current
        const content = canvas.getContext('2d')
        canvas.width = 300
        canvas.height = 300
        this.setState({
            content
        }, () => {
            this.drawArc()
            this.drawPrizeBlock()
        })
    }
    drawArc() {
        const { content } = this.state
        content.beginPath()
        content.fillStyle = '#FD6961'
        content.arc(150, 150, 150, 0, Math.PI * 2, false)
        content.fill();
        // content.save()
        // content.stroke();
    }
    drawPrizeBlock() {
        const { content ,awards} = this.state
        // 第一个奖品色块开始绘制时开始的弧度及结束的弧度,因为我们这里
        // 暂时固定设置为6个奖品,所以以6为基数
        let startRadian = 0, RadianGap = Math.PI * 2 / awards.length, endRadian = startRadian + RadianGap
        for (let i = 0; i < awards.length; i++) {
            // content.save()
            content.beginPath()
            // 为了区分不同的色块,我们使用随机生成的颜色作为色块的填充色
            content.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16)
            // 这里需要使用moveTo方法将初始位置定位在圆点处,这样绘制的圆
            // 弧都会以圆点作为闭合点,下面有使用moveTo和不使用moveTo的对比图
            content.moveTo(150, 150)
            // 画圆弧时,每次都会自动调用moveTo,将画笔移动到圆弧的起点,半
            // 径我们设置的比转盘稍小一点
            content.arc(150, 150, 140, startRadian, endRadian, false)
            // 每个奖品色块绘制完后,下个奖品的弧度会递增
            startRadian += RadianGap
            endRadian += RadianGap
            content.fill()
            // content.restore()
        }
    }
    render() {
        return (
            <div className="lottery">
                <canvas
                    ref={this.canvas}
                    style={{
                        width: '300px',
                        height: '300px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        margin: 'auto'
                    }}
                ></canvas>
            </div>
        )
    }
}
export default Lottery