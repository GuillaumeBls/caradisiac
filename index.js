const {getModels} = require('node-car-api');
const {getBrands} = require('node-car-api');

var voiture = new Array();

async function store () {
  const brands = await getBrands();
  
  var count = 0;
  
  brands.forEach(async function(brand){
    var models = await getModels(brand);
    console.log(models);
    voiture[count] = models;
    
    count++;
  })
  
}

store();
