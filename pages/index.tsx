import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import CustomNavBar from 'components/Layout/CustomNavBar';


const Home: NextPage = () => {
  return (
    <div className='pt-52'>
      <h1>This is a top page</h1>
      <h3 className='text-lg'>The basis of next.js</h3>
      <Button variant="outlined" color="primary">Hello World
      </Button>
    </div>
  )
}

export default Home
