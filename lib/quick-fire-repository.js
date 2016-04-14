var Datastore = require('nedb');

var Repository = function (){}

function getResourceFromPath(path){
  path = path.replace('/api','');
  path = path.split('/').filter(Boolean);
  return path[0];
}

function getIdFromPath(path){
  path = path.replace('/api','');
  path = path.split('/').filter(Boolean);
  return path[1];
}

function getDatastore(resource){
  var db = new Datastore('db/' +resource+ '.db');
  db.loadDatabase();
  return db;
}

Repository.prototype.save = function(path, body, callback){
  var resource = getResourceFromPath(path);
  var db = getDatastore(resource);
  db.insert(body, function (error, newDoc) {
    if(newDoc){
      callback(newDoc._id, null);
    } else if(error){
      callback(null, error);
    }
  });
}

Repository.prototype.get = function(path, callback){
  var resource = getResourceFromPath(path);
  var id = getIdFromPath(path);
  var db = getDatastore(resource);
  if(id){
    db.findOne({ _id: id }, function (error, doc) {
      if(doc){
        callback(doc);
      } else if(error){
        callback(null, error);
      }
    });
  } else {
    db.find({}, function (error, docs) {
      if(docs){
        callback(docs);
      } else if(error){
        callback(null, error);
      }
    });
  }
}

Repository.prototype.update = function(path, body, callback){
  var resource = getResourceFromPath(path);
  var id = getIdFromPath(path);
  var db = getDatastore(resource);
  db.update({ _id: id }, body, {}, function (error, numReplaced) {
    if(numReplaced == 1){
      callback(id);
    } else if(error){
      callback(null, error);
    }
  });
}

Repository.prototype.remove = function(path, callback){
  var resource = getResourceFromPath(path);
  var id = getIdFromPath(path);
  var db = getDatastore(resource);
  db.remove({ _id: id}, {}, function (error, numRemoved) {
    if(numRemoved == 1){
      callback(id);
    } else if(error){
      callback(null, error);
    } else {
      callback(null, 'Id ' + id + ' not found');
    }
  });
}

Repository.prototype.search = function(path, parms, callback){
  var resource = getResourceFromPath(path);
  var db = getDatastore(resource);
  db.find(JSON.parse(parms), function (err, docs) {
    if(docs){
      callback(docs);
    } else if(error){
      callback(null, error);
    }
  });

}

module.exports = exports = new Repository();
