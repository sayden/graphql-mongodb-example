# graphql-mongodb-example

This is a project to show how to work with a Express app with GraphQL and MongoDB persistence... written in ES6 :)

## How to install the example

```bash
$ git clone https://github.com/sayden/graphql-mongodb-example.git
$ npm install
$ gulp
```
---

## Using it
For easyness, we will use Postman to make queries:

* Asking for the user with ID 0 (actually, the position 0 on the user list for easyness)
```graphql
query RootQuery {
	user (id:0) {
    	name
    }
}
```
Gives
```json
{
    "data": {
        "user": {
            "name": "Mario"
        }
    }
}
```

* Asking for the user with ID 999 (it does not exists yet)
```graphql
query RootQuery {
	user (id:999) {
    	name
    }
}
```
Gives
```json
{
    "data": {
        "user": null
    }
}
```

* Asking for the name, surname, age and ID of user with ID 6
```graphql
query RootQuery {
	user (id:6) {
    	name
        surname
        age
        _id
    }
}
```
Gives
```json
{
    "data": {
        "user": {
            "name": "Mario",
            "surname": "Caster",
            "_id": "55d70b33f53053b9239e3fbe",
            "age": 30
        }
    }
}
```
* Adding a new user called Linus Torvalds of age 45 and getting the new info
```graphql
mutation RootMutation {
	addUser (name: "Linus", surname:"Torvalds", age:45) {
    	name
        surname
        _id
        age
    }
}
```

Gives
```javascript
{
    "data": {
        "addUser": {
            "name": "Linus",
            "surname": "Torvalds",
            "_id": "55d70e25f53053b9239e3fbf",
            "age": 45
        }
    }
}
```

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

### 4 files for every GraphQL "model"

This is a personal preference, to split the Model in 4 files as the could grow dangerously and I don't like big (>1000 lines) files.

* **UserTypeQL.es6** -> This is what we could call GraphQL model where you establish the fields it has, their type (string, int...) and so on.
* **UserMutationsQL.es6** -> Here we will describe the mutations, the actions that can alter the database.
* **UserQueriesQL.es6** -> The queries against this model on the database, they can't alter it.
* **UserQL.es6** -> A file to govern them all... I mean... A single point of entrance to the entire model.

### User type file
The User type file is where we really define the properties of an model. We define *what it is compose of* but we aren't defining yet what it can do.

So, for example, a typical User Type file could be like the following:

```javascript
exports default new GrapqhQLObjectType({
    name: 'User',
    description: 'A user type in our application',
    fields: () => {
      _id:{
        type: new GraphQLNonNull(GraphQLID)
      },
      name:{
        type: new GraphQLNonNull(GraphQLString)
      },
      surname:{
        type: new GraphQLNonNull(GraphQLString)
      },
      age: {
        type: GraphQLInt
      }
    }
  });
```

1. We define a **name** for the type so it can be recognized through the entire schema and in our calls
2. We define a **description** in case we ask (through a http call) to know information about the exposed schema (we will cover how to do this later).
3. And we define **fields** as properties of the model:
  1. **_id** as a unique ID (GraphQLID) in the DDBB,
  2. **name**
  3. **surname**...

Really really simple, isn't it?

### User Queries file
In the User Queries, we will define the type of operations that **can ask** for information to our persistence layer (our database) **but cannot modify the database**.

```javascript
export default {
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return new Promise((resolve, reject) => {
        //User is a Mongoose schema
        User.find({}, (err, res) => {
          // Actually, we are not searching the ID but returning the position in the iterator
          err ? reject(err) : resolve(res[id]);
        });
      });
    }
  }
};

```
1. We define the type of object we will query. Here 'user' means that we will ask for a response like `{user:"username"}` when we make a query like `query Query { user }`
2. **type** We have to define a type for the returning object. In this case is the *UserType* that we have defined previously.
3. **args** Arguments for the query, in this case we have defined an id argument. So our query could be `query UserQueries { user (id:1) }` to ask for the id 1 of the database.
4. **resolve** This was the most difficult part to understand for me. Resolve is the function to execute in your system to retrieve the queried object. It always has a *root* param and the second param, that are arguments. Resolve must also **return a promise** but I'm not sure if this is mandatory. In our case, resolve creates a Promise, makes a query using Mongoose and directly returns the result.

### User Mutations file
Our mutations file will contain operations to execute serially that can alter our database. It's very similar to the queries file:

```javascript
export default {
  addUser:{
    type:UserType,
    args: {
      name:{
        name:'name',
        type:new GraphQLNonNull(GraphQLString)
      },
      surname:{
        name:'surname',
        type: new GraphQLNonNull(GraphQLString)
      },
      age: {
        name:'age',
        type: GraphQLInt
      }
    },
    resolve: (root, {name, surname}) => {
      //Creates a new Mongoose User object to save
      var newUser = new User({name:name, surname:surname});

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err): resolve(res);
        });
      });
    }
  }
};
```
1. We define an operation called **addUser** to add new users to the database.
2. In **args** we defined the arguments that must be passed to execute the operation: *name* and *surname* as mandatory and *age* as optional, this is achieved with the `new GraphQLNonNull()` object.
3. **resolve** must also return a promise. Here we create a new Mongoose User object and save then returning a promise.

### User QL file
Finally when defining models, we like to use a `[Model]QL` file that will hold all the information previously done.

```javascript
import _UserType from './UserTypeQL.es6';
import _UserQueries from './UserQueriesQL.es6';
import _UserMutations from './UserMutationsQL.es6';

export const UserType = _UserType;
export const UserQueries = _UserQueries;
export const UserMutations = _UserMutations;
```

This is not mandatory at all, but structurally I liked more the approach of importing a unique object for every model in the next file, the schema.

---

## The schema file
Schema is a bit more complex. We will join here all the models operations.

```javascript
let RootQuery = new GraphQLObjectType({
  name: 'Query',      //Return this type of object
  fields: () => ({
    user: UserQueries.user,
    userList: UserQueries.userList
  })
});


let RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: UserMutations.addUser
  })
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;
```

1. We create a GraphQLObjectType for queries, in this case called `RootQuery` and a mutation object called `MutationQuery`.
2. We must give both a **name** (don't know very well why yet because you don't need to use it)
3. Then you must add, as **fields** all the operations that we have defined previously. In our case we have given the same name to the operations in our queries and mutations file than here.
4. Finally, we must create a GraphQLSchema object to add the query and mutation object.

We have our schema complete. Now we only have to expose it through an endpoint.

## The Server
The server is a common Mongoose+Express server with a small modification:

```javascript
app.use(bodyparser.text({type: 'application/graphql'}));

app.post('/', (req, res) => {
  //Execute the query
  graphql(schema, req.body)
    .then((result) => {
      res.send(result);
    });
});
```

1. We must know that our GraphQL queries must come with the `application/graphql` Content-Type. We use body-parser to get the response.
2. Then we define an endpoint in '/' to receive **all queries and mutations**. This is completely different on how you would do it in RESTful.
3. Finally, we call the `graphql()` function with out defined schema. Pretty simple.

---

# Roadmap
* Relay
* Not many established yet. I have read about something like unions, directives...

# Contributions
Please feel free to help, specially with grammar mistakes as english is not my mother language and I learned it watching "Two and a half men" :)

Any other contribution must be on the road of simplicity to understand and to help others to learn GraphQL and it must have a README associated.
