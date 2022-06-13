import { useEffect, useState } from 'react';
import { API } from 'utils/api';
import moment from 'moment';
import TagOutlined from '@ant-design/icons/TagOutlined'
import { Input, Select, DatePicker, message, Tag, Empty, Pagination, Button } from 'antd';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';

import {CATEGORIES,DEFAULT_CREATED_AT} from 'utils/constants';
import MotionDiv from 'components/Layout/MotionDiv';
import CenterSpin from 'components/Layout/CenterSpin';
const { Option } = Select;

const RecordsMain = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [createdAtFrom, setCreatedAtFrom] = useState(moment(DEFAULT_CREATED_AT).toISOString())
    const [createdAtTo, setCreatedAtTo] = useState(moment().toISOString());
    const [results, setResults] = useState([]);
    const [dataInfo, setDataInfo] = useState({totalDocs: 0});
    const [paginate, setPaginate] = useState({ current: 1, pageSize: 9 });


    useEffect(() => {
        handleSubmit();
        // eslint-disable-next-line
      }, [searchInput,paginate, category,createdAtTo, createdAtFrom]);


    const handleSubmit = async () => {
        try {
            setLoading(true);
            //TO DO: Add sort by
            const requestBody = {
                searchInput: searchInput.trim(),
                category,
                createdAtFrom,
                createdAtTo,
                paginate,
            }

            const { data } = await API.post(`/ideas/search`,requestBody, {errorHandle: false});
            const records = data.sessionRecords.length > 0 ? data.sessionRecords : [];

            setResults(records);
            setDataInfo(data.paginationInfo);
             
        } catch (error:any) {
            message.error(error.response?.data?.message)
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page:number) => {
        setPaginate({ current: page, pageSize: 9 });
        window.scroll(0, 0);
    };

  return (
      <MotionDiv>
        {/* Filter section */}
        <div className="grid grid-cols-1 bg-white p-5 rounded-xl shadow-lg">
            <div className='font-bold text-lg'>Session Records</div>

            <div className='py-3 flex justify-around  gap-3 w-full'>
                <div className='w-2/6'>
                    <div>Keyword</div>
                    <Input.Search 
                        onPressEnter={() => handleSubmit()}
                        placeholder="Search data"
                        onChange={(e) => setSearchInput(e.target.value)}
                        onSearch={() => handleSubmit()}
                        value={searchInput}
                        allowClear
                    />
                </div>
                <div className='w-1/6'>
                <div>Category</div>
                <Select className="w-full" onChange={(value: string) => setCategory(value)} allowClear value={category}>
                {CATEGORIES.map((cate, key) => (
                    <Select.Option value={cate} key={key}>
                        {cate}
                    </Select.Option>
                ))}
                </Select>
                </div>
                <div className='w-1/6'>
                    <div>From (optional)</div>
                    <div>
                        <DatePicker
                            className="w-full"
                            onChange={(date) => {
                            const formattedCreatedAtFrom =
                                date === null ? moment(DEFAULT_CREATED_AT).toISOString() : moment(date).startOf('day').toISOString();
                            setCreatedAtFrom(formattedCreatedAtFrom);
                        }}
                        />
                    </div>
                </div>
                <div className='w-1/6'>
                    <div>To (optional)</div>
                    <div>
                        <DatePicker
                            className="w-full"
                            onChange={(date) => {
                            const formattedCreatedAtTo =
                                date === null ? moment().toISOString() : moment(date).endOf('day').toISOString();
                            setCreatedAtTo(formattedCreatedAtTo);
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* <div className='flex justify-center mt-1'>
                <Button type='primary' className='uppercase' shape='round' onClick={handleReset}>Reset</Button>
            </div> */}
        </div>

        {/* Results table */}
        <div className="grid grid-cols-1 p-6 w-full bg-white sm:rounded-lg h-full shadow my-5">
            {loading ? <CenterSpin />
            : (
                <>
                    {results.length
                    ? (
                        <>
                            <div className="mb-3 flex justify-center">
                                <Pagination
                                    size="small"
                                    total={dataInfo.totalDocs}
                                    current={paginate.current}
                                    onChange={handlePageChange}
                                    pageSize={paginate.pageSize}
                                    responsive
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-5'>
                            {results.map(result => 
                                <div key={result._id} className="relative rounded-xl mb-2 px-5 pt-4 pb-1 bg-white shadow-lg border border-blue-100 hover:bg-blue-50">
                                    <div className='absolute top-1 right-0 text-gray-500 text-xs'>{moment(result.createdAt).fromNow()}  <Tag color="cyan" style={{borderRadius: "0.5rem",marginLeft:'5px'}} icon={<TagOutlined />}>
                                        {result.category && result.category.length ? result.category : 'Others'}</Tag>
                                    </div>
                                    <h3 className='text-16 font-bold tracking-wide text-gray-700 my-3'>{result.topicTitle}</h3>
                                    {result.ideas.map((idea,index) => 
                                        <div key={index} className="mb-1">
                                            <Tag color={'purple'} style={{borderRadius:'0.5rem'}}>- {idea}</Tag>
                                        </div>
                                    )}
                                </div>
                            )}
                            </div>
                            <div className="mt-3 flex justify-center">
                                <Pagination
                                    size="small"
                                    total={dataInfo.totalDocs}
                                    current={paginate.current}
                                    onChange={handlePageChange}
                                    pageSize={paginate.pageSize}
                                    responsive
                                />
                            </div>
                        </>
                    ) : <Empty />}
                </>
            )}
        </div>
      </MotionDiv>
  )
}

export default RecordsMain