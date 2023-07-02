import React from "react"
import { AiFillCheckCircle } from "react-icons/ai"
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
    title: "Archive projects",
    description: "Archive projects and hide them",
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
]

const progress = [""]
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
          <div className="main-app__status">
            <span>Backlog</span>
            <div className="main-app__tasks-list">
              <ul>
                {backlog.map(task => (
                  <div className="flex">
                    <div className="main-app__tasks-list__progress-bar">
                      <AiFillCheckCircle />
                      {/* <div></div> */}
                    </div>
                    <div className="ta">
                      <h5>{task.title}</h5>
                      <p>{task.description}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="main-app__status">
            <span>In Progress</span>
            <div className="main-app__tasks-list">
              {progress.map(task => (
                <div className="flex">
                  <div className="main-app__tasks-list__progress-bar">
                    <AiFillCheckCircle />
                    {/* <div></div> */}
                  </div>
                  <div className="ta">
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="main-app__status">
            <span>Shipped</span>
            <div className="main-app__tasks-list">
              {shipped.map(task => (
                <div className="flex">
                  <div className="main-app__tasks-list__progress-bar">
                    <AiFillCheckCircle />
                    {/* <div></div> */}
                  </div>
                  <div>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Roadmap
