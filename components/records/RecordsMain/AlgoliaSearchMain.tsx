import algoliasearch from 'algoliasearch/lite';
import { Tag } from 'antd';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined'
import TagOutlined from '@ant-design/icons/TagOutlined'
import dayjs from 'dayjs';

import { 
    InstantSearch,
    SearchBox,
    Hits,
    Highlight,
    DynamicWidgets,
    RefinementList,
    Configure,
    SortBy
} from 'react-instantsearch-hooks-web';
const AlgoliaSearchMain = () => {
    const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

    const Hit = ({ hit }) => {
        return (
          <div className='relative rounded-xl mb-2 px-5 py-5  shadow-lg border border-blue-100 bg-white hover:bg-blue-50 cursor-pointer'>
              <div className='absolute top-1 right-0 text-gray-500 text-xs'>{dayjs(hit.createdAt).format('MMM DD YYYY')}  <Tag color="cyan" style={{borderRadius: "0.5rem",marginLeft:'5px'}} icon={<TagOutlined />}>{hit.category}</Tag></div>
              <h2 className='font-bold text-16'>{hit.topicTitle}</h2>
              {Object.keys(hit.ideas).map((key)=> (
                <div className='' key={key}>
                    {hit.ideas[key]}
                </div>                
                ))}
          </div>
        );
    }

  return (
    <InstantSearch searchClient={searchClient} indexName="session_record">
    <Configure ruleContexts={[]} />
    <div className='grid grid-cols-1 bg-white p-5 rounded-xl shadow-lg'>
        <SearchBox placeholder='Search by topic' className='flex justify-center w-full'/>
        <div>
            <DynamicWidgets>
                <RefinementList
                    attribute="topicTitle"
                    searchable={true}
                    searchablePlaceholder="Search by Title"
                    showMore={true}
                />
            </DynamicWidgets>
            {/* <SortBy
                items={[
                    {label: 'Relevance', value:'session_record'},
                    {label: 'Recent', value:'session_record_createdAt_asc'},
                    {label: 'Oldest', value:'session_record_createdAt_desc'},
                ]}
            /> */}

            <RefinementList attribute="brand" />
            <div className='grid grid-cols-4'>
                <Hits hitComponent={Hit} />
            </div>
        </div>
    </div>
</InstantSearch>
  )
}

export default AlgoliaSearchMain