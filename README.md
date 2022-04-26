# polling-service
Service to poll RSS feeds and parse Metadata

## Requirements
- npm / node.js 16
- PostgreSQL

## Development
We would recommend to use the Devcontainer to start developing. All necessary dependencies are installed and you don´t have to install specific tools.

### Devcontainer
This repository has a Dockerfile and a Docker Compose file. These are Visual Studio Devcontainers.
With the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension you can connect to the Docker Containers.

### First Steps
After your cloned the repo and started the Devcontainer you should run ``npm install`` to install all npm dependencies.

### Local Build
To run the project locally use ``npm run start`` / ``npm start``.

### Run Tests
To run all unit-tests use ``npm run test`` / ``npm test``. If you want code coverage you can use the ci-pipeline command which also works locally ``npm run test:ci``.

### Update Production
If you want your changes applied to production you have to create a pull-request. After a merge to master the pipeline will build a new docker-image based on the [Dockerfile](Dockerfile).

## Service Lead
The polling ``Service-Lead`` is [Jannik Springer](https://github.com/Jacky-Ickx).
