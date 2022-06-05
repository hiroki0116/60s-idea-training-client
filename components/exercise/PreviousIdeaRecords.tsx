import { useState,useContext } from 'react';
import {ExerciseContext} from 'context/exerciseContext';
import CenterSpin from 'components/Layout/CenterSpin';
import { Tag } from 'antd';
import moment from 'moment';
import { motion } from 'framer-motion';
import { fadeInRight } from 'utils/animations';

const PreviousIdeaRecords = () => {
  const { prevSessionsLoading,prevSessions } = useContext(ExerciseContext);
  const [ mouseOver, setMouseOver] = useState<Boolean>(false);

  if(prevSessionsLoading) return <CenterSpin />
  if(!prevSessions.length) return (
      <div>No Training Data yet.</div>
  )


  return (
    <motion.div
        initial='initial'
        animate='animate'
        variants={fadeInRight}
    >
        <h2 className={`font-bold text-lg ${mouseOver && 'transition duration-300 ease-out hover:ease-in underline underline-offset-8'}`}>Most Recent Sessions</h2>
        {prevSessions.map((session) => (
            <div key = {session._id} className="relative rounded-xl mb-2 px-4 pt-3 pb-1 bg-white shadow-lg border border-blue-100 hover:bg-blue-50" onMouseOver={()=>{setMouseOver(true)}} onMouseLeave={()=>{setMouseOver(false)}}>
                <div className='absolute top-1 right-3 text-gray-500 text-xs'>{moment(session.createdAt).fromNow()}</div>
                <h3 className='text-16 font-bold tracking-wide text-gray-700'>{session.topicTitle}</h3>
                <ul>
                    {session.ideas.map((idea,index) => (
                        <li key={index} className="mb-1">
                            <Tag color="geekblue" style={{borderRadius: "0.5rem"}}>{idea}</Tag>
                        </li>
                    ))}
                </ul>
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