<template>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>

  <body>
    <!--NAVBAR-->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/" style="color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-car-front-fill" viewBox="0 0 16 16" style="margin-right: 5px;">
            <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
          </svg>
          <strong>Dealership data</strong>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">See data</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/see-employees">Employees</a></li>
                <li><a class="dropdown-item" href="/see-cars">Cars</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">More data</a>
            </li>
          </ul>
        </div>
      </div>
      <input type="search" v-model="filter" class="form-control" style="width: 300px; height: 45px;" @input="filterdealerships()" placeholder="Search by name">

    </nav>

   
    <!--TABLE-->
    <div class="justify-content-center" style="margin-top: 60px;">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Add. street</th>
            <th scope="col">Add. city</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Director</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dealership, k) in filter_dealerships" :key="k">
            <td>
              <p>{{ dealership.id }}</p>
            </td>
            <td>
              <p>{{ dealership.name }}</p>
            </td>
            <td>
              <p>{{ dealership.adresse.street }}</p>
            </td>
            <td>
              <p>{{ dealership.adresse.city }}</p>
            </td>
            <td>
              <p>{{ dealership.phone }}</p>
            </td>
            <td>
              <p>{{ dealership.email }}</p>
            </td>
            <td>
              <p>{{ dealership.director }}</p>
            </td>
            <td>
              <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal" @click="editDealership(dealership.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </button>
              <button type="button" class="btn btn-danger ms-3" @click="deleteDealership(dealership.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>                  </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--ADD BUTTON-->
    <button type="button" class="btn btn-primary position-fixed bottom-0 end-0 mb-3 me-3"
      style="width:60px; height:60px; border-radius:45px;" title="Add new dealership"
      data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus" width="64" height="64" viewBox="0 0 30 24">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>

    <!--FORMULARY-->

    <div id="modal" class="modal" tabindex="-1">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="id" class="modal-title">Edit Dealership</h5>
              <h5 v-else class="modal-title">New Dealership</h5>
              <button type="button" class="btn-close" @click="resetModal()" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!--ERROR MESSAGE-->
              <div v-if="alertVisibility" class="alert alert-danger alert-dismissible fade show">
                <strong>Error!</strong> Information missing or incorrect
                <button type="button" class="btn-close" @click="setErrorVisibility(false)"></button>
              </div>
              <form>
                <!--NAME-->
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" id="name" v-model="name" aria-describedby="name" placeholder="Name">
                </div>
                <div class="d-flex">
                  <!--ADRESS-->
                  <div class="form-group w-50" style="margin-right:2px;">
                    <label for="street">Street</label>
                    <input type="text" class="form-control" id="street" v-model="street" aria-describedby="street" placeholder="Street">
                  </div>
                  <!--SALARY-->
                  <div class="form-group w-50" style="margin-left:2px;">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" v-model="city" aria-describedby="city" placeholder="City" >
                  </div>
                </div>
                <!--PHONE-->
                <div class="form-group">
                  <label for="phone">Phone number</label>
                  <input type="number" class="form-control" id="phone" v-model="phone" aria-describedby="phone" placeholder="Phone number">
                </div>
                <!--EMAIL-->
                <div class="d-flex">

                  <div class="form-group w-75 me-2">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" id="email" v-model="email" aria-describedby="email" placeholder="Email">
                  </div>
                  <div class="form-group w-50">
                    <label for="email">Director</label>
                    <input type="number" class="form-control" id="director" v-model="director" aria-describedby="director" placeholder="Director">
                  </div>
                </div>
                
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="resetModal()" data-bs-dismiss="modal">Close</button>
              <button v-if="id" type="button" id="update" class="btn btn-primary" @click="createDealership()" data-bs-dismiss="modal">Update</button>
              <button v-else type="button" id="create" class="btn btn-primary" @click="createDealership()" data-bs-dismiss="modal">Create</button>
            </div>
          </div>
        </div>
      </div>





  </body>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SeeDealerships',
  props: {
    msg: String
  },
  data() {
    return {
      filter: "",
      dealerships: [],
      filter_dealerships: [],
      current: [],
      alertVisibility: false,

      id: "",
      name: "",
      street: "",
      city: "",
      phone: "",
      email: "",
      director: ""
    }
  },
  methods: {
    loadDealerships() {
      axios.get("http://localhost:3000/getalldealership/").then(response => {
        this.dealerships = [];

        this.current = response.data;
        console.log(this.current.length)

        for (var i = 0; i < this.current.length; i++) {
          this.dealerships.push({
            id: this.current[i].id_dealership,            
            name: this.current[i].name,
            adresse: {
              street: this.current[i].adresse.street,
              city: this.current[i].adresse.city
            },
            phone: this.current[i].phone,
            email: this.current[i].email,
            director: this.current[i].director
          })

        }
        this.filter_dealerships = this.dealerships;
      }).catch(error => {
        console.error(error)
      })
    },
    filterdealerships() {
      if (this.filter != "") {
        this.filter_dealerships = []
        for (var i = 0; i < this.dealerships.length; i++) {
          if (this.dealerships[i].name.toLowerCase().includes(this.filter.toLowerCase())) {
            this.filter_dealerships.push(this.dealerships[i]);
          }
        }
      } else {
        this.filter_dealerships = this.dealerships;
      }
    },
    createDealership() {

      if(this.id != "" ){
        this.updateDealership(this.id)
      } else if(this.name != "" && this.street != "" && this.city != "" && this.phone != "" && this.email != "" && this.director != "") {
        axios.post('http://localhost:3000/insertdealership',{
          name:this.name,
          phone:this.phone,
          adresse:{
            street:this.street,
            city:this.city
          },
          email:this.email,
          director:this.director
        });
        this.resetModal()
        this.loadDealerships()
      } else {
        this.setErrorVisibility(true)
      }
    },
    resetModal() {
      this.setErrorVisibility(false),
      this.name = "",
      this.street = "",
      this.city = "",
      this.phone = "",
      this.email = "",
      this.director = ""
      
    },
    setErrorVisibility(val) {
      this.alertVisibility = val
    },
    updateDealership(id_dealership) {
      axios.put('http://localhost:3000/updatedealership/' + id_dealership,{
        name:this.name,
        adresse:{
          street:this.street,
          city:this.city
        },
        phone:this.phone,
        email:this.email,
        director:this.director
      });
    },
    deleteDealership(id) {
      axios.delete('http://localhost:3000/deletedealership/' + id,{
        id:id
      });
    },
    editDealership(id) {
      for (var i = 0; i < this.dealerships.length; i++) {
        if (this.dealerships[i].id == id) {
          this.id = this.dealerships[i].id
          this.name = this.dealerships[i].name
          this.street = this.dealerships[i].adresse.street
          this.city = this.dealerships[i].adresse.city
          this.phone = this.dealerships[i].phone
          this.email = this.dealerships[i].email
          this.director = this.dealerships[i].director
        }
      }
    }

  },
  mounted() {
    this.loadDealerships()
  }
}
</script>
