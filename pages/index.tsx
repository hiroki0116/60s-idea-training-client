import type { NextPage } from 'next'
import CustomNavBar from 'components/Layout/CustomNavBar';

import { Button } from 'antd';


const Home: NextPage = () => {
  return (
    <div className='pt-52'>
      <h1>This is a top page</h1>
      <h3 className='text-lg'>The basis of next.js</h3>
      <Button type="primary" >Hello World
      </Button>
    </div>
  )
}

export default Home
