import { useState, useContext, useRef, useEffect } from 'react';
import {ExerciseContext} from 'context/exerciseContext';
import CountDownTimer from './CountDownTimer';
import BulbTwoTone from '@ant-design/icons/BulbTwoTone';
import { Button, Input, Tag } from 'antd';
const { TextArea } = Input;

const SubmitSection = () => {
    const { topicTitle, showSubmitSection,isPlaying, setIsPlaying, ideas, setIdeas } = useContext(ExerciseContext);
    const [ideaValue, setIdeaValue] = useState<string>('');

    const inputRef = useRef<any>(null);

    const handleAdd = (e) => {
        if(e.keyCode == 13){
            e.preventDefault();
        }
        let inputValue = ideaValue.trim();
        if(inputValue.length){
            setIdeas([...ideas,inputValue]);
            if (inputRef?.current) inputRef?.current?.focus();
            setIdeaValue('')
        }
    };

    const handleEnter = () => setIsPlaying(true);
    const handeOnChange = (e) => setIdeaValue(e.target.value);

    useEffect(()=>{
      if(isPlaying && inputRef?.current) inputRef?.current?.focus();
    },[isPlaying])

    // useEffect(() => {
    //   window.addEventListener('keydown', handleSpace);
    
    //   return () => {
    //     window.removeEventListener('keydown', handleSpace);
    //   };
    //   // eslint-disable-next-line
    // }, []);

  return (
    showSubmitSection ? (
        <div className='flex flex-col mt-5'>
          <div className='flex justify-center'>
              {topicTitle.length ? <h3 className='my-1 text-lg font-bold px-5 py-2 bg-blue-100 rounded-lg uppercase shadow'>{topicTitle}</h3> : null}
          </div>
          <div className='flex justify-center my-5'>
            <CountDownTimer />
          </div>
          <Button
            className='uppercase tracking-wide w-20 self-center shadow'
            shape='round'
            type='primary'
            disabled={isPlaying}
            onClick={handleEnter}
          >
            Start
          </Button>
          <div className='text-xs text-gray-400 text-center pt-1'>Click START or Press Space Key</div>
          <div className='self-center w-2/3 mt-5' hidden={!isPlaying}>
            <TextArea
              placeholder='Enter your ideas'
              style={{borderRadius:'0.5rem'}}
              className={`bg-blue-100 border-blue-200 shadow-lg`}
              allowClear
              onPressEnter={handleAdd}
              value={ideaValue}
              onChange={handeOnChange}
              ref={inputRef}
              showCount
              bordered={false}
            />
          </div>
          {ideas.length ? (
            <ul className='px-2 mb-5 font-bold tracking-wide text-16 whitespace-normal flex flex-wrap'>
                {ideas.map((idea,index)=> (
                <li key={index}>
                    <Tag 
                        color={'geekblue'}
                        style={{borderRadius:'0.5rem',verticalAlign: 'middle',marginTop:'10px'}}
                        closable
                    >
                        <BulbTwoTone style={{verticalAlign: 'middle'}}/> {idea}
                    </Tag>
                </li>
                ))}
            </ul>
            ) : null
          }
        </div>
      ) : null
  )
}
export default SubmitSection