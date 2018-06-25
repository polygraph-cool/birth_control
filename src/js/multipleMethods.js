import './pudding-chart/multipleMethods-template'

let data = null

// selections
const $multiple = d3.selectAll('.multiple_methods')

let charts = null

const fullNames = [{
  short: '3',
  full: 'The Pill',
  failure: 9
}, {
  short: '4',
  full: 'Condom',
  failure: 18
}, {
  short: '6',
  full: 'Female Sterilization',
  failure: 0.5
}, {
  short: '7',
  full: 'Withdrawal',
  failure: 22
}, {
  short: '8',
  full: 'Depo-Provera',
  failure: 6
}, {
  short: '10',
  full: 'Calendar Method',
  failure: 24
}, {
  short: '12',
  full: 'Diaphragm',
  failure: 12
}, {
  short: '19',
  full: "IUD",
  failure: 0.8
}, {
  short: '20',
  full: 'Emergency',
  failure: 10
}]


const fullNameMap = d3.map(fullNames, d => d.short)

function cleanData(arr){
  return arr.map((d, i) => {
    return {
      ...d,
      m1: d.m1,
      name1: fullNameMap.get(d.m1).full,
      m2: d.m2,
      name2: fullNameMap.get(d.m2).full,
      uniqueR: +d.uniqueR,
      effectiveness1: 100 - fullNameMap.get(d.m1).failure,
      effectiveness2: 100 - fullNameMap.get(d.m2).failure,
    }
  })
}

function setupChart(){
  const fullData = data.map(d => {
    return {
      ...d,
      annotation: {values: [d.name1, "+", d.name2]},
    }
  })

  const $sel = $multiple
  charts = $sel
    .selectAll('.graphic')
    .datum([fullData, fullNames])
    .multipleMethods()
}

function resize() {
  charts.resize()
  charts.render()
}

function init() {
  return new Promise((resolve) => {
    d3.loadData('assets/data/multipleMethods.csv', (err, response) => {
      data = cleanData(response[0])
      setupChart()
      resolve()
    })
  })
}
export default { init, resize };
