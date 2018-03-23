var client = require('./connection.js');

client.search({  
  index: 'caradisiac',
  type: 'voiture',
  body: {    //Retirer pour tout voir
    query: {
      //match: { "brand": "RENAULT" }
      "range": {
            "volume": {
              "gte": 500}
      }
    },
  }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});