import { useEffect,useState } from "react";
import { Divider, Tag } from 'antd'
import router from 'next/router';
import { IIdeas } from "types/Ideas"
import { APIWithoutAuth } from "utils/api";
import MotionDiv from 'components/Layout/MotionDiv';
import moment from 'moment'
import { capitalizeFirst } from 'utils/formatter';
import { Editor } from '@tinymce/tinymce-react';

//Icons
import FieldTimeOutlined from '@ant-design/icons/FieldTimeOutlined';
import TagOutlined from '@ant-design/icons/TagOutlined';
import BulbTwoTone from '@ant-design/icons/BulbTwoTone';
import FileTextTwoTone from '@ant-design/icons/FileTextTwoTone';

const RecordsDetail = ({ideaRecord}:{ideaRecord:IIdeas}) => {
    const [content, setContent] = useState<string>('');

    const changeViewStatus = async (id: string) => {
        try {
            await APIWithoutAuth.patch(`/ideas/viewed/${id}`);1
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message',{error:error.message});
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
        <div className="grid grid-cols-1 bg-white p-5 rounded-xl shadow-lg w-2/3 mx-auto gap-2">
            <h1 className="text-lg text-center font-bold tracking-wider">{ideaRecord.topicTitle}</h1>
            <div className="flex items-center gap-2 text-gray-500">
                <FieldTimeOutlined className="text-base"/>
                <span>Created</span>
                <div className="ml-10 text-gray-800">{moment(ideaRecord.createdAt).format('MMMM D YYYY h:mm A')}</div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
                <TagOutlined className="text-base"/>
                <span>Category</span>
                <Tag color={'cyan'} style={{marginLeft:'2rem',borderRadius:'0.5rem'}}>{ideaRecord.category}</Tag>
            </div>

            <Divider style={{marginTop:'0.5rem', marginBottom:'0.5rem'}}/>
            
            <div className="rounded-lg shadow-lg p-5 bg-slate-50">
                <div className="flex gap-2">
                    <BulbTwoTone className="text-base"/>
                    <h3 className="text-base font-bold tracking-widest uppercase">ideas</h3>
                </div>
                <div className="">
                    {ideaRecord.ideas.map((idea,index) => 
                    <div key={index} className='tracking-wide'>
                        {index+1}. {capitalizeFirst(idea)}
                    </div>
                    )}
                </div>
            </div>
            <div className="rounded-lg shadow-lg p-5 bg-slate-50 mt-3">
                <div className="flex gap-2">
                    <FileTextTwoTone className="text-base"/>
                    <h3 className="text-base font-bold tracking-widest uppercase">notes</h3>
                </div>
                <div className="grid grid-cols-1">
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                        init={{
                        placeholder: '',
                        content_style: `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {//color: rgba(34,47,62,.7); color: #d4d4d4;}`,
                        branding: false,
                        height: 320,
                        menubar: true,
                        block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4',
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            'contextmenu'
                        ],
                        contextmenu: 'copy paste',
                        toolbar:
                            'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat |  copy paste'
                        }}
                        value={content}
                        onEditorChange={(v) => {setContent(v)}}
                    />
                </div>
            </div>
        </div>
    </MotionDiv>
  )
}

export default RecordsDetail