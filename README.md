# Quick Fire

A really simple no-backend server.

# What is Quick Fire

Perfect for the Frontend dev who wants to build or prototype some awesome frontend code without relying on an annoying backend dev like me to build something.

No configuration. All you need to do is type:
```
quickfire start
```
And start firing off AJAX requests.

See Getting Started below

## Here's the spec

```
POST /api/[your-resource]   
```   
   saves JSON body at /api/[your-resource]/
   returns ID for newly created record

```
GET /api/[your-resource]/[id]
```
   returns JSON record

```
GET /api/[your-resource]/
```
  returns all data records for that resource

```
PUT /api/[your-resource]/[id]
    body
```
   updates body JSON for that record
   returns ID

```
DELETE /api/[your-resource]/[id]
```
   deletes record for the ID

```
GET /[anything other than 'api']/
```
will look for the resource
e.g. **/index.html**

```
GET /api/[your-resource]?search=[JSON String]]
```
return JSON Array based on the search criteria

## Getting Started

### Install

CD to your working directory where static files are and install Quick Fire

```
npm install https://github.com/alphillips/quick-fire.git
```

Then type `quickfire start` To start the server
```
> quickfire start

Quickfire started on http://localhost:4000/

```


### Use
You can start making AJAX request which will create or read your no-backned database.
No configuration, no setting up schemas.

### About
Quick Fire uses the awesome [NeDB](https://github.com/louischatriot/nedb) as the backend.

Written for good friend [Breno](https://github.com/brenopittoli)

## Coming Soon

1. More command line options
   Such as `quickfire wipe` and `quickfire load`


2. Brunch skeleton


3. GraphQL support


4. Unit Tests lol
