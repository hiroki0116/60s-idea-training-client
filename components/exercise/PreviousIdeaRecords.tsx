import { useTheme } from 'next-themes';
import { useState,useContext } from 'react';
import {ExerciseContext} from 'context/exerciseContext';
import CenterSpin from 'components/Layout/CenterSpin';
import { Tag,Empty } from 'antd';
import TagOutlined from '@ant-design/icons/TagOutlined'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import { fadeInRight } from 'utils/animations';
import Link from 'next/link';

const PreviousIdeaRecords = () => {
  const { loadingPrevSessions,prevSessions } = useContext(ExerciseContext);
  const { theme,systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [ mouseOver, setMouseOver] = useState<Boolean>(false);
  dayjs.extend(relativeTime)
  if(loadingPrevSessions) return <CenterSpin />

  return (
    <motion.div
        initial='initial'
        animate='animate'
        variants={fadeInRight}
        onMouseOver={()=>{setMouseOver(true)}} 
        onMouseLeave={()=>{setMouseOver(false)}}
    >
        <h2 className={`font-bold text-lg dark:text-green-400 ${mouseOver && 'transition duration-300 ease-out hover:ease-in underline underline-offset-8'}`}>Most 5 Recent Sessions</h2>
        {!prevSessions?.length ? <Empty description="No Data Yet." /> : prevSessions.map((session) => (
            <div className="relative rounded-xl mb-2 px-5 pt-4 pb-1 bg-white shadow-lg hover:bg-blue-50 cursor-pointer dark:bg-slate-800 hover:dark:bg-slate-700"  key = {session._id}>
                <Link href={`/records/${session._id}`} >
                    <a>
                        <div className='absolute top-1 right-0 text-gray-500 text-xs'>{dayjs(session.createdAt).fromNow()}  <Tag color="cyan" style={{borderRadius: "0.5rem",marginLeft:'5px'}} icon={<TagOutlined />}>{session.category}</Tag></div>
                        <h3 className='text-16 font-bold tracking-wide text-gray-700 dark:text-green-400'>{session.topicTitle}</h3>
                        {session.ideas.map((idea,index) => (
                            <div key={index} className="mb-1">
                                <Tag color={currentTheme === 'dark' ? 'green' : 'purple'} style={{borderRadius:'0.5rem',overflowWrap:'normal', wordBreak:'normal', whiteSpace:'normal'}}>- {idea}</Tag>
                            </div>
                        ))}
                    </a>
                </Link>
            </div>
        ))}
        {/* TO DO 'set Load more */}
        <div className='flex justify-center'>
            <div className='mt-3 border-b w-1/3' />
        </div>
    </motion.div>
  )
}

export default PreviousIdeaRecords