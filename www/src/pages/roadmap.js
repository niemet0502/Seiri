import React from "react"
import { BsCheckLg } from "react-icons/bs"
import Layout from "../components/layout"
import Seo from "../components/seo"

const backlog = [
  {
    title: "Move Task and Note to project",
    description: "Being able to move a task from a project to another",
  },
  {
    title: "Create multiple tasks at once",
    description:
      "Being able to create multiple tasks without opening the modal each time",
  },
  {
    title: "Frontend app",
    description: "Moving the frontend app from create-react-app to vite",
  },
]

const shipped = [
  {
    title: "Projects handling",
    description: "Classic CRUD operations for projects",
  },
  {
    title: "Notes handling",
    description: "Classic CRUD operations for notes",
  },
  {
    title: "Tasks handling",
    description: "Classic CRUD operations for tasks",
  },
  {
    title: "Containerize the app",
    description: "The app is fully containerize with docker",
  },
  {
    title: "Archive projects",
    description: "Archive projects",
  },
]

const progress = [
  {
    title: "Frontend app",
    description: "Code refactoring",
  },
]
const Roadmap = () => {
  return (
    <Layout>
      <Seo title="Roadmap" />
      <div className="banner">
        <h1 className="">Check out our main roadmap</h1>
        <p className="banner__p">keep abreast of upcoming features</p>
      </div>

      <div className="main-app-container">
        <div className="main-app">
          <div className="roadmap-container">
            <div className="tasks-stage">
              <h2>Backlog</h2>
              <div className="">
                {backlog.map(task => (
                  <div className="flex tasks">
                    <div className="tasks__icon">
                      <BsCheckLg />
                    </div>
                    <div className="tasks__content">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tasks-stage">
              <h2>In Progress</h2>
              <div className="">
                {progress.map(task => (
                  <div className="flex tasks">
                    <div className="tasks__icon">
                      <BsCheckLg />
                    </div>
                    <div className="tasks__content">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tasks-stage">
              <h2>Shipped</h2>
              <div className="">
                {shipped.map(task => (
                  <div className="flex tasks">
                    <div className="tasks__icon">
                      <BsCheckLg />
                    </div>
                    <div className="tasks__content">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Roadmap
