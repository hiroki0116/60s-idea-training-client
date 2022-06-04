import { useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { motion } from 'framer-motion';
import { fadeInUp } from 'utils/animations';
//Components
import CountDownTimer from './CountDownTimer';
import IdeasInput from './IdeasInput';
//API service
import {handleSubmitIdeas} from 'services/exercise';
//Icons
import TagOutlined from '@ant-design/icons/TagOutlined';

type FormValues = {
    topicTitle: string;
    ideas: string[];
}

const ExerciseMain = () => {
    const [form] = Form.useForm();
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [topicText, setTopicText ] = useState('');
    const [ideaValue, setIdeaValue] = useState<string>('')

    const handlePlay = () => {setIsPlaying(true)};
    const handleReset = () => {
        form.resetFields();
        setIsPlaying(false);
        setTopicText('');
    };
    const handleDisabled = (e) => {
        e.preventDefault();
        setTopicText(e.target.value)
        if(e.target.value!=='')setIsDisabled(false);
        else setIsDisabled(true);
    };
    const handleSubmit = async()=> {
        setLoading(true)
        setIsPlaying(false);
        const formValues:FormValues = form.getFieldsValue();
        try {
           const ideas = await handleSubmitIdeas(formValues.topicTitle, formValues.ideas);
            setTimeout(() =>handleReset(), 1000)
            message.success("Successfully submitted!")
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setLoading(false);
        }
    }


  return (
      <Spin spinning={loading}>
        <motion.div
            initial='initial'
            animate='animate'
            variants={fadeInUp}
            className='grid grid-cols-1 justify-items-center w-full'
        >
            <CountDownTimer {...{isPlaying, handleSubmit}}/>
            <Button 
                type='primary' 
                shape='round' 
                className='tracking-widest rounded-lg mt-5'
                onClick={handlePlay}
                disabled={isDisabled}
            >
                START
            </Button>
            <Form form={form} >
                <span className='font-bold tracking-wider'>TOPIC:</span>
                <Form.Item  name='topicTitle'>
                    <Input 
                        placeholder='Enter any topic before you start'
                        style={{borderRadius:'0.5rem', width:'500px'}}
                        prefix={<TagOutlined />}
                        allowClear
                        onBlur={handleDisabled}
                        onChange={handleDisabled}
                        disabled={isPlaying}
                    />
                </Form.Item>
                {topicText ? (
                    <div className='bg-blue-100 rounded-lg py-1 px-2 mb-5 font-bold tracking-wide text-16 whitespace-normal h-auto'>
                        {topicText}
                    </div>
                ) : null}

                <span className='font-bold tracking-wider'>ACTION:</span>
                <br/>
                <Form.Item  name='ideas'>
                    <IdeasInput {...{isPlaying,ideaValue,setIdeaValue}} />
                </Form.Item>
            </Form>
        </motion.div>
      </Spin>
  )
}

export default ExerciseMain