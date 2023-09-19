import React from "react"

import { AiOutlineUser } from "react-icons/ai"
import { FaTasks } from "react-icons/fa"
import { SlNote } from "react-icons/sl"
import { Banner } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      <Banner />

      <div className="main-app-container">
        <div className="main-app">
          <div className="features-title">
            <h1>Features</h1>
            <p>
              Here are some of the features that make MarkDX the most powerful
            </p>

            <div className="flex features-container">
              <div className="features-container__child">
                <div>
                  <FaTasks />
                  <h3>Tasks</h3>
                  <span>
                    You can make basic CRUD operations for tasks, create sub
                    tasks and complete them.
                  </span>
                </div>
              </div>
              <div className="features-container__child">
                <div>
                  <SlNote />
                  <h3>Notes</h3>
                  <span>
                    You can create notes in Markdown and grouped them by
                    project.
                  </span>
                </div>
              </div>
              <div className="features-container__child">
                <div>
                  <AiOutlineUser />
                  <h3>Profil</h3>
                  <span>You can update your information at any time.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="features-title">
            <h1>Full Demo</h1>
            <p>See Seiri in action</p>

            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: " 0",
                width: "100%",
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <iframe
                title="demo"
                src="https://www.loom.com/embed/84a8c93fc24a488bbfe9610248f252ca?sid=ef298e91-7cac-466a-8dae-422fed150dd0"
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
