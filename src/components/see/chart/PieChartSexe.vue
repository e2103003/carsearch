<template>
  <div class="container container-sm"  style="width: 60%;">
    <h2 class="text-center">Repartition of sexe by employes</h2>
    <Pie v-if="loaded" :data="chartData" />
  </div>
</template>
  
<script>
import axios from 'axios'

import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChartSexe',
  components: { Pie },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  async mounted() {
    this.loaded = false
    try {
      const response = await axios.get('http://localhost:3000/getrepartitionbysexe')
      this.chartData = {
        labels:  response.data.map(item =>  item._id  ),
        datasets: [
          {
            label: 'Number of employees by dealership',
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ],
            data: response.data.map(item => item.numberEmploye)
          }
        ]
      }
      this.loaded = true
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
