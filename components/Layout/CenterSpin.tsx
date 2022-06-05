import { Spin } from 'antd';

const CenterSpin = () => {
  return (
    <div className="flex h-screen">
    <div className="m-auto">
        <Spin size='large'/>
    </div>
  </div>
  )
}

export default CenterSpin