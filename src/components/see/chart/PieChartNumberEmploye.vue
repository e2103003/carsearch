<template>
  <div class="container container-sm"  style="width: 60%;">
    <h2 class="text-center">Number of employees by dealership</h2>
    <Pie v-if="loaded" :data="chartData" style="width: 10%; height: 10%;" />
  </div>
</template>
  
<script>
import axios from 'axios'

import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'BarChartAvgPrice',
  components: { Pie },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  async mounted() {
    this.loaded = false
    try {
      const response = await axios.get('http://localhost:3000/getnumberemployebydealership')
      
      this.chartData = {
        labels:  response.data.map(item =>  item.name  ),
        datasets: [
          {
            label: 'Number of employees by dealership',
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
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
