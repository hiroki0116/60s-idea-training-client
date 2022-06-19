import { useEffect,useState } from "react";
import { Divider, Tag, Input, message,notification, Select} from 'antd'
import router from 'next/router';
import { IIdeas } from "types/Ideas"
import { APIWithoutAuth } from "utils/api";
import MotionDiv from 'components/Layout/MotionDiv';
import moment from 'moment'
import { capitalizeFirst } from 'utils/formatter';
import { Editor } from '@tinymce/tinymce-react';
import { CATEGORIES } from 'utils/constants'

//Icons
import FieldTimeOutlined from '@ant-design/icons/FieldTimeOutlined';
import TagOutlined from '@ant-design/icons/TagOutlined';
import BulbTwoTone from '@ant-design/icons/BulbTwoTone';
import FileTextTwoTone from '@ant-design/icons/FileTextTwoTone';
import ThreeDotsMenu from "./ThreeDotsMenu";
const { Option } = Select;

const RecordsDetail = ({ideaRecord}:{ideaRecord:IIdeas}) => {
    const [topicTitle,setTopicTitle] = useState<string>(ideaRecord.topicTitle || '');
    const [comment, setComment] = useState<string>(ideaRecord.topicTitle || '');
    

    
    const changeViewStatus = async (id: string) => {
        try {
            await APIWithoutAuth.patch(`/ideas/${id}`, {viewed: true}, { errorHandle:false});
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message',{error:error.message});
        } 
    }

    const openNotification = () => {
        notification.success({
          message: `Successfully updated!`,
          duration: 2.5,
          placement: "bottomRight",
        });
      };

    const updateTopicTitle = async () => {
        try {
            await APIWithoutAuth.patch(`/ideas/${ideaRecord._id}`, { topicTitle }, { errorHandle: false });
            openNotification();
        } catch (error: any) {
            await APIWithoutAuth.post('/error-message', { error: error.message })
            message.error(error.message);
        }
    }

    
    const updateCategory = async (category:string) => {
        try {
            const {data} = await APIWithoutAuth.patch(`/ideas/${ideaRecord._id}`, { category }, { errorHandle: false });
            if(data.success){
                openNotification();
            }
        } catch (error: any) {
            await APIWithoutAuth.post('/error-message', { error: error.message })
            message.error(error.message);
        }
    }
    
    const updateComment = async () => {
        try {
            const {data} = await APIWithoutAuth.patch(`/ideas/${ideaRecord._id}`, { comment }, { errorHandle: false });
            if(data.success){
                openNotification();
            }
        } catch (error: any) {
            await APIWithoutAuth.post('/error-message', { error: error.message })
            message.error(error.message);
        }
    }

    const deleteIdeaRecord = async () => {
        try {
            const {data} = await APIWithoutAuth.delete(`/ideas/${ideaRecord._id}`, {errorHandle: false});
            if(data.success){
                message.success('Successfully deleted');
                router.push('/records');
            }
        } catch (error: any) {
            await APIWithoutAuth.post('/error-message', { error: error.message });
            message.error(error.message);
        }
    }

    useEffect(()=>{
        if(router.query.id){
            changeViewStatus(router.query.id.toString());
        }
        // eslint-disable-next-line
    },[router.query])
  return (
    <MotionDiv>
        <div className="grid grid-cols-1 bg-white p-5 rounded-xl shadow-lg w-2/3 mx-auto gap-2 relative">
            <div className="absolute top-2 right-2">
                <ThreeDotsMenu deleteIdeaRecord={deleteIdeaRecord}/>
            </div>
            <Input 
                size='large'
                value={topicTitle}
                onChange={(e)=>setTopicTitle(e.target.value)}
                onBlur={updateTopicTitle}
                bordered={false}
                style={{fontWeight:"700", fontSize:'1.25rem'}}
            />
            <div className="flex items-center gap-2 text-gray-500">
                <FieldTimeOutlined className="text-base"/>
                <span>Created</span>
                <div className="ml-10 text-gray-800">{moment(ideaRecord.createdAt).format('MMMM D YYYY h:mm A')}</div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
                <TagOutlined className="text-base"/>
                <span>Category</span>
                <div className="">
                    <Select
                        bordered={false}
                        defaultValue={ideaRecord.category || 'Other'}
                        style={{marginLeft:'1rem'}}
                        onChange={(value)=>updateCategory(value)}
                    >
                        {CATEGORIES.map(cate=>
                            <Option value={cate} key={cate}>
                                <Tag color={'cyan'} style={{borderRadius:'0.5rem'}}>{cate}</Tag>
                            </Option>
                        )}
                    </Select>
                </div>
            </div>

            <Divider style={{marginTop:'0.5rem', marginBottom:'0.5rem'}}/>
            
            <div className="rounded-lg shadow-lg p-5 bg-slate-50">
                <div className="flex gap-2">
                    <BulbTwoTone className="text-base"/>
                    <h3 className="text-base font-bold tracking-widest">IDEAS</h3>
                </div>
                <div className="px-3">
                    {ideaRecord.ideas.map((idea,index) => 
                    <div key={index} className='tracking-wide'>
                        {index+1}. {capitalizeFirst(idea)}
                    </div>
                    )}
                </div>
            </div>
            <div className="rounded-lg shadow-lg p-5 bg-slate-50 mt-3">
                <div className="flex gap-2 mb-1">
                    <FileTextTwoTone className="text-base"/>
                    <h3 className="text-base font-bold tracking-widest">NOTES</h3>
                </div>
                <div className="grid grid-cols-1">
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                        init={{
                        branding: false,
                        placeholder: '',
                        content_style: `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {//color: rgba(34,47,62,.7); color: #d4d4d4;}`,
                        height: 320,
                        menubar: true,
                        block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4',
                        contextmenu: 'copy paste',
                        toolbar:
                            'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat |  copy paste'
                        }}
                        initialValue={ideaRecord.comment || ''}
                        value={comment}
                        onEditorChange={(v) => {setComment(v)}}
                        onBlur={updateComment}
                    />
                </div>
            </div>
        </div>
    </MotionDiv>
  )
}

export default RecordsDetail