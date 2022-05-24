import Bar from '@/components/Bar'
import './index.scss'

const Home = () => {

  const xData = ['react', 'vue', 'angular']
  const yData = [30, 40, 50]

  return (
    <div>
      <Bar
        title='主流框架使用满意度'
        xData={xData}
        yData={yData}
        style={{ width: '500px', height: '400px' }} />
      {/* <Bar title='主流框架使用满意度2' xData={xData} /> */}
    </div>
  )
}

export default Home