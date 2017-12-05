import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { translate3d } from './utils'
import './style.css'

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = { initialPosition: { x: 0, y: 0 } }
    this.setInitialPosition = this.setInitialPosition.bind(this)
  }
  setInitialPosition () {
    const card = ReactDOM.findDOMNode(this)
    const initialPosition = {
      x: Math.round((this.props.containerSize.x - card.offsetWidth) / 2),
      y: Math.round((this.props.containerSize.y - card.offsetHeight) / 2)
    }
    this.setState({ initialPosition })
  }

  componentDidMount () {
    this.setInitialPosition()
    window.addEventListener('resize', this.setInitialPosition)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setInitialPosition)
  }

  render () {
    const { initialPosition, initialPosition: { x, y } } = this.state
    const { className = 'inactive', beingSwiped, swipeDirection } = this.props
    var style = {
      ...translate3d(x, y, beingSwiped, initialPosition),
      zIndex: this.props.index,
      ...this.props.style
    }

    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        swipeDirection: swipeDirection
      });
    });

    return (
      <div style={style} className={`card ${className}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Card
