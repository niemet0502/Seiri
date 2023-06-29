import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const Header = ({ siteTitle }) => (
  <div className="header-container">
    <div className="header">
      <div className="header__child">
        <StaticImage src="../images/white-logo.png" alt="logo" />
        <h2>Seiri</h2>
      </div>
      <div className="header__child">
        <a>How it's built</a>
        <a>Changelog</a>
        <a>Roadmap</a>
      </div>
      <div className="header__child">
        <button className="btn secondary">Start for free</button>
      </div>
    </div>
  </div>
)

export default Header
