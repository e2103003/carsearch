<template>
  <div class="container container-sm"  style="width: 70%;">
    <h2 class="text-center">Bar chart of the average salary by dealership</h2>
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>
  
<script>
import axios from 'axios'

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChartAvgPrice',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
    listOfColors: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(255, 99, 132, 0.6)',
    ]
  }),
  async mounted() {
    this.loaded = false
    try {
      const response = await axios.get('http://localhost:3000/getaveragesalarybydealership')

      this.chartData = {
        labels: response.data.map(item => item.name + ' (id :' +  item.id_dealership + ')' ),
        datasets: [
          {
            label: 'Average salary by dealership',
            backgroundColor: this.listOfColors,
            data: response.data.map(item => (Math.round(item.averageSalary * 100) / 100))
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
