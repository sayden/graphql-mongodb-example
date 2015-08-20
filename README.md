# graphql-mongodb-example

This is a project to show how to work with a Express app with GraphQL and MongoDB persistence... written in ES6 :)

## How to install

```bash
$ git clone https://github.com/sayden/graphql-mongodb-example.git
$ npm install
$ gulp
```
---

## GraphQL
GraphQL is a new concept to define queries around a front end. It's a mix between SQL and REST but the best way to understand it is through a example.

## The example application
The application is pretty simple, uses an app.js where Express is getting configured and where it imports the Schema of the app.

Our only endpoint will be '/'. Soon you will see that we don't need more.

We also have a **'schema.es6'** that hold most of the GraphQL schema configuration. But first lets start with the models

### Models folder
In the models folder is where most of the magic is happening.

When you open it, you will see a subfolder called User.
* Every file ending in **QL** is related with GraphQL.
* UserSchema.es6 is the Mongoose schema.

So, in any normal development we could have a Mongoose schema that we use to connect to our MongoDB instance. Nothing has change yet.

#### The concept of Query and Mutation
In GraphQL we are going to separate the actions of our API between **Queries** (they don't alter the DDBB so they can be processed in parallel, typical GET in REST or SELECT * FROM... in SQL) and **Mutations** (they alter the database and they are processed serially, a POST, DELETE, PUT in REST or a DELETE FROM, INSERT INTO... in SQL)

### 4 files for every GraphQL file

This is a personal preference, to split the Model in 4 files as the could grow dangerously and I don't like big (>1000 lines) files.

* **UserTypeQL.es6** -> This is what we could call GraphQL model where you establish the fields it has, their type (string, int...) and so on.
* **UserMutationsQL.es6** -> Here we will describe the mutations, the actions that can alter the database.
* **UserQueriesQL.es6** -> The queries against this model on the database, they can't alter it.
* **UserQL.es6** -> A file to govern them all... I mean... A single point of entrance to the entire model.

### User type file
TODO

### User Mutations file
TODO

### User Queries file
TODO

### User QL file
TODO

## The schema file
TODO
