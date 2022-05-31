import { useEffect, useState } from 'react';
import { Card, Divider, Skeleton } from 'antd';
import { getTotalSessionsAndIdeas,getTodaySessionsIdeas } from 'services/dashboard'
//Type
import { ITotalIdeasSessions } from 'types/Ideas';

//Icons
import AimOutlined from '@ant-design/icons/AimOutlined';
import LineChartOutlined from '@ant-design/icons/LineChartOutlined';
import BulbOutlined from '@ant-design/icons/BulbOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import { motion } from 'framer-motion';
import { fadeInRight } from 'utils/animations';


const { Meta } = Card;
import { PRIMARY_COLOR } from 'utils/constants';
import { APIWithoutAuth } from 'utils/api';

const HeadCards = () => {
    const [loading, setLoading] = useState(false)
    const [totalIdeasSessions,setTotalIdeasSessions] = useState<ITotalIdeasSessions|undefined>(undefined);
    const [todaySessions, setTodaySessions] = useState<number|undefined>(undefined);
    const [todayIdeas, setTodayIdeas] = useState<number|undefined>(undefined);
    const [consecutiveDays, setConsecutiveDays] = useState<number|undefined>(undefined);

    const getSessionsIdeasCount = async () => {
        setLoading(true);
        try {
            const result = await getTotalSessionsAndIdeas();
            setTotalIdeasSessions(result);
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message',{error:error.message});
        } finally {
            setLoading(false);
        }
    }

    const getTodayData = async() => {
        setLoading(true);
        try {
            const result = await getTodaySessionsIdeas();
            setTodayIdeas(result?.totalIdeas);
            setTodaySessions(result?.totalSessions);
        } catch (error:any){
            await APIWithoutAuth.post('/error-message', {error: error.message});
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getSessionsIdeasCount();
        getTodayData();
    },[])

  return (
    <>
        <motion.div
            initial='initial'
            animate='animate'
            variants={fadeInRight}
            className='flex flex-row justify-between h-28 mb-5 gap-5'
        >
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' loading={loading}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 uppercase'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded'>Today</span>
                                    </div>
                                    <div className='flex flex-row w-full gap-4 justify-evenly'>
                                        <div className='flex flex-col text-center'>
                                            <div className='text-3xl font-bold text-gray-800 '>{todaySessions || 0}</div>
                                            <span className='text-xs text-gray-400'>Sessions</span>
                                        </div>
                                        <div className='border-l-[1.5px] h-1/2 flex self-center text-gray-400'/>
                                        <div className='flex flex-col text-center'>
                                            <div className='text-3xl font-bold text-gray-800'>{todayIdeas || 0}</div>
                                            <span className='text-sm text-gray-400'>Ideas</span>
                                        </div>
                                    </div>
                                </div>
                                <AimOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' loading={loading}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 uppercase'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded'>Total</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                            <div className='text-3xl font-bold text-gray-800'>{totalIdeasSessions?.totalSessions || 0} </div>
                                            <span className='text-sm text-gray-400'>Sessions</span>
                                    </div>
                                </div>
                                <LineChartOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' loading={loading}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 uppercase'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded'>Total</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                            <div className='text-3xl font-bold text-gray-800'>{totalIdeasSessions?.totalIdeas || 0} <span className='text-green-500 text-base'>+15%</span></div>
                                            <span className='text-sm text-gray-400'>Ideas</span>
                                    </div>
                                </div>
                                <BulbOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' loading={loading}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 uppercase'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded'>Consecutive</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                            <div className='text-3xl font-bold text-gray-800'>{consecutiveDays || 0}</div>
                                            <span className='text-sm text-gray-400'>Days</span>
                                    </div>
                                </div>
                                <CalendarOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
            </Card>
        </motion.div>
    </>
  )
}

export default HeadCards