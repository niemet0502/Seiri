import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { AiFillGithub, AiOutlineStar } from "react-icons/ai"

const Header = ({ siteTitle }) => {
  const [star, setStar] = React.useState(0)

  React.useEffect(() => {
    async function getStar() {
      const repo = await fetch("https://api.github.com/repos/niemet0502/seiri")

      return repo.json()
    }

    getStar()
      .then(data => {
        setStar(data.stargazers_count)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="header-container">
      <div className="github-banner">
        <span>
          Give us a star on GitHub <AiFillGithub />
        </span>
        <a href="https://github.com/niemet0502/Seiri" target="_blank">
          <button>
            <AiOutlineStar /> <span>{star}</span>
          </button>
        </a>
      </div>
      <div className="header">
        <div className="header__child">
          <Link to="/">
            <StaticImage src="../images/white-logo.png" alt="logo" />
            <h2>Seiri</h2>
          </Link>
        </div>
        <div className="header__child">
          <a>How it's built</a>
          <Link to="/changelog">Changelog</Link>
          <Link to="/roadmap">Roadmap</Link>
        </div>
        <div className="header__child">
          <button className="btn secondary">Start for free</button>
        </div>
      </div>
    </div>
  )
}

export default Header
