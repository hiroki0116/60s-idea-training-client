import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { getTotalSessionsAndIdeas,getTodaySessionsIdeas,getConsecutiveDays } from 'services/dashboard'
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
    const [loadingFotToday, setLoadingForToday] = useState(false);
    const [loadingForTotal, setLoadingForTotal] = useState(false);
    const [loadingForConsecutiveDays, setLoadingForConsecutiveDays] = useState(false);
    const [totalIdeasSessions,setTotalIdeasSessions] = useState<ITotalIdeasSessions|undefined>(undefined);
    const [todaySessions, setTodaySessions] = useState<number|undefined>(undefined);
    const [todayIdeas, setTodayIdeas] = useState<number|undefined>(undefined);
    const [consecutiveDays, setConsecutiveDays] = useState<number|undefined>(undefined);

    const getSessionsIdeasCount = async () => {
        setLoadingForTotal(true);
        try {
            const result = await getTotalSessionsAndIdeas();
            setTotalIdeasSessions(result);
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message',{error:error.message});
        } finally {
            setLoadingForTotal(false);
        }
    }

    const getTodayData = async() => {
        setLoadingForToday(true);
        try {
            const result = await getTodaySessionsIdeas();
            setTodayIdeas(result?.totalIdeas);
            setTodaySessions(result?.totalSessions);
        } catch (error:any){
            await APIWithoutAuth.post('/error-message', {error: error.message});
        } finally {
            setLoadingForToday(false);
        }
    }

    const getConsecutive = async() => {
        setLoadingForConsecutiveDays(true)
        try {
            const result = await getConsecutiveDays();
            setConsecutiveDays(result.consecutiveDays);
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message', {error: error.message})
        } finally {
            setLoadingForConsecutiveDays(false)
        }
    }

    const executePromiseAll = async () => {
        await Promise.all([
            getSessionsIdeasCount(),
            getTodayData(),
            getConsecutive()
        ])
    }

    useEffect(()=>{
        executePromiseAll()
        //eslint-disable-next-line
    },[])

  return (
    <>
        <motion.div
            initial='initial'
            animate='animate'
            variants={fadeInRight}
            className='grid sm:grid-cols-4 grid-cols-2 w-full sm:h-28 h-52 mb-5 gap-5'
        >
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg overflow-hidden dark:bg-slate-800' loading={loadingFotToday}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded tracking-wider dark:text-green-500 dark:bg-slate-900'>TODAY</span>
                                    </div>
                                    <div className='flex flex-row w-full gap-4 justify-evenly pt-1'>
                                        <div className='flex flex-col text-center'>
                                            <div className='sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400'>{todaySessions || 0}</div>
                                            <span className='text-xs text-gray-400'>Sessions</span>
                                        </div>
                                        <div className='border-l-[1.5px] text-gray-400'/>
                                        <div className='flex flex-col text-center'>
                                            <div className='sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400'>{todayIdeas || 0}</div>
                                            <span className='text-sm text-gray-400'>Ideas</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='sm:block hidden rounded-lg text-white dark:text-green-400' style={{ background:PRIMARY_COLOR }}>
                                    <AimOutlined className='text-2xl p-3'/>
                                </div>
                            </div>
                        }
                    />
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg overflow-hidden dark:bg-slate-800' loading={loadingForTotal}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded tracking-wider dark:bg-slate-900 dark:text-green-500'>TOTAL</span>
                                    </div>
                                    <div className='flex flex-col text-center pt-1'>
                                            <div className='sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400'>{totalIdeasSessions?.totalSessions || 0} </div>
                                            <span className='text-sm text-gray-400'>Sessions</span>
                                    </div>
                                </div>
                                <div className='sm:block hidden rounded-lg text-white dark:text-green-400' style={{ background:PRIMARY_COLOR }}>
                                    <LineChartOutlined className='text-2xl p-3'/>
                                </div>
                            </div>
                            }
                    />
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg overflow-hidden dark:bg-slate-800' loading={loadingForTotal}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded tracking-wider dark:bg-slate-900 dark:text-green-500'>TOTAL</span>
                                    </div>
                                    <div className='flex flex-col text-center pt-1'>
                                            <div className='sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400'>{totalIdeasSessions?.totalIdeas || 0}</div>
                                            <span className='text-sm text-gray-400'>Ideas</span>
                                    </div>
                                </div>
                                <div className='sm:block hidden rounded-lg text-white dark:text-green-400' style={{ background:PRIMARY_COLOR }}>
                                    <BulbOutlined className='text-2xl p-3'/>
                                </div>
                            </div>
                            }
                    />
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg overflow-hidden dark:bg-slate-800' loading={loadingForConsecutiveDays}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500'>
                                        <span className='bg-blue-50 px-2 py-0.5 rounded tracking-wider dark:bg-slate-900 dark:text-green-500'>CONSECUTIVE</span>
                                    </div>
                                    <div className='flex flex-col text-center pt-1'>
                                            <div className='sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400'>{consecutiveDays || 0}</div>
                                            <span className='text-sm text-gray-400'>Days</span>
                                    </div>
                                </div>
                                <div className='sm:block hidden rounded-lg text-white dark:text-green-400' style={{ background:PRIMARY_COLOR }}>
                                    <CalendarOutlined className='text-2xl p-3'/>
                                </div>
                            </div>
                            }
                    />
            </Card>
        </motion.div>
    </>
  )
}

export default HeadCards