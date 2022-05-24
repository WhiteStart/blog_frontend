// 封装图标bar组件
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const charInit = (node, xData, yData, title) => {
  const myChart = echarts.init(node.current)
  // 绘制图表
  myChart.setOption({
    title: {
      // 'ECharts 入门示例'
      text: title
    },
    tooltip: {},
    xAxis: {
      // ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        // [5, 20, 36, 10, 10, 20]
        data: yData
      }
    ]
  })
}

function Bar ({ title, xData, yData, style }) {
  const domRef = useRef()

  useEffect(() => {
    charInit(domRef, xData, yData, title)
  }, [xData, yData, title])

  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Bar