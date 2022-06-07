import { useContext } from 'react';
import {ExerciseContext} from 'context/exerciseContext';
import BulbTwoTone from '@ant-design/icons/BulbTwoTone';
import { Input, Button } from 'antd';
import { IDEA_IMAGE } from 'utils/constants'
import  Image from 'next/image' 

const FirstSection = () => {
    const { showFirstSection, handleNext, topicTitle, setTopicTitle } = useContext(ExerciseContext);

  return (
    showFirstSection ? (
        <div className='flex flex-col mt-10'>
            <div className='flex justify-center'>
                {topicTitle.length ? <h3 className='my-1 text-lg font-bold px-5 py-2 bg-blue-100 rounded-lg uppercase'>{topicTitle}</h3> : null}
            </div>
            <div className='flex justify-center'>
                <Image width={200} height={200} src={IDEA_IMAGE} alt='Idea image'/>
            </div>
            <div className='mt-5 w-2/3 self-center'>
                <Input 
                    allowClear
                    size='large'
                    prefix={<BulbTwoTone />}
                    value={topicTitle}
                    onChange={(e)=>setTopicTitle(e.target.value)}
                    placeholder=' Enter your topic here'
                    style={{borderRadius:'0.85rem'}}
                />
            </div>
            <Button 
                type='primary' 
                shape='round' 
                className='self-center mt-10 h-10 w-28' 
                onClick={handleNext}
                disabled={!topicTitle.length}
            >
                Next
            </Button>
        </div>
      ) : null
  )
}

export default FirstSection