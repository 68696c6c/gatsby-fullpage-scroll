import React from 'react'

import Layout from '../components/layout'
import ScrollPages, { ScrollPage } from '../components/scroll-pages'

const IndexPage = () => (
  <Layout>
    <ScrollPages>
      <ScrollPage>
        <div style={{ height: '100%', background: 'orange', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 1</h1>
          <p>Welcome to your new Gatsby site.</p>
        </div>
      </ScrollPage>
      <ScrollPage>
        <div style={{ height: '100%', background: 'red', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 2</h1>
          <p>Now go build something great.</p>
        </div>
      </ScrollPage>
    </ScrollPages>
  </Layout>
)

export default IndexPage
