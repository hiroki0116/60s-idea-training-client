import  Image from 'next/image' 
import { useContext } from 'react';
import MotionDiv from 'components/Layout/MotionDiv';
import {ExerciseContext} from 'context/exerciseContext';
// third parties
import BulbTwoTone from '@ant-design/icons/BulbTwoTone';
import TagTwoTone from '@ant-design/icons/TagTwoTone'
import AutoComplete from 'antd/lib/auto-complete'
import Input from 'antd/lib/input';
import Button from 'antd/lib/button'
// utils
import { IDEA_IMAGE, CATEGORIES } from 'utils/constants'

const FirstSection = () => {
    const { showFirstSection, handleNext, topicTitle, setTopicTitle, category, setCategory } = useContext(ExerciseContext);

    const handleChange = (value) => {
        setCategory(value);
    }

    const handleSelect = (value) => {
        setCategory(value);
    }

  return (
    showFirstSection ? (
        <div className='flex flex-col mt-5'>
            {topicTitle && topicTitle.length ? (
                <MotionDiv>
                    <div className='flex justify-center'>
                        <h3 className='my-1 text-lg font-bold px-5 py-2 bg-blue-100 rounded-lg dark:bg-slate-900 dark:text-green-400'>{topicTitle}</h3>
                    </div>
                </MotionDiv>
            ) : null}
            {category && category.length ? (
                <MotionDiv>
                    <div className='flex justify-center'>
                        <h3 className='my-2 font-bold px-5 py-2 bg-red-50 rounded-lg uppercase dark:bg-slate-700 dark:text-green-500'>{category}</h3>
                    </div>
                </MotionDiv>
            ) :null}
            <div className='flex justify-center dark:hidden'>
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
            <div className='mt-5 self-center'>
                <AutoComplete
                    dataSource={CATEGORIES}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    allowClear
                    >
                    <Input
                        style={{ borderRadius:'0.85rem' }}
                        prefix={<TagTwoTone />}
                        placeholder=' Choose category'
                    />
                </AutoComplete>
            </div>
            <Button 
                type='primary' 
                shape='round' 
                className='self-center mt-10 h-10 w-28 dark:text-green-400' 
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