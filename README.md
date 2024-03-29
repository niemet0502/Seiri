<br />
<h4 align="center">
  <a href="https://excalidraw.com">Landing page</a> |
  <a href="https://blog.excalidraw.com">Roadmap</a> |
  <a href="https://docs.excalidraw.com">Documentation</a> |
  <a href="https://plus.excalidraw.com">Excalidraw+</a>
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
      <img src="./assets/seiri-notes-list.png" alt="Product showcase" />
    </a>
    <figcaption>
      <br />
      <p align="center">
        Manage your tasks and notes at the same place for free.
      </p>
    </figcaption>
  </figure>
</div>

## Features

- [ ] Projects

  - [ ] Create a new Project
  - [ ] Rename Project
  - [ ] Add a task to a project
  - [ ] Add note to a project

- [ ] Tasks

  - [ ] Create a Task
  - [ ] Update a Task
  - [ ] Delete a Task
  - [ ] Complete Task
  - [ ] Assign a Task to a group

- [ ] Notes

  - [ ] Create a Note
  - [ ] Update a Note
  - [ ] Add a Edit and Read view

- [ ] Users
  - [ ] Update user informations (update photo)

## Developer guide

### Technologies & languages

Seiri is built using the following technologies:

1. Typescript for both server and web application
2. React for the web application
3. Nestjs for the server
4. Jest for Unit testing
5. Docker and Docker compose

### Monorepo structure

| Name            | Path               | Description |
| --------------- | ------------------ | ----------- |
| `@seiri/web`    | [/web](/apps/web)  | Web client  |
| `@seiri/server` | [/server](/server) | Server      |

### Installation

> **NOTE**</br>
>
> - Before the next step, you should have docker installed.
> - Since we use docker-compose to run the services

- Clone this repo

  ```bash
  git clone git@github.com:niemet0502/Seiri.git
  ```

* You have to create .env for the server and web app
* Change directory and for each app renamed the .env.example for to .env and setup your credentials

  ```bash
  cd seiri
  ```

* Now you can build the docker image

  ```bash
  docker-compose build
  ```

* and then run the containers
  ```bash
  docker-compose up -d
  ```
* The server will be connected to a dockerize mysql database.

* You can run the following commande to know the running containers

  ```bash
  docker ps
  ```

Go to `localhost:3005` to view the web app and `localhost:3004/api` to view the server documentation (Endpoints list).

## Built by

- Marius Vincent NIEMET [Twitter](https://twitter.com/mariusniemet05) [LinkedIn](https://www.linkedin.com/in/marius-vincent-niemet-928b48182/) [Github](https://github.com/niemet0502)
