<template>
  <div>
    <div style="margin: 20px; font-size: 1.5em;">
      今日核心数据
    </div>
    <div style="display: flex; justify-content: space-between;">
      <div v-for="info in [{a: '入库',b: 'inbound'}, {a: '出库',b: 'outbound'}]" :key="info.b" class="statistic-container">
        <div class="title">
          {{info.a}}
        </div>
        <div class="num">
          {{packStatistic[info.b]}}
        </div>
      </div>
    </div>
    <div ref='info' style="width: 100%; height: calc(100vh - 233px); padding: 50px;"/>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
import request from '../utils/request.js'
import { inject, onMounted, ref } from 'vue'

const echarts = inject('echarts')
const store = useStore()
const { totalStatistic } = storeToRefs(store)
const info = ref(null)
onMounted(() => {
  const userEc = echarts.init(info.value)
  let resizeTimer = null
  const resizeHandler = () => {
    if (resizeTimer) return
    resizeTimer = setTimeout(async () => {
      userEc.resize()
      resizeTimer = null
    }, 200)
  }
  window.addEventListener('resize', resizeHandler)
  request.get('/statistic').then(res => {
    totalStatistic.value = res.data.reverse()
    packStatistic.value = {
      inbound: totalStatistic.value[6].inbound,
      outbound: totalStatistic.value[6].outbound
    }
    const option = {
      title: {
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['入库', '出库']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: (() => {
          const arr = []
          for(let i = 6; i >= 0; i--) {
            arr.push(new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString())
          }
          return arr
        })()
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '入库',
          type: 'line',
          data: (() => {
            const arr = []
            try{
              for(let i = 0; i < 7; i++) {
                arr.push(totalStatistic.value[i].inbound)
              }
            }catch (err) {}
            return arr
          })(),
          smooth: true
        },
        {
          name: '出库',
          type: 'line',
          data: (() => {
            const arr = []
            try{
              for(let i = 0; i < 7; i++) {
                arr.push(totalStatistic.value[i].outbound)
              }
            }catch (err) {}
            return arr
          })(),
          smooth: true
        }
      ]
    }
    userEc.setOption(option)
  })
})
const packStatistic = ref({
  inbound: '-',
  outbound: '-'
})
</script>

<style lang="scss">
.statistic-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .num {
    margin-top: 10px;
    font-size: 1.5em;
  }
}
</style>
