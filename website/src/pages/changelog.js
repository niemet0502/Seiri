import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Changelog = () => {
  return (
    <Layout>
      <Seo title="Changelog" />
      <div className="main-app-container">
        <div className="main-app">
          <div className="banner">
            <h1>What's New?</h1>
            <p className="banner__p">New updates and improvements to Seiri.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Changelog
