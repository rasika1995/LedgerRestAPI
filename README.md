# Ledger Rest API

This project was generated with [ExpressJs](https://expressjs.com/) version 4.16.1.

## Clone the Repo

To view the project, first clone the LedgerRestAPI repo using `git clone https://github.com/rasika1995/LedgerRestAPI.git`.

## Navigate to the Project

Run `cd LedgerRestAPI` for navigate to the project directory

## Install the all the dependency

Run `npm install`. It will install the all the necessary dependancies for the project

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`.

## Test the Ledger Rest API via PostMan

Information About Sample Rest API

HTTP Method: `POST`

URL : `http://localhost:3000/ledger`

Sample JSON Body Request: 

` {
    "start_date":"2020-03-28T00:00:00.000Z",
    "end_date":"2020-05-27T00:00:00.000Z",
    "frequency":"FORTNIGHTLY",
    "weakly_rent":555,
    "timezone":"LK"
}`

Using [PostMan](https://www.postman.com/) you can easly check the REST API.


![Screenshot from 2021-11-29 17-38-12](https://user-images.githubusercontent.com/42616883/143865594-cd4165a9-ee2e-41c6-bb56-bccc2982e5e9.png)




## Running unit tests

Run `npm run test` to execute the unit tests via [Jestjs](https://jestjs.io/docs/getting-started).

## Further help

To get more help on the Nodejs use `npm help` or go check out the [npm Docs](https://docs.npmjs.com/cli/v6/commands) page.





