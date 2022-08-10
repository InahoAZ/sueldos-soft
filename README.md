# sueldos-soft
A little development in React + Node for settlement of wages and earnings builded for a school project with @AuxZarske.

# How to Run
This is a step-by-step guide how to run the project.

## Installation

* This development run in Docker Containers. You need to instal Docker, see https://www.docker.com/community-edition/ .
* After installing Docker you should be able to run `docker-compose`. If not, you might need to install it. See https://docs.docker.com/compose/install/ .

* Clone the repo and set up your enviroment variables copying the `.env.dist` file to a new file called `.env` in both `frontend/` and `/backend` folder.

* On the root directory `sueldos-soft` where docker-compose.yml is, build the Docker images with `docker-compose build` .

* Afterwards the Docker images should have been created so now you can start the containers with `docker-compose up`

* Now you should be able to access frontend application at http://localhost:4001
