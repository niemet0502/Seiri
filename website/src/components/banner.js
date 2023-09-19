import { StaticImage } from "gatsby-plugin-image"
import React, { useState } from "react"

export const Banner = () => {
  const [img, setImg] = useState(false)
  return (
    <div className="banner">
      <h1 className="banner_title">
        Manage your tasks and notes at the same place for free
      </h1>

      <p className="banner__p">
        A note and todo taking app that does not break your workflow by
        switching between multiple apps.
      </p>

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
