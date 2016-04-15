# Quick Fire

A really simple no-backend server.

# What is Quick Fire

Perfect for the Frontend dev who wants to build or prototype some awesome frontend code without relying on an annoying backend dev like me to build something.

No configuration. All you need to do is type:
```
quickfire start
```
And start firing off AJAX requests.

## Getting Started

### Install

CD to your working directory where static files are and install Quick Fire

```
npm install -g https://github.com/alphillips/quick-fire.git
```
\*(not published to npm yet)

Then type `quickfire start` To start the server
```
> quickfire start

Quickfire started on http://localhost:4000/

```
You can change the port using -p
```
>quickfire start -p 8080
Quickfire started on http://localhost:8080/
```

### Use
You can start making AJAX request which will create records or read records from your no-backned database.
No configuration, no setting up schemas.

### Here's the spec

```
POST /api/[your-resource]   
```   
   Saves JSON body at /api/[your-resource]/
   returns ID for newly created record

```
GET /api/[your-resource]/[id]
```
   Returns JSON record

```
GET /api/[your-resource]/
```
  Returns all records for that resource

```
PUT /api/[your-resource]/[id]
    body
```
   Updates body JSON for that record
   returns ID

```
DELETE /api/[your-resource]/[id]
```
   Deletes record for the ID

```
GET /[anything other than 'api']/
```
Returns any static resource. Starting at root of you project

```
GET /api/[your-resource]?search=[JSON String]]
```
return JSON Array based on the search criteria

### Some Examples

#### 1. Rest Client
You can use a REST client like [Postman](https://www.getpostman.com/) and to start playing with the API.

```
POST http://localhost:4000/api/pet/

Content-Type application/json

{
  "type": "dog",
  "name": "Tilly"
}
```
This creates an object on the URI `/pet`. The id of the newly created resource will be returned (e.g. XAghgrwk2t5pmXmh). Use the id to view the data.

```
GET http://localhost:4000/api/pet/XAghgrwk2t5pmXmh
```

```
{
  "type": "dog",
  "name": "Tilly",
  "_id": "XAghgrwk2t5pmXmh"
}
```

Update the data with a PUT

```
PUT http://localhost:4000/api/pet/XAghgrwk2t5pmXmh

{
  "type": "dog",
  "name": "Tilly",
  "age":2,
  "breed":"Long haired dachshund"
}
```

View all pet objects with a GET without an id. Returns an array of pet objects

```
GET http://localhost:4000/api/pet/
```

```
[
  {
    "type": "dog",
    "name": "Tilly",
    "_id": "XAghgrwk2t5pmXmh"
  }
]
```

Add a second object
```
POST http://localhost:4000/api/pet/

{
  "type": "cat",
  "name": "Missy"
}
```


Search on a resource using `?search={"name":"Tilly"} `. Returns an array of matched objects.
```
http://localhost:4000/api/pet?search={"name":"Tilly"}
```

Remove the pet with a DELETE

```
DELETE http://localhost:4000/api/pet/XAghgrwk2t5pmXmh
```




#### 2. Example HTML page

If you are using Angular or React start using the API straight away.
Here is a very simple HTML page using vanilla AJAX to illustrate creating and viewing a customer object.

1. Add a file `fire.html` to your root directory
```
<!doctype html>
<html lang="en">
<body>
  <div>Customer ID is <span id="customer"></span></div>
  <div id="get-customer"></div>
  <script>
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://' + document.location.host + '/api/customer');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var object = {name:"Breno"};
  xhr.send(JSON.stringify(object));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201){
        var id = xhr.responseText;
        document.getElementById('customer').innerHTML = id;
        document.getElementById('get-customer').innerHTML = '<a href="http://' + document.location.host + '/api/customer/'+id+'">View Customer</a>';
      } else {
        alert('Error: ' + xhr.status);
      }
    }
  }
  </script>
</body>
</html>
```

2. Start Quick Fire
```
quickfire Start
```

3. Go to http://localhost:4000/fire.html in your browser

Make some changes to this file, you don't need to restart to see the changes.




## About
Quick Fire uses the awesome [NeDB](https://github.com/louischatriot/nedb) as the backend.

Written for my good friend [Breno](https://github.com/brenopittoli)

## Coming Soon

1. More command line options
   Such as `quickfire wipe` and `quickfire load`


2. Brunch plugin


3. GraphQL support


4. Example using React
