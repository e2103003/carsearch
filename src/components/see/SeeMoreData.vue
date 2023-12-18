<template>
     <!--NAVBAR-->
     <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/" style="color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-car-front-fill" viewBox="0 0 16 16" style="margin-right: 5px;">
            <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
          </svg>
          <strong>More data</strong>
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
                <li><a class="dropdown-item" href="/see-dealerships">dealerships</a></li>
                <li><a class="dropdown-item" href="/see-cars">Cars</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>



<div class="container-fluid" style="margin-top: 30px;">
    <div class="row justify-content-center px-5 pt-5">
        <div class="col border-bottom">
            <BarChartAvgPrice />
        </div>
        <div class="col border-start border-bottom">
            <BarChartAvgSalary />
        </div>
    </div>
    <div class="row justify-content-center px-5 pd-5 " >
        <div class="col border-end" >
            <PieChartSexe/>
        </div>
        <div class="col " >
            <PieChartNumberEmploye />
        </div>

    </div>
</div>



    
</template>




<script>
//import axios from 'axios'
import BarChartAvgPrice from './chart/BarChartAvgPrice.vue'
import PieChartNumberEmploye from './chart/PieChartNumberEmploye.vue'
import PieChartSexe from './chart/PieChartSexe.vue'
import BarChartAvgSalary from './chart/BarChartAvgSalary.vue'

export default {
    name: 'SeeMoreData',
    props: {
        msg: String
    },
    data() {
        return {
            priceByCategory: [],
            current: [],
            alertVisibility: false,
            alertMessage: "",
            alertType: "",
            
        }
    },
    methods: {
        goToSeeEmployees() {
            this.$router.push('/see-employees')
        },
        goToSeeConcessions() {
            this.$router.push('/see-concessions')
        },
        goToSeeCars() {
            this.$router.push('/see-cars')
        },
        goToSeeMoreData() {
            this.$router.push('/see-more-data')
        }
    },
    components: {
        BarChartAvgPrice,
        BarChartAvgSalary,
        PieChartNumberEmploye,
        PieChartSexe,

    }
}


</script>