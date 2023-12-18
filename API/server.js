const express = require('express');
const app = express();
const script = require('./script');



// Port of the server
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " POST, PUT, DELETE, OPTIONS, HEAD, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, ");
  next();
});


// GET FUNCTIONS
// Endpoints that call the getters of all the data from script.js
app.get('/getallemploye', (req, res) => {//OK
  const message = script.getAllEmploye();
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getalldealership', (req, res) => {//OK
  const message = script.getAllDealership();
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getallcar', (req, res) => {//OK
  const message = script.getAllCar();
  message.then((result) => {
    res.send(result);
  });
});

//Endpoints that call the getters of a specific data from script.js
app.get('/getemploye/:id', (req, res) => {//OK
  const { id } = req.params;
  const message = script.getEmploye(id);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getdealership/:id', (req, res) => {//OK
  const { id } = req.params;
  const message = script.getDealership(id);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getcar/:id', (req, res) => {//OK
  const { id } = req.params;
  const message = script.getCar(id);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getcarbydealership/:id', (req, res) => {//OK
  const { id } = req.params;
  const message = script.getCarByDealership(id);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getemployesfromdealership/:id', (req, res) => {// PRESQUE OK
  const { id } = req.params;
  const message = script.getEmployesFromDealership(id);
  message.then((result) => {
    console.log(result);
    res.send(result);
  });
});

app.get('/getdealershipbyemploye/:id', (req, res) => {// OK
  const { id } = req.params;
  const message = script.getDealershipByEmploye(id);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getdealershipbycar/:id', (req, res) => {//OK
  const { id } = req.params;
  const message = script.getDealershipByCar(id);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getcarbycategory/:category', (req, res) => {//OK
  const { category } = req.params;
  const message = script.getCarByCategory(category);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getdealershipbydirector/:id', (req, res) => {//OK
  const { id } = req.params;
  const message = script.getDealershipByDirector(id);
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getaveragepricebycategory/', (req, res) => {//OK
  const message = script.getAveragePriceByCategory();
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getaveragesalarybydealership/', (req, res) => {
  const message = script.getAverageSalaryByDealership();
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getnumberemployebydealership/', (req, res) => {
  const message = script.getNumberEmployeByDealership();
  message.then((result) => {
    res.send(result);
  });
});

app.get('/getrepartitionbysexe/', (req, res) => {
  const message = script.getRepartitionBySexe();
  message.then((result) => {
    res.send(result);
  });
});




// POST FUNCTIONS

app.post('/insertemploye', (req, res) => {
  const { name, sexe, phone, email, poste, salary, dealership} = req.body;
  const employeToInsert = {
    name: name,
    sexe: sexe,
    phone: phone,
    email: email,
    poste: poste,
    salary: salary,
    dealership: dealership
  }
  const message = script.insertEmploye(employeToInsert);
  message.then((result) => {
    res.send(result);
  });
});



app.post('/insertdealership', (req, res) => {
  const {name, adresse, phone, email, director} = req.body;
  const dealershipToInsert = {
    name: name,
    adresse: {
      street: adresse.street,
      city: adresse.city
    },
    phone: phone,
    email: email,
    director: director
  }

  script.insertDealership(dealershipToInsert);
  
});

app.post('/insertcar', (req, res) => {
  const {id_car, brand, price, model, category, dealership} = req.body;
  const carToInsert = {
    id_car: id_car,
    brand: brand,
    price: price,
    model: model,
    category: category,
    dealership: dealership
  }
  script.insertCar(carToInsert);
});


//DELETE FUNCTIONS

app.delete('/deleteemploye/:id', (req, res) => {
  const { id } = req.params;
  console.log("server : deleteemploye : " + parseInt(id) )

  const message = script.deleteEmploye(id);
  message.then((result) => {
    res.send(result);
  });
});

app.delete('/deletedealership/:id', (req, res) => {
  const { id } = req.params;
  const message = script.deleteDealership(id);
  message.then((result) => {
    res.send(result);
  });
});

app.delete('/deletecar/:id', (req, res) => {
  const { id } = req.params;
  const message = script.deleteCar(id);
  message.then((result) => {
    res.send(result);
  });
});


//UPDATE FUNCTIONS

app.put('/updateemploye/:id', (req, res) => {
  console.log("updateemploye")
  const { id } = req.params;
  const { name, sexe, phone, email, poste, salary, dealership} = req.body;
  const employeToUpdate = {
    name: name,
    sexe: sexe,
    phone: phone,
    email: email,
    poste: poste,
    salary: salary,
    dealership: dealership
  }
  const message = script.updateEmploye(id, employeToUpdate);
  message.then((result) => {
    res.send(result);
  });
});

app.put('/updatedealership/:id', (req, res) => {
  const { id } = req.params;
  const { name, adresse, phone, email, director} = req.body;
  const dealershipToUpdate = {
    name: name,
    adresse: {
      street: adresse.street,
      city: adresse.city
    },
    phone: phone,
    email: email,
    director:  parseInt(director)
  }

  
  const message = script.updateDealership(id, dealershipToUpdate);
  message.then((result) => {
    res.send(result);
  });
});

app.put('/updatecar/:id', (req, res) => {
  const { id } = req.params;
  const {brand, price, model, category, dealership} = req.body;
  const carToUpdate = {
    brand: brand,
    price: price,
    model: model,
    category: category,
    dealership: parseInt(dealership)
  }

  const message = script.updateCar(id, carToUpdate);
  message.then((result) => {
    res.send(result);
  });
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

