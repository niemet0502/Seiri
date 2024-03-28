/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div>
        <main>{children}</main>
        <footer className="main-app-container">
          <div className="main-app">
            <p>
              Built by{" "}
              <a href="#!" target="_blank" rel="noreferrer">
                @mariusniemet
              </a>{" "}
              UI inspirations by{" "}
              <a
                href="https://www.markdx.site/"
                target="_blank"
                rel="noreferrer"
              >
                markdx.
              </a>{" "}
              The source code is available on{" "}
              <a
                href="https://github.com/niemet0502/Seiri"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
