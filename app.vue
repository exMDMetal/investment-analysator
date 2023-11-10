<script setup lang="ts">
const form = reactive({
  statisticPeriodInYears: 60,
  fondProfitmentInPercent: 10,
  inflationInPercent: 0,
  investmentPerMonth: 3000,
  stopInvestmentAfterXYears: 15,
  initialInvestment: 0,
  startPencionAfterXYears: 17,
  pencionExpectation: 2000,
})

const statisticTable = computed(() => {
  const table = []
  let total = form.initialInvestment
  let totalWithoutInvestment = form.initialInvestment

  const monthProfitment = (form.fondProfitmentInPercent - form.inflationInPercent) / (12 * 100)

  for (let monthNumber = 0; monthNumber < form.statisticPeriodInYears * 12; monthNumber++) {
    const isStopInvestmentTime = form.stopInvestmentAfterXYears && monthNumber > form.stopInvestmentAfterXYears * 12
    const isPensionTime = form.startPencionAfterXYears && monthNumber > form.startPencionAfterXYears * 12
    const investment = isStopInvestmentTime ? 0 : form.investmentPerMonth
    const pencion = isPensionTime ? form.pencionExpectation : 0

    if (investment) {
      totalWithoutInvestment += investment
      total += investment
    }

    if (pencion) {
      totalWithoutInvestment -= pencion
      total -= pencion
    }

    total += total * monthProfitment

    const profit = total - totalWithoutInvestment
    const profitPercent = (100 * profit / totalWithoutInvestment)

    table.push({
      year: (new Date().getFullYear() + Math.floor(monthNumber / 12)).toString(),
      month: new Date(new Date().getFullYear(), monthNumber, 1).toLocaleString('default', { month: 'long' }),
      investment,
      total,
      totalWithoutInvestment,
      profit: total - totalWithoutInvestment,
      profitPercent: isNaN(profitPercent) ? '-' : profitPercent.toFixed(2) + ' %',
      pencion
    })
  }

  return table
})

const camelCaseToTitleCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}

const inputTypeByValue = (value: string | number) => {
  if (typeof value === 'number') return 'number'
  return 'text'
}

const formatCell = (priceOrText: number | string) => {
  if (typeof priceOrText === 'number') {
    return priceOrText.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  } else {
    return priceOrText
  }
}

const report = computed(() => {
  return statisticTable.value.length && {
    ...statisticTable.value.at(-1),
    investedMoney: form.initialInvestment + form.investmentPerMonth * form.stopInvestmentAfterXYears * 12
  }
})
</script>
<template>
<h2>Configuration</h2>
<form action="#">
  <div v-for="(idx, key) in form" class="form-group">
    <label :for="key">{{ camelCaseToTitleCase(key) }}</label>
    <input :type="inputTypeByValue(form[key])" v-model="form[key]" class="form-control"/>
  </div>
</form>
<h2>Report</h2>
<table v-if="report">
  <thead>
    <tr>
      <th v-for="(idx, column) in report">
        {{ camelCaseToTitleCase(column) }}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td v-for="(idx, column) in report">
        {{ formatCell(report[column]) }}
      </td>
    </tr>
  </tbody>
</table>
<h2>Statistics</h2>
<table>
  <thead>
    <tr>
      <th v-for="(idx, column) in statisticTable.at(0)">
        {{ camelCaseToTitleCase(column) }}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in statisticTable">
      <td v-for="(idx, column) in row">
        {{ formatCell(row[column]) }}
      </td>
    </tr>
  </tbody>
</table>
</template>
<style>
  /* Add your styles here */
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: raw;
    gap: 0.5rem;
  }

  label {
    font-weight: bold;
    width: 300px;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 0.5rem;
    text-align: left;
    border: 1px solid #ccc;
  }

  th {
    background-color: #eee;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
