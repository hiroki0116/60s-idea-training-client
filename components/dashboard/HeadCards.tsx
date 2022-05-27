import { useEffect, useState } from 'react';
import { Card, Skeleton } from 'antd';
import { getTotalSessionsAndIdeas } from 'services/dashboard'
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

    const getSessionsIdeasCount = async () => {
        setLoading(true);
        try {
            const result = await getTotalSessionsAndIdeas();
            setTotalIdeasSessions(result);
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message',{error});
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        getSessionsIdeasCount();
    },[])

  return (
    <>
        <motion.div
            initial='initial'
            animate='animate'
            variants={fadeInRight}
            className='flex flex-row justify-between sm:h-24 h-auto mb-5 gap-5'
        >
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' >
                <Skeleton loading={loading} active className={loading && '-mt-10'}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 '>Today&apos;s ideas</div>
                                    <div className='flex justify-center w-full gap-2'>
                                        <div className='text-3xl font-bold text-gray-800'>X</div>
                                        <div className='text-green-500'>+Y%</div>
                                    </div>
                                </div>
                                <AimOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
                </Skeleton>
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' >

                <Skeleton loading={loading} active className={loading && '-mt-10'}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 '>Total sessions</div>
                                    <div className='flex justify-center w-full  gap-2'>
                                        <div className='text-3xl font-bold text-gray-800'>{totalIdeasSessions?.totalSessions}</div>
                                    </div>
                                </div>
                                <LineChartOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
                </Skeleton>
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' >
                    <Skeleton loading={loading} active className={loading && '-mt-10'}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 '>Total Ideas</div>
                                    <div className='flex justify-center w-full  gap-2'>
                                        <div className='text-3xl font-bold text-gray-800'>{totalIdeasSessions?.totalIdeas}</div>
                                        <div className='text-green-500'>+X%</div>
                                    </div>
                                </div>
                                <BulbOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
                </Skeleton>
            </Card>
            <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg w-1/4 overflow-hidden' >
                <Skeleton loading={loading} active className={loading && '-mt-10'}>
                    <Meta
                        description={
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='text-gray-500 '>Consecutive days</div>
                                    <div className='flex justify-center w-full  gap-2'>
                                        <div className='text-3xl font-bold text-gray-800'>X</div>
                                    </div>
                                </div>
                                <CalendarOutlined 
                                        className='text-2xl text-white rounded-lg self-center p-3'
                                        style={{color:'white',background:PRIMARY_COLOR}}
                                    />
                            </div>
                            }
                    />
                </Skeleton>
            </Card>
        </motion.div>
    </>
  )
}

export default HeadCards