export default {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Festivals & Articles'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    title: {
      text: 'Income'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: false
    }
  }
  // series: [{
  //   type: 'pie',
  //   allowPointSelect: true,
  //   keys: ['name', 'y', 'selected', 'sliced'],
  //   data: [
  //       ['Festivals', 29.9],
  //       ['Articles', 71.5]
  //   ],
  //   showInLegend: true
  // }]
}
