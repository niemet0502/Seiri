import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Changelog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          html
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            description
          }
        }
      }
    }
  `)

  // Access the queried data
  const markdownNodes = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <Seo title="Changelog" />
      <div className="main-app-container">
        <div className="main-app">
          <div className="banner">
            <h1>What's New?</h1>
            <p className="banner__p">
              Behind the Grid - New updates and improvements to Seiri.
            </p>
          </div>

          <div className="changelog-container">
            {markdownNodes.map(changelog => (
              <div className="changelog" key={changelog.frontmatter.title}>
                <div className="changelog__date">
                  <span>{changelog.frontmatter.date}</span>
                </div>
                <div className="changelog__content">
                  <h1>{changelog.frontmatter.title}</h1>

                  <div dangerouslySetInnerHTML={{ __html: changelog.html }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Changelog
