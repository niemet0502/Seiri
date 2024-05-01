import { StaticImage } from "gatsby-plugin-image"
import React, { useState } from "react"

export const Banner = () => {
  const [img, setImg] = useState(false)
  return (
    <div className="banner">
      <h1 className="banner_title">
        Manage your tasks and notes in the same place.
      </h1>

      <div className="flex gap-1">
        <button className="btn primary" onClick={() => setImg(prev => !prev)}>
          Streamline tasks
        </button>
        <button className="btn secondary" onClick={() => setImg(prev => !prev)}>
          Elevate notes
        </button>
      </div>

      {!img && (
        <StaticImage
          src="../images/app-demo.png"
          className="app-demo-img"
          alt="demo-app"
        />
      )}

      {img && (
        <StaticImage
          src="../images/app-demo-tasks.png"
          className="app-demo-img"
          alt="demo-app-tasks"
        />
      )}
    </div>
  )
}
