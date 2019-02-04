import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'

import Header from './header'
import './layout.css'

const theme = {
  breakpoints: {
    min: '320px',
    small: '480px',
    medium: '768px',
    large: '992px',
    max: '1200px',
  }
}

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Header sticky={true} breakpoint="small">
            <a href="/">Link 1</a>
            <a href="/page-2">Link 2</a>
            <a href="/">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</a>
            <a href="/page-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</a>
            <a href="/">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</a>
          </Header>
          {children}
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
