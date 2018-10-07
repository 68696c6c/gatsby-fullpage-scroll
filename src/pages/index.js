import React from 'react'

import Layout from '../components/layout'
import ScrollPages, { ScrollPage } from '../components/scroll-pages'

const IndexPage = () => (
  <Layout>
    <ScrollPages>
      <ScrollPage>
        <div style={{ height: '100%', background: 'orange', color: 'white', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 1</h1>
        </div>
      </ScrollPage>
      <ScrollPage>
        <div style={{ height: '100%', background: 'black', color: 'white', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 2</h1>
        </div>
      </ScrollPage>
      <ScrollPage>
        <div style={{ height: '100%', background: 'lime', color: 'white', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 3</h1>
        </div>
      </ScrollPage>
      <ScrollPage>
        <div style={{ height: '100%', background: 'indianred', color: 'white', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 4</h1>
        </div>
      </ScrollPage>
      <ScrollPage>
        <div style={{ height: '100%', background: 'dodgerblue', color: 'white', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 5</h1>
        </div>
      </ScrollPage>
      <ScrollPage>
        <div style={{ height: '100%', background: 'rebeccapurple', color: 'white', padding: '1rem', boxSizing: 'border-box' }}>
          <h1>Page 6</h1>
        </div>
      </ScrollPage>
    </ScrollPages>
  </Layout>
)

export default IndexPage
