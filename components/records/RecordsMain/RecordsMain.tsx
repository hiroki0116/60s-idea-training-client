import { useEffect, useState } from 'react';
import Link from 'next/link'
import { API } from 'utils/api';
import moment from 'moment';
import TagOutlined from '@ant-design/icons/TagOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { Input, Select, DatePicker, message, Tag, Empty, Pagination, Switch } from 'antd';

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
    const [sortByRecent, setSortByRecent] = useState(true);


    useEffect(() => {
        handleSubmit();
        // eslint-disable-next-line
      }, [searchInput,paginate, category,createdAtTo, createdAtFrom, sortByRecent]);


    const handleSubmit = async () => {
        try {
            setLoading(true);
            const requestBody = {
                searchInput: searchInput.trim(),
                category,
                createdAtFrom,
                createdAtTo,
                paginate,
                sortByRecent
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

    const handlePageChange = (page:number, pageSize:number) => {
        setPaginate({ current: page, pageSize: pageSize });
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
        </div>

        {/* Results table */}
        <div className="grid grid-cols-1 p-6 w-full bg-white sm:rounded-lg h-full shadow my-5 relative">
            <div className='absolute top-5 left-6'>
                <Switch
                    checked={sortByRecent}
                    onChange={()=> setSortByRecent(!sortByRecent)}
                    checkedChildren="Recent"
                    unCheckedChildren="Older"
                    className='shadow'
                />
            </div>
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
                                    pageSizeOptions={['9','18','36','50']}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-5'>
                            {results.map(result => 
                                <Link  key={result._id} href={`/records/${result._id}`}>
                                    <div className={`relative rounded-xl mb-2 p-5 shadow-lg border border-purple-100  hover:bg-purple-50 cursor-pointer ${result.viewed ? 'bg-white' : 'bg-blue-50'}`}>
                                        <div className='absolute top-1 right-0 text-gray-500 text-xs'>
                                            {moment(result.createdAt).fromNow()}
                                            <Tag color="cyan" style={{borderRadius: "0.5rem",marginLeft:'5px'}} icon={<TagOutlined />}>
                                                {result.category && result.category.length ? result.category : 'Others'}
                                            </Tag>
                                        </div>
                                        <h3 className='border-l-4 pl-2 text-16 font-bold tracking-wide text-gray-700 my-4'>{result.topicTitle}</h3>
                                        {result.ideas.map((idea,index) => 
                                            <div key={index} className="mb-1">
                                                <Tag color={'purple'} style={{borderRadius:'0.5rem'}}>- {idea}</Tag>
                                            </div>
                                        )}
                                    {result.viewed ? 
                                        <div className="absolute bottom-1 right-2 text-xs text-red-400 uppercase">
                                            Viewed
                                        </div> : null}
                                    </div>
                                </Link>
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
                                    pageSizeOptions={['9','18','36','50']}
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