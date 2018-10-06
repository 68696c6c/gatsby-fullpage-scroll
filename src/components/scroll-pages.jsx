import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this, args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const StyledScrollPages = styled('div')`
  height: 100%; 
  position: relative; 
  touch-action: none; 
  transform: translate3d(0px, ${({ offset }) => offset}px, 0px); 
  transition: all 700ms ease 0s;
`
const StyledScrollPage = styled('div')`
  height: 100vh;
`

export const ScrollPage = ({ children }) => (
  <StyledScrollPage className="scroll-page">{children}</StyledScrollPage>
)

class ScrollPages extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      height: 0,
      lastY: 0,
      interval: 0,
      pages: props.children.length,
      end: 0,
      offset: 0,
    }

    this.setHeight = this.setHeight.bind(this)
    this.scrollToPage = this.scrollToPage.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.pagesRef = React.createRef()
  }

  componentWillMount() {
    this.handleScrollDebounced = debounce(function () {
      this.handleScroll.apply(this)
    }, 300)
  }

  componentDidMount() {
    console.log('did mount')
    window.addEventListener('scroll', () => this.handleScrollDebounced())
    window.addEventListener('resize', event => {
      this.setHeight()
    })
    this.setHeight()
  }

  setHeight() {
    const height = window.innerHeight
    const interval = (height / this.props.speed) / 100
    const end = interval * this.state.pages
    this.setState(() => ({ height, interval, end }), () => console.log('set height state', this.state))
  }

  scrollToPage(page) {

  }

  handleScroll(event) {
    console.log('------------')
    const y = window.pageYOffset || document.documentElement.scrollTop
    console.log('%c Y', 'color: inherit', y, this.state.end)
    const scrollY = y
    // console.log('%c scrollY', 'color: inherit', scrollY)
    let current = this.state.current
    if (scrollY > this.state.lastY) {
      const next = this.state.interval * (current + 1)
      if (scrollY > next) {
        const n = current + 1
        if (n < this.props.children.length) {
          console.log('%c next', 'color: lime')
          current = n
        }
      }
    } else {
      const previous = this.state.interval * (current + 1)
      if (scrollY < previous) {
        const p = current - 1
        if (p >= 0) {
          console.log('%c previous', 'color: yellow')
          current = p
        }
      }
    }

    if (y > this.state.end) {
      // event.preventDefault()
      const offset = (this.state.height - y) * -1
      console.log('%c END offset', 'color: orange', offset)
      this.setState(() => ({
        lastY: y,
        offset,
      }))
    } else {
      const offset = (current * this.state.height) * -1
      this.setState(() => ({
        lastY: y,
        current,
        offset,
      }))
    }
  }

  render() {
    const { children } = this.props
    return (
      <StyledScrollPages innerRef={this.pagesRef} className="scroll-pages" offset={this.state.offset}>
        {children}
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
