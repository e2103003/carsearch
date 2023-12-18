const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'automobile';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

const db = client.db(dbName);
// Use connect method to connect to the server
async function run() {
  try {
    await client.connect();

    await createCollectionEmploye()
    await createCollectionDealership()
    await createCollectionCar()

    



    //clear all the data
    await db.collection("employe").deleteMany({})
    await db.collection("dealership").deleteMany({})
    await db.collection("car").deleteMany({})

    await init(db)



  } catch (err) {
    console.error(err);
  } finally {
    // Close the client connection
    //await client.close();
  }
}

async function end() {
  console.log("end")
  await client.close();
}

module.exports = {end};


/**
 * Create or reset articles collection
 * @param {*} db database
 */
async function createCollectionCar() {
  if(db.collection("car") != undefined){
    db.collection("car").drop()
  }
  await db.createCollection("car", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "Car Object Validation",
        required: ["id_car", "brand", "price", "model", "category", "dealership"],
        properties: {
          id_car: {
            bsonType: "int",
            description: "'id_car' must be a int, is required and must be unique",
            uniqueItems: true
          },
          brand: {
            bsonType: "string",
            description: "'brand' must be a string and is required"
          },
          price: {
            bsonType: [
              "double",
              "int"],
            minimum: 0,
            description: "'price' must be a positive double/int and is required"
          },
          model: {
            bsonType: "string",
            description: "'model' must be a string and is required"
          },
          category: {
            bsonType: "string",
            enum: ["Citadine", "SUV", "Berline", "Break", "Monospace"],
            description: "must be an array of string and contains either Citadine, SUV, Berline, Break, Monospace"
          },
          dealership: {
            bsonType: "int",
            description: "'dealership' must be a string, is required, must be unique and must be a reference to id_dealership",
          }
        }
      }
    }
  })
}



/**
 * Create or reset rayon collection
 * @param {*} db database
 */
async function createCollectionDealership() {

  if(db.collection("dealership") != undefined){
    db.collection("dealership").drop()
  }

  await db.createCollection("dealership", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "dealership Object Validation",
        required: ["id_dealership", "name", "adresse", "phone", "email", "director"],
        properties: {
          id_dealership: {
            bsonType: "int",
            description: "'id' must be a int, is required and must be unique",
            uniqueItems: true
          },
          name: {
            bsonType: "string",
            description: "'name' must be a string and is required"
          },
          adresse: {
            bsonType: "object",
            required: ["street", "city"],
            properties: {
              street: { bsonType: "string" },
              city: { bsonType: "string" }
            }
          },
          phone: {
            bsonType: "int",
            description: "'phone' must be a int and is required"
          },
          email: {
            bsonType: "string",
            description: "'email' must be a string and is required"
          },
          director: {
            bsonType: "int",
            description: "'director' must be a string, is required, must be unique and must be a reference to id_employe",

          }
        }
      }
    }
  });
}

/**
 * Create or reset facture collection
 * @param {*} db database
 */
async function createCollectionEmploye() {
  
  if(db.collection("employee") != undefined){
    db.collection("employee").drop()
  }
  await db.createCollection("employee", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "Employee Object Validation",
        required: ["id_employe", "name", "phone", "email", "poste", "salary", "dealership"],
        properties: {
          id_employe: {
            bsonType: "int",
            description: "'id' must be a int, is required and must be unique",
            uniqueItems: true
          },
          name: {
            bsonType: "string",
            description: "'name' must be a string and is required"
          },
          sexe : {
            bsonType: "string",
            description: "'sexe' must be a string and is required",
            enum: ["M","F"],
          },
          phone: {
            bsonType: "int",
            description: "'phone' must be a int and is required"
          },
          email: {
            bsonType: "string",
            description: "'email' must be a string and is required"
          },
          poste: {
            bsonType: "string",
            enum: ["seller", "director", "manager"],
            description: "must be either seller, director or manager"
          },
          salary: {
            bsonType: [
              "double",
              "int"],
            minimum: 1300,
            description: "'salary' must be a positive double/int, is required and has a minimum of 1300"
          },
          dealership: {
            bsonType: "int",
            description: "'dealership' must be a int, is required, must be a reference to id_dealership",
          }
        }
      }
    }
  });
}

/**
 * Create or reset a collection
 * @param {*} db database
 * @param {*} collectionName name of collection create / reset
 */
async function createCollection(collectionName) {
  try {
    if (collectionName == "employe") {
      createCollectionEmploye()
    } else if (collectionName == "dealership") {
      createCollectionDealership()
    } else if (collectionName == "car") {
      createCollectionCar()
    }
  } catch (e) {
    console.log(e)
  }
}





/**
 * Part 2
 * @param {*} db database
 */
async function init() {

  console.log("init")




  //si les collections sont vides on les remplis




  /*if( await db.collection("employe").find({}).toArray().length != 0 && await db.collection("car").find({}).toArray().length != 0 && await db.collection("dealership").find({}).toArray().length != 0){
    console.log("*****data is already inserted*****")

  }else{*/
    

    /**insertion d'articles dans la collection Employe*/
    let EmployeeData = [
      {
        id_employe: 1,
        name: "Mattis",
        sexe: "M",
        phone: 123456789,
        email: "mattis@test.fr",
        poste: "seller",
        salary: 1500,
        dealership: 1
      },
      {
        id_employe: 2,
        name: "John",
        sexe: "M",
        phone: 123456789,
        email: "john@test.fr",
        poste: "director",
        salary: 4000,
        dealership: 1
      },
      {
        id_employe: 3,
        name: "Doe",
        sexe: "M",
        phone: 123456789,
        email: "doe@test.Fr",
        poste: "manager",
        salary: 3000,
        dealership: 1
      },
      {
        id_employe: 4,
        name: "Alice",
        sexe: "F",
        phone: 123456789,
        email: "alice@test.fr",
        poste: "seller",
        salary: 1400,
        dealership: 2
      },
      {
        id_employe: 5,
        name: "Bob",
        sexe: "M",
        phone: 123456789,
        email: "bob@test.fr",
        poste: "seller",
        salary: 1400,
        dealership: 2
      },
      {
        id_employe: 6,
        name: "Jane",
        sexe: "F",
        phone: 123456789,
        email: "jane@test.Fr",
        poste: "manager",
        salary: 3200,
        dealership: 2
      },
      {
        id_employe: 7,
        name: "Julie",
        sexe: "F",
        phone: 123456789,
        email: "julie@test.Fr",
        poste: "seller",
        salary: 1450,
        dealership: 3
      },
      {
        id_employe: 8,
        name: "Peter",
        sexe: "M",
        phone: 123456789,
        email: "peter@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 3
      },
      {
        id_employe: 9,
        name: "Paul",
        sexe: "M",
        phone: 123456789,
        email: "paul@test.Fr",
        poste: "manager",
        salary: 3000,
        dealership: 3
      },
      {
        id_employe: 10,
        name: "Marie",
        sexe: "F",
        phone: 123456789,
        email: "marie@test.Fr",
        poste: "director",
        salary: 4500,
        dealership: 3
      },
      {
        id_employe: 11,
        name: "Luc",
        sexe: "M",
        phone: 123456789,
        email: "luc@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 4
      },
      {
        id_employe: 12,
        name: "Sarah",
        sexe: "F",
        phone: 123456789,
        email: "sarah@test.Fr",
        poste: "seller",
        salary: 1450,
        dealership: 4
      },
      {
        id_employe: 13,
        name: "Mark",
        sexe: "M",
        phone: 123456789,
        email: "mark@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 4
      },
      {
        id_employe: 14,
        name: "Mia",
        sexe: "F",
        phone: 123456789,
        email: "mia@test.Fr",
        poste: "manager",
        salary: 3100,
        dealership: 4
      },
      {
        id_employe: 15,
        name: "David",
        sexe: "M",
        phone: 123456789,
        email: "david@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 16,
        name: "Elodie",
        sexe: "F",
        phone: 123456789,
        email: "elodie@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 17,
        name: "Lucas",
        sexe: "M",
        phone: 123456789,
        email: "lucas@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 19,
        name: "Sophie",
        sexe: "F",
        phone: 123456789,
        email: "sophie@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 20,
        name: "Maxime",
        sexe: "M",
        phone: 123456789,
        email: "maxime@test.Fr",
        poste: "seller",
        salary: 1430,
        dealership: 5
      },
      {
        id_employe: 21,
        name: "Laure",
        sexe: "F",
        phone: 123456789,
        email: "laure@test.Fr",
        poste: "manager",
        salary: 3300,
        dealership: 5
      },
      {
        id_employe: 22,
        name: "Matthieu",
        sexe: "M",
        phone: 123456789,
        email: "matthieu@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 23,
        name: "Aurélie",
        sexe: "F",
        phone: 123456789,
        email: "aurelie@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 24,
        name: "Florence",
        sexe: "F",
        phone: 123456789,
        email: "florence@test.Fr",
        poste: "manager",
        salary: 3000,
        dealership: 5
      },
      {
        id_employe: 25,
        name: "Nicolas",
        sexe: "M",
        phone: 123456789,
        email: "nicolas@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 26,
        name: "Audrey",
        sexe: "F",
        phone: 123456789,
        email: "audrey@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 27,
        name: "Hugo",
        sexe: "M",
        phone: 123456789,
        email: "hugo@test.Fr",
        poste: "seller",
        salary: 1400,
        dealership: 5
      },
      {
        id_employe: 28,
        name: "Emilie",
        sexe: "F",
        phone: 123456789,
        email: "emilie@test.Fr",
        poste: "manager",
        salary: 3200,
        dealership: 5
      }

    ];

    //INSERTION OF EMPLOYEE
    let result = await db.collection("employe").insertMany(EmployeeData);
    console.log("*****number of emplooye*****")
    console.log('Inserted documents:', result.insertedCount);

    //INSERTION OF DEALERSHIP

    let concessionData = [
      {
        id_dealership: 1,
        name: "Allanic",
        adresse: {
          street: "rue de la paix",
          city: "Paris"
        },
        phone: 2972938 ,
        email: "concessionllanic@test.fr",
        director: 3
      },
      {
        id_dealership: 2,
        name: "Renault",
        adresse: {
          street: "rue du commerce",
          city: "Lille",
        },
        phone: 8627534,
        email: "relnaultlille@test.fr",
        director: 1
      },
      {
        id_dealership: 3,
        name: "Luxe Paris",
        adresse: {
          street: "rue de la paix",
          city: "Paris"
        },
        phone: 1763420,
        email: "concessluxepaname@test.fr",
        director: 2
      },
      {
        id_dealership: 4,
        name: "Peugeot",
        adresse: { 
          street: "rue de la liberté",
          city: "Lyon" 
        },
        phone: 123456789,
        email: "pgtlyon@test.fr",
        director: 3
      },
      {
        id_dealership: 5,
        name: "Mercedes",
        adresse: {
          street: "rue de la victoire",
          city: "Marseille",
        },
        phone: 4674321,
        email: "mercedesmarseille@test.fr",
        director: 4
      }
    ];

    let resultConcession = await db.collection("dealership").insertMany(concessionData);
    console.log("*****number of dealership*****")
    console.log('Inserted documents:', resultConcession.insertedCount);
    

  let carData = [
    {      
      id_car: 1,
      brand: "Renault",
      price: 6000,
      model: "Clio",
      category: "Citadine",
      dealership: 2,
    },
    {
      id_car: 2,
      brand: "Renault",
      price: 21950,
      model: "Megane",
      category: "Berline",
      dealership: 2,
    },
    {
      id_car: 3,
      brand: "Renault",
      price: 49000,
      model: "Espace",
      category: "Monospace",
      dealership: 2,
    },
    {
      id_car: 4,
      brand: "Renault",
      price: 22000,
      model: "Arkana",
      category: "SUV",
      dealership: 2,
    },
    {
      id_car: 5,
      brand: "Renault",
      price: 23999,
      model: "Koleos",
      category: "SUV",
      dealership: 2,
    },
    {
      id_car :6,
      brand: "Renault",
      price: 30000,
      model: "Twingo",
      category: "Citadine",
      dealership :2,
    },
    {
      id_car :7,
      brand: "Toyota",
      price: 30000,
      model: "Yaris",
      category: "Citadine",
      dealership :1,
    },
    {
      id_car :8,
      brand: "Toyota",
      price: 13999,
      model: "Auris",
      category: "Berline",
      dealership :1,
    },
    {
      id_car :9,
      brand: "Citroen",
      price: 23750,
      model: "C3",
      category: "Citadine",
      dealership :1,
    },
    {
      id_car :10,
      brand: "Citroen",
      price: 69000,
      model: "C4",
      category: "Berline",
      dealership :1,
    },
    {
      id_car :11,
      brand: "Ford",
      price: 3200,
      model: "Fiesta",
      category: "Citadine",
      dealership :1,
    },
    {
      id_car :12,
      brand: "Ford",
      price: 12300,
      model: "Focus",
      category: "Berline",
      dealership :1,
    },
    {
      id_car :13,
      brand: "Volkswagen",
      price: 19000,
      model: "Golf",
      category: "Citadine",
      dealership :1,
    },
    {
      id_car :14,
      brand: "Volkswagen",
      price: 30000,
      model: "Passat",
      category: "Berline",
      dealership :1,
    },
    {
      id_car :15,
      brand: "Porsche",
      price: 100000,
      model: "Cayenne turbo S",
      category: "SUV",
      dealership :3,
    },
    {
      id_car :16,
      brand: "Porsche",
      price: 150000,
      model: "Panamera",
      category: "Berline",
      dealership :3,
    },
    {
      id_car :17,
      brand: "Bugatti",
      price: 3000000,
      model: "Chiron",
      category: "Berline",
      dealership :3,
    },
    {
      id_car :18,
      brand: "Alpine",
      price: 100000,
      model: "A110",
      category: "Berline",
      dealership :3,
    },
    {
      id_car :19,
      brand: "Bentley",
      price: 300000,
      model: "Continental GT",
      category: "Berline",
      dealership :3,
    },
    {
      id_car :20,
      brand: "Lamborghini",
      price: 230000,
      model: "Aventador",
      category: "Berline",
      dealership :3,
    },
    {
      id_car :21,
      brand: "MacLaren",
      price: 300000,
      model: "720S",
      category: "Berline",
      dealership :3,
    },
    {
      id_car :22,
      brand: "Lotus",
      price: 300000,
      model: "Elise",
      category: "Berline",
      dealership :3,
    },
    {
      id_car :23,
      brand: "Peugeot",
      price: 12000,
      model: "208",
      category: "Citadine",
      dealership :4,
    },
    {
      id_car :24,
      brand: "Peugeot",
      price: 19000,
      model: "308",
      category: "Berline",
      dealership :4,
    },
    {
      id_car :25,
      brand: "Peugeot",
      price: 30000,
      model: "508",
      category: "Berline",
      dealership :4,
    },
    {
      id_car :26,
      brand: "Peugeot",
      price: 39999,
      model: "3008",
      category: "SUV",
      dealership :4,
    },
    {
      id_car :27,
      brand: "Peugeot",
      price: 50000,
      model: "5008",
      category: "Monospace",
      dealership :4,
    },
    {
      id_car :28,
      brand: "Peugeot",
      price: 62999,
      model: "508 SW",
      category: "Break",
      dealership :4,
    },
    {
      id_car :29,
      brand: "Mercedes",
      price: 70000,
      model: "A-Class",
      category: "Citadine",
      dealership :5,
    },
    {
      id_car :30,
      brand: "Mercedes",
      price: 32000,
      model: "B-Class",
      category: "Citadine",
      dealership :5,
    },
    {
      id_car :31,
      brand: "Mercedes",
      price: 87200,
      model: "C-Class",
      category: "Berline",
      dealership :5,
    },
    {
      id_car :32,
      brand: "Mercedes",
      price: 100000,
      model: "E-Class",
      category: "Berline",
      dealership :5,
    },
    {
      id_car :33,
      brand: "Mercedes",
      price: 120000,
      model: "S-Class",
      category: "Berline",
      dealership :5,
    },
    {
      id_car :34,
      brand: "Mercedes",
      price: 150000,
      model: "GLC",
      category: "SUV",
      dealership :5,
    },
    {
      id_car :35,
      brand: "Mercedes",
      price: 200000,
      model: "GLE",
      category: "SUV",
      dealership :5,
    },
    {
      id_car :36,
      brand: "Mercedes",
      price: 239000,
      model: "GLS",
      category: "SUV",
      dealership :5,
    }
  ];


  let resultCar = await db.collection("car").insertMany(carData);
  console.log("*****number of car*****");
  console.log('Inserted documents:', resultCar.insertedCount);

  }




async function getAllEmploye() {
  return await db.collection("employe").find({}).toArray();
}

async function getSizeEmploye() {
  return getAllEmploye().then((result) => {
    return result.length;
  }
  );
  
}

module.exports = { getAllEmploye}


async function getAllDealership() {
  return await db.collection("dealership").find({}).toArray();
}


async function getAllCar() {
  return await db.collection("car").find({}).toArray();
}

async function getEmploye(id_employe) {
  return await db.collection("employe").find({ id_employe: id_employe }).toArray();
}

async function getDealership(id_dealership) {
  return await db.collection("dealership").find({ id_dealership: id_dealership }).toArray();
}

async function getCar(id_car) {
  return await db.collection("car").find({ id_car: id_car }).toArray();
}

async function getCarByDealership(id_dealership) {
  return await db.collection("car").find({ dealership: id_dealership }).toArray();
}

async function getEmployesFromDealership(id) {
  const dealership = await db.collection("dealership").find({ id_dealership: id }).toArray();
  const employees = dealership.map(d => d.employes);
  return employees;
}


async function getDealershipByEmploye(id_employe) {
  return await db.collection("dealership").find({ employes: id_employe }).toArray();
}

async function getDealershipByCar(dealership) {
  return await db.collection("car").find({ dealership : dealership }).toArray();
}

async function getCarByCategory(category) {
  return await db.collection("car").find({ category: category }).toArray();
}

async function getDealershipByDirector(id_director) {
  return await db.collection("dealership").find({ director: id_director }).toArray();
}

async function getAveragePriceByCategory() {
  return await db.collection("car").aggregate([
    {
      $group: {
        _id: "$category",
        averagePrice: { $avg: "$price" }
      }
    }
  ]).toArray();
}


async function getAverageSalaryByDealership() {
  return await db.collection("dealership").aggregate([
    {
      $lookup: {
        from: "employe",
        localField: "id_dealership",
        foreignField: "dealership",
        as: "employe"
      }
    },
    {
      $project: {
        _id: 0,
        id_dealership: "$id_dealership",
        name: "$name",
        averageSalary: { $avg: "$employe.salary" }
      }
    }
  ]).toArray();
  
}


async function getNumberEmployeByDealership() {
  return await db.collection("dealership").aggregate([
    {
      $lookup: {
        from: "employe",
        localField: "id_dealership",
        foreignField: "dealership",
        as: "employe"
      }
    },
    {
      $project: {
        _id: 0,
        id_dealership: "$id_dealership",
        name: "$name",
        numberEmploye: { $size: "$employe" }
      }
    }
  ]).toArray();
  
}



async function getCarByBrand() {
  return await db.collection("car").aggregate([
    {
      $group: {
        _id: "$brand",
        cars: { $push: "$id_car" }
      }
    }
  ]).toArray();
}

async function getRepartitionBySexe() {
  return await db.collection("employe").aggregate([
    {
      $group: {
        _id: "$sexe",
        numberEmploye: { $sum: 1 }
      }
    }
  ]).toArray();
}



//INSERTS FUNCTIONS


async function insertEmploye(employe) {

  //Je recupere l'id du dernier employe pour une auto-incrementation
  const lastEmploye = await db.collection("employe").find({}).sort({ id_employe: -1 }).limit(1).toArray();



  if(lastEmploye != undefined && lastEmploye.length > 0){
    var lastId = JSON.stringify(lastEmploye);
    lastId = Object.values(lastEmploye[0])[1];

  }


  if(lastId == undefined ||  lastId < 0){
    idEmploye = 1;

  }else{
    idEmploye = lastId + 1;
  }
  

 await db.collection("employe").insertOne({
    id_employe: idEmploye,
    name: employe.name,
    sexe: employe.sexe,
    phone: employe.phone,
    email: employe.email,
    poste: employe.poste,
    salary: employe.salary,
    dealership: employe.dealership
 });  
}



async function insertDealership(dealership) {
  const lastDealership = await db.collection("dealership").find({}).sort({ id_dealership: -1 }).limit(1).toArray();

  if(lastDealership != undefined && lastDealership.length > 0){
    var lastId = JSON.stringify(lastDealership);
    lastId = Object.values(lastDealership[0])[1];

  }


  if(lastId == undefined ||  lastId < 0){
    idDealership = 1;
  }else{
    idDealership = lastId + 1;
  }



  await db.collection("dealership").insertOne({
    id_dealership: idDealership,
    name: dealership.name,
    adresse: {
      street : dealership.adresse.street,
      city : dealership.adresse.city,
    },
    phone: dealership.phone,
    email: dealership.email,
    director:  parseInt(dealership.director)
  });
  
}



async function insertCar(car) {
  const lastCar = await db.collection("car").find({}).sort({ id_car: -1 }).limit(1).toArray();

  if(lastCar != undefined && lastCar.length > 0){
    var lastId = JSON.stringify(lastCar);
    lastId = Object.values(lastCar[0])[1];

  }
  
  if(lastId == undefined ||  lastId < 0){
    var idCar = 1;
  }else{
    var idCar = lastId + 1;
  }

  await db.collection("car").insertOne({
    id_car: idCar,
    brand: car.brand,
    price: car.price,
    model: car.model,
    category: car.category,
    dealership: parseInt(car.dealership)
  });
}


// DELETE FUNCTIONS

async function deleteEmploye(id_employe) {
  await db.collection("employe").deleteOne({ id_employe: parseInt(id_employe) });
}

async function deleteDealership(id_dealership) {
  await db.collection("dealership").deleteOne({ id_dealership:  parseInt(id_dealership) });
}

async function deleteCar(id_car) {
  await db.collection("car").deleteOne({ id_car: parseInt(id_car)});
}


//EDIT FUNCTIONS

async function updateEmploye(id_employe, employe) {
  await db.collection("employe").updateOne({ id_employe: parseInt(id_employe) }, { $set: employe });
}

async function updateDealership(id_dealership, dealership) {
  await db.collection("dealership").updateOne({ id_dealership:  parseInt(id_dealership) }, { $set: dealership });
}

async function updateCar(id_car, car) {
  await db.collection("car").updateOne({ id_car: parseInt(id_car) }, { $set: car });
}







run().catch(console.error);

module.exports = {
  getAllEmploye,
  getAllDealership,
  getAllCar,
  getEmploye,
  getDealership,
  getCar,
  getCarByDealership,
  getEmployesFromDealership,
  getDealershipByEmploye,
  getDealershipByCar,
  getCarByCategory,
  getDealershipByDirector,
  getAveragePriceByCategory,
  getAverageSalaryByDealership,
  getNumberEmployeByDealership,
  getRepartitionBySexe,
  getCarByBrand,
  insertEmploye,
  insertDealership,
  insertCar,
  deleteEmploye,
  deleteDealership,
  deleteCar,
  updateEmploye,
  updateDealership,
  updateCar

};
