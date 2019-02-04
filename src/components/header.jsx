import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
// import { COLOR_VARIANT_NONE, colorVariantCSS, containerStyleHorizontal } from '../utils'
import { withTheme } from 'emotion-theming'

///////
const valueToInt = (cssVal) => {
  return cssVal.replace('px', '').replace('rem', '').replace('em', '').replace('vw', '').replace('vh', '')
}
const containerStyleHorizontal = (breakpoints, fluid = false) => {
  const min = fluid ? 0 : 20
  const max = fluid ? 0 : 50
  const start = valueToInt(breakpoints.small)
  const end = valueToInt(breakpoints.large)
  const multiplier = (max - min) / (end - start) * 100
  const adder = (min * end - max * start) / (end - start)
  const scaledGutters = fluid ? '0px' : `calc(${multiplier}vw + ${adder}px)`
  const maxGutters = fluid ? '0px' : `calc((100% - ${breakpoints.max}) / 2)`
  return css`
    padding-left: ${min}px;
    padding-right: ${min}px;
    @media(min-width: ${breakpoints.medium}) {
      padding-left: ${scaledGutters};
      padding-right: ${scaledGutters};
    }
    @media(min-width: ${breakpoints.large}) {
      padding-left: ${min}px;
      padding-right: ${min}px;
    }
    @media (min-width: ${breakpoints.max}) {
      padding-left: ${maxGutters};
      padding-right: ${maxGutters};
    }
  `
}
///////
const fixedCSS = () => {
  return css`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  `
}
const Styled = styled('header')`
  ${({ fluid, theme }) => containerStyleHorizontal(theme.breakpoints, fluid)};
  ${({ fixed }) => fixed ? fixedCSS() : ''};
  background: orange;
  padding-top: 1em;
  padding-bottom: 1em;
`

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.setHeight = this.setHeight.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleResize = this.handleResize.bind(this)

    this.state = {
      set: false,
      height: 0,
      fixed: false,
      mobile: false,
    }

    this.headerRef = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll')
    window.removeEventListener('resize')
  }

  setHeight() {
    if (this.state.set) {
      return
    }
    const height = this.headerRef.current.offsetHeight
    if (typeof height !== 'undefined') {
      this.setState(() => ({ height, set: true }))
    } else {
      this.setState(() => ({ height: 0, set: false }))
    }
  }

  handleScroll() {
    if (this.props.sticky) {
      if (!this.set) {
        this.setHeight()
      }
      const fixed = window.scrollY > this.state.height
      this.setState(() => ({ fixed }))
    }
  }

  handleResize() {
    const { theme, breakpoint } = this.props
    const minWidth = valueToInt(theme.breakpoints[breakpoint])
    const mobile = window.innerWidth <= minWidth
    this.setState(() => ({ mobile }))
  }

  render() {
    const { fluid, variant, children, ...others } = this.props
    return <Styled innerRef={this.headerRef} fluid={fluid} fixed={this.state.fixed} variant={variant} {...others}>{children}</Styled>
  }
}

Header.propTypes = {
  fluid: PropTypes.bool,
  sticky: PropTypes.bool,
  // variant: PropTypes.oneOf([
  //   'primary',
  //   'secondary',
  //   'tertiary',
  //   'light',
  //   'neutral',
  //   'dark',
  //   'success',
  //   'info',
  //   'warning',
  //   'danger',
  //   'background',
  //   COLOR_VARIANT_NONE,
  // ]),
}

Header.defaultProps = {
  fluid: false,
  sticky: false,
  // variant: COLOR_VARIANT_NONE,
}

export default withTheme(Header)
