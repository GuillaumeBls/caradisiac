const {
  getModels
} = require('node-car-api');
const {
  getBrands
} = require('node-car-api');

var client = require('./connection.js');

var voiture = new Array();

var json = {
  brand: "",
  model: "",
  volume: "",
  uuid: "",
  name: "",
};
var brand = voiture;

var models;

async function store() {
  const brands = await getBrands();

  var count = 0;

  brands.forEach(async function (brand) {
    models = await getModels(brand);
    //console.log(models);

    models.forEach(async function (model) {

      insertData(count, model);
      count++;
    })

  })

}

store();

// Document add
function insertData(index, voiture) {
  client.index({
    index: 'caradisiac',
    id: index,
    type: 'voiture',
    body: voiture
  }, function (err, resp, status) {
    console.log(resp);
  });
}

// Document delete

function deleteData(index, voiture) {
  client.delete({
    index: 'caradisiac',
    id: index,
    type: 'voiture'
  }, function (err, resp, status) {
    console.log(resp);
  });
}

// Search data

function search() {
  client.search({
    index: 'caradisiac',
    type: 'voiture',
    body: { //Retirer pour tout voir
      query: {
        //match: { "brand": "RENAULT" }
        "range": {
          "volume": {
            "gte": 500
          }
        }
      },
    }
  }, function (error, response, status) {
    if (error) {
      console.log("search error: " + error)
    } else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function (hit) {
        console.log(hit);
      })
    }
  });
}
