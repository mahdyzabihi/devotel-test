<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start
```

## Test

```bash
# unit tests
$ pnpm run test
```

## Src Folders
```html
1. Filter
    * Global Exception

2. Interceptors
    * Manages the output structure of APIs.

3. Packages
    The main body of the Application, Includes:
    * API (Get data from APIs)
    * Data-Transform (Convert data that get from api to job type)
    * Database (It includes Entity and Repository of job table that store jobs)
    * Worker (It includes CronJob which receives data from API and then converts it into a job type and finally stores it in the database)

4. Queries
    * Input Queries of App Controller
```
 
## Attentions: Settings of Database, Cronjob and swagger are in the .env file.
```html
- Please rename .env.example to .env for using .env file.
- You need to create a database named "devotel-test" in your db, or you can change the database name in the .env file.
```

## Example API
#### Url Path
```http request
Path: /api/job-offers
```
#### Query String Url
```http request
title=back&location=NY&minSalary=60000&maxSalary=113000&page=1&limit=20
```

#### Query String Json
```json
{
    "title": "back",
    "location": "NY",
    "minSalary": 60000,
    "maxSalary": 113000,
    "page": 1,
    "limit": 20
}
```

#### Response
```json
{
    "code": 200,
    "time": 1741423976061,
    "data": {
        "list": [
            {
                "created_date": "2025-03-08 12:17:00.694647",
                "updated_date": "2025-03-08 12:17:00.694647",
                "deleted_date": null,
                "id": "job-218",
                "title": "Backend Engineer",
                "location": "Seattle, NY",
                "type": "Remote",
                "minSalary": 71000,
                "maxSalary": 113000,
                "currency": "USD",
                "companyName": "Creative Design Ltd",
                "companyIndustry": null,
                "companyWebsite": "https://dataworks.com",
                "experience": 4,
                "skills": ["HTML", "CSS", "Vue.js"],
                "postedDate": "2025-03-04"
            }
        ],
        "total": 1,
        "page": 1,
        "limit": 20
    }
}
```