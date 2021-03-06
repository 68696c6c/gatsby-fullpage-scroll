import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const debounce = (fn, delay) => {
  let timer = 0
  return function debouncedFn() {
    let context = this, args = arguments
    if ((timer + delay - Date.now()) < 0) {
      fn.apply(context, args)
      timer = Date.now();
    }
  }
}

const StyledScrollPages = styled('div')`
  height: 100%; 
  position: relative; 
  touch-action: none; 
  transform: translate3d(0px, ${({ offset }) => offset}px, 0px); 
  transition: all ${({ speed }) => speed}ms ease 0s;
`

const StyledScrollPage = styled('div')`
  height: 100vh;
`

export const ScrollPage = ({ children, ...others }) => (
  <StyledScrollPage className="scroll-page" {...others}>{children}</StyledScrollPage>
)

class ScrollPages extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      height: 0,
      offset: 0,
    }

    this.setHeight = this.setHeight.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.pagesRefs = props.children.map(child => {
      return React.createRef()
    })
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.offset !== this.state.offset || nextState.height !== this.state.height
  }

  UNSAFE_componentWillMount() {
    const delay = this.props.speed * 1000
    this.detectScrollDebounced = debounce(function (down) {
      this.handleScroll.apply(this, [down])
    }, delay)
  }

  componentDidMount() {
    this.pagesRefs.forEach(ref => {
      ref.current.addEventListener('wheel', event => {
        const i = parseInt(event.currentTarget.dataset.index)
        if (i === this.state.current) {
          this.detectScrollDebounced(event.deltaY > 0)
        }
      }, false)
    })
    window.addEventListener('resize', this.setHeight)
    this.setHeight()
  }

  setHeight() {
    const height = window.innerHeight
    this.setState(() => ({ height }))
  }

  handleScroll(down) {
    console.log('handle scroll', down)
    let current = this.state.current
    if (down) {
      const n = current + 1
      if (n < this.props.children.length) {
        current = n
      }
    } else {
      const p = current - 1
      if (p >= 0) {
        current = p
      }
    }
    const offset = (current * this.state.height) * -1
    this.setState(() => ({ current, offset }), () => console.log(this.state))
  }

  render() {
    const { children } = this.props
    const speed = this.props.speed * 700
    return (
      <StyledScrollPages
        className="scroll-pages"
        speed={speed}
        offset={this.state.offset}
      >
        {children.map((child, index) => {
          const { children, ...others } = child.props
          return (
            <ScrollPage
              key={index}
              data-index={index}
              innerRef={this.pagesRefs[index]}
              {...others}
            >
              {children}
            </ScrollPage>
          )
        })}
      </StyledScrollPages>
    )
  }
}

ScrollPages.propTypes = {
  speed: PropTypes.number,
}

ScrollPages.defaultProps = {
  speed: 1,
}

export default ScrollPages
