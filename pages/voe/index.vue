<script setup lang="ts">
const route = useRoute()
const { disconnectionTable, loadVoe } = useVoe()

onMounted(() => {
    loadVoe({ house: route.query.house as string, turn: route.query.turn as string | undefined })
})
</script>

<template>
  <div>
    <h1>Дані з Вінниця обл енерго</h1>
    <div class="disconnection-detailed-table-container">
      <template v-for="(cell, index) in disconnectionTable" :class="cell.classList" :key="index">
        <div :class="cell.classList">{{ cell.classList.includes('cell') ? '' : cell.text }}</div>
      </template>
    </div>
  </div>
</template>

<style>
@media screen and (min-width: 1215px) {
    .views-site-search .views-field-counter {
        font-size:1.8181818182rem;
        font-weight: 800
    }
}

.views-site-search .views-field-title {
    flex: 1;
    font-weight: 700;
    color: #0D4A6E
}

.views-site-search .views-field-title a {
    background: linear-gradient(to right,currentColor 0%,currentColor 100%) no-repeat 0 bottom;
    background-size: 0 1px;
    text-decoration: none;
    transition-duration: 0.2s
}

.views-site-search .views-field-title a:hover {
    background-size: 100% 1px
}

.views-site-search .views-field-body {
    margin: 0.6818181818rem 0 0;
    font-size: 0.875rem;
    font-weight: 400;
    width: 100%;
    color: #718096
}

@media screen and (min-width: 1215px) {
    .views-site-search .views-field-body {
        font-size:0.8181818182rem;
        font-weight: 400
    }
}

@media screen and (min-width: 768px) {
    .disconnection-detailed-search-form .form-radios--search-type {
        display:flex;
        margin: 0 -0.2272727273rem
    }
}

@media screen and (min-width: 768px) {
    .disconnection-detailed-search-form .form-radios--search-type .form__item {
        flex:1;
        padding: 0 0.2272727273rem
    }
}

.disconnection-detailed-search-form .form-radios--search-type .form__item label {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    padding: 10px 25px;
    background: #F25E1D;
    color: #fff;
    text-align: center;
    font-weight: 500;
    height: 100%
}

@media screen and (min-width: 1215px) {
    .disconnection-detailed-search-form .form-radios--search-type .form__item label {
        min-height:2.7272727273rem;
        padding: 0.4545454545rem 1.1363636364rem;
        transition: 0.2s
    }

    .disconnection-detailed-search-form .form-radios--search-type .form__item label:hover {
        background: #568099
    }
}

.disconnection-detailed-search-form .form-radios--search-type .form__item label:before,.disconnection-detailed-search-form .form-radios--search-type .form__item label:after {
    display: none
}

.disconnection-detailed-search-form .form-radios--search-type .form__item input:checked+label {
    background: #0D4A6E
}

.disconnection-detailed-search-form .fields_wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.2272727273rem 25px
}

.disconnection-detailed-search-form .fields_wrapper .form__item {
    padding-left: 0.2272727273rem;
    padding-right: 0.2272727273rem;
    width: 100%;
    flex-grow: 1;
    min-width: 0
}

@media screen and (min-width: 480px) {
    .disconnection-detailed-search-form .fields_wrapper .form__item {
        width:50%
    }
}

@media screen and (min-width: 768px) {
    .disconnection-detailed-search-form .fields_wrapper .form__item {
        width:33.333%
    }
}

@media screen and (min-width: 1215px) {
    .disconnection-detailed-search-form .fields_wrapper .form__item--street {
        width:40%
    }
}

@media screen and (min-width: 1215px) {
    .disconnection-detailed-search-form .fields_wrapper .form__item--house {
        width:10%
    }
}

.disconnection-detailed-search-form .fields_wrapper .form-actions {
    width: 100%
}

.disconnection-detailed-search-form .fields_wrapper .form-actions:not(:has(button[style="display: none;"])) {
    padding-left: 0.2272727273rem;
    padding-right: 0.2272727273rem
}

@media screen and (min-width: 480px) {
    .disconnection-detailed-search-form .fields_wrapper .form-actions {
        width:auto
    }
}

.disconnection-detailed-search-form .fields_wrapper .form-actions .form-submit {
    width: 100%
}

.disconnection-detailed-search-form .table_wrapper+.table_wrapper {
    margin-top: 25px
}

.disconnection-detailed-search-form .form-actions {
    margin: 0
}

.disconnection-detailed-table-message {
    padding: 25px;
    border: 1px solid #F25E1D;
    margin-bottom: 25px;
    background: #EDF2F7
}

.disconnection-detailed-table-message a {
    color: #F25E1D
}

@media screen and (min-width: 1215px) {
    .disconnection-detailed-table-message {
        padding:1.1363636364rem;
        margin-bottom: 1.1363636364rem
    }
}

.disconnection-detailed-table-container {
    grid-template-rows: max-content repeat(24,30px);
    grid-auto-flow: column;
    display: grid;
    gap: 1px
}

.disconnection-detailed-table-cell {
    background: #F7FAFC;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column
}

.disconnection-detailed-table-cell .disconnection {
    display: none
}

.disconnection-detailed-table-cell.grey {
    background: #EDF2F7
}

.disconnection-detailed-table-cell.legend {
    writing-mode: vertical-rl;
    font-size: 14px;
    font-weight: 700;
    padding: 7px 0;
    text-transform: capitalize
}

.disconnection-detailed-table-cell.legend.current_day {
    background: #F25E1D;
    color: #fff
}

.disconnection-detailed-table-cell .date-day {
    text-transform: capitalize
}

.disconnection-detailed-table-cell.head {
    font-size: 12px;
    font-weight: 700;
    padding: 3px
}

.disconnection-detailed-table-cell.has_disconnection {
    background: #E2E8F0
}

.disconnection-detailed-table-cell.has_disconnection:before {
    content: "X";
    line-height: 1;
    font-family: icomoon;
    font-weight: normal;
    font-size: 18px
}

@media screen and (min-width: 1215px) {
    .disconnection-detailed-table-cell.has_disconnection:before {
        font-size:1.0909090909rem
    }
}

.disconnection-detailed-table-cell.has_disconnection.confirm_1 {
    background: #F25E1D
}

.disconnection-detailed-table__empty {
    padding: 15px 0;
    font-weight: bold;
    color: #F25E1D
}

@media screen and (min-width: 1215px) {
    .disconnection-detailed-table__empty {
        padding:1.1363636364rem 0
    }
}

.mark-desciption {
    padding: 25px 0
}

.searched {
    background: #fffb3e;
    display: inline-block;
    color: #000;
    padding: 0px 4px;
    text-decoration: none
}

.searched:focus {
    background: #ff9240
}

.scroll-top {
    width: 45px;
    height: 45px;
    position: fixed;
    z-index: 10;
    bottom: 65px;
    right: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s,color 0.3s,background 0.3s;
    background: #fff;
    box-shadow: 0px 0px 30px 0px rgba(60,63,65,0.06);
    cursor: pointer;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    color: #0D4A6E
}

@media screen and (min-width: 1215px) {
    .scroll-top {
        bottom:1.1363636364rem;
        right: 1.1363636364rem;
        width: 2.4545454545rem;
        height: 2.4545454545rem;
        display: flex
    }

    .scroll-top:hover {
        background: #0D4A6E;
        color: #fff
    }
}

.scroll-top::before {
    line-height: 1;
    font-family: icomoon;
    font-weight: normal;
    content: ""
}

.scroll-top.is-sticky {
    position: absolute;
    bottom: auto;
    top: 0;
    left: 50%;
    transform: translate(-50%,-50%)
}

@media screen and (min-width: 1215px) {
    .scroll-top.is-sticky {
        left:10.7727272727rem;
        transform: translate(-50%,-1.2272727273rem)
    }
}

.scroll-top.is-visible {
    opacity: 1;
    visibility: visible
}

.technical_works {
    text-align: center;
    font-size: 1.125rem;
    font-weight: 700
}

@media screen and (min-width: 1215px) {
    .technical_works {
        font-size:1.1818181818rem;
        font-weight: 700
    }
}

@media screen and (min-width: 768px) and (min-width:992px) {
    .disconnection-detailed-table-container {
        grid-template-columns:max-content repeat(24,auto);
        grid-auto-flow: row;
        grid-template-rows: initial
    }

    .disconnection-detailed-table-cell.head {
        writing-mode: vertical-rl;
        padding: 0.7727272727rem 0.2272727273rem;
        font-size: 0.8181818182rem
    }

    .disconnection-detailed-table-cell.legend {
        writing-mode: initial;
        font-size: 0.8181818182rem;
        width: 6.5454545455rem;
        padding: 0.4545454545rem 0.9090909091rem
    }
}
</style>