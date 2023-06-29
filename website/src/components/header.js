import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const Header = ({ siteTitle }) => (
  <div className="header-container">
    <div className="header">
      <div className="header__child">
        <Link to="/">
          <StaticImage src="../images/white-logo.png" alt="logo" />
          <h2>Seiri</h2>
        </Link>
      </div>
      <div className="header__child">
        <a>How it's built</a>
        <a>Changelog</a>
        <Link to="/roadmap">Roadmap</Link>
      </div>
      <div className="header__child">
        <button className="btn secondary">Start for free</button>
      </div>
    </div>
  </div>
)

export default Header
