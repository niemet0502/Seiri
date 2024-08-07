<br />
<h4 align="center">
  <a href="https://excalidraw.com">Landing page</a> |
  <a href="https://blog.excalidraw.com">Roadmap</a> |
  <a href="https://https://mariusniemet.me/building-seiri-my-tasks-notes-app/">How it's built</a> |
</h4>

<div align="center">
  <h2>
    An open source Notes/Tasks Taking app. </br>
  <br />
  </h2>
</div>

<div align="center">
  <figure>
    <a href="https://excalidraw.com" target="_blank" rel="noopener">
      <img src="./assets/preview.png" alt="Product showcase" />
    </a>
    <figcaption>
      <br />
      <p align="center">
        Manage your tasks and notes at the same place for free.
      </p>
    </figcaption>
  </figure>
</div>

## Overview
Seiri is a lightweight Tasks/Notes taking app. The idea is to don't have any fancy features just the minimum you need to keep your daily tasks and notes within the same app and for free. 

## 🚨Warning 🚨
I built Seiri primarly for myself. I use it on a daily basis for my own needs if you trust me enough you can use the version hosted on my server but if you don't (what i can clearly understand) you can self-host the project on your own infrastructure.

Seiri allows you to organize your tasks and notes by project and provide a [Markdown](https://en.wikipedia.org/wiki/Markdown) editor.

## Features

- **Project management:** Allow users to add, edit, and delete projects. Project are used to organize tasks or notes. 

- **Tasks management:** Allow users to add, edit, and delete tasks from their project. Include features for completing tasks. 

- **Notes management:** Allow users to add, edit, and delete notes from their project. Include a markdown editor for editing and viewing notes.

## Developer guide

### Technologies & languages

Seiri is built using the following technologies:

1. `Typescript` for both server and web application
2. `React` for the web application
3. `Nestjs` for the server
4. `Jest` for Unit testing
5. `Docker` and `Docker compose` for containerization.

### Monorepo structure

| Name            | Path               | Stack | Description |
| --------------- | ------------------ | ----------- |----------- |
| `@seiri/client`    | [/client](/client)  | [React](https://react.dev/)  |Web client  |
| `@seiri/server` | [/server](/server) | [NestJS](https://nestjs.com/)      |Server      |
| `@seiri/www` | [/www](/www) | [Gatsby](https://www.gatsbyjs.com/)      | website      |

## Deployment 
For the production environment each service has its own [pipeline](https://www.atlassian.com/devops/devops-tools/devops-pipeline) built with [Github Actions](https://github.com/features/actions) once changes are merged in the main branch, the pipeline is triggered. It will run the tests, build the image, push the new version to the registry then connect to the server and update the image used in production. 

## Testing 
- The server has unit tests and i'm planning to add integration tests with [Testcontainers](https://testcontainers.com/). 
- For the frontend there is no test yet i'm planning to do that but i have to refactor the code first cause it's a nightmare with the current codebase. 

## Usage

### Before you start 
- Install Docker and Docker Compose.
- Change environment variable values in .env file for more security or leave it as it is.

### Production mode 

In this mode, all latest images will be pulled from Docker Hub. Just copy `compose.yml` and hit `docker-compose up`. 

### Development mode 
If you'd like to build images yourself, you have to clone the repository. After that, run `docker compose -f compose.yml -f compose.dev.yml up`. 

`docker-compose.dev.yml` inherits `docker-compose.yml` with additional possibility to build images locally and expose all containers ports for convenient development.

The dev mode uses [Compose watch](https://docs.docker.com/compose/file-watch/) as well so every time you make a change in the repository the image will be rebuilt that's convenient while working locally. 

### Important endpoints
- http://localhost:3005 - Client
- http://localhost:3004 - Server

## License 
The tool is available as open source under the terms of the [MIT License](https://opensource.org/license/MIT).

## Contributions are welcome!
The project is open source so if you want to add new features or find any bug please feel to open a PR. 

## Built by

- Marius Vincent NIEMET [Twitter](https://twitter.com/mariusniemet05) [LinkedIn](https://www.linkedin.com/in/marius-vincent-niemet-928b48182/) [Github](https://github.com/niemet0502)
