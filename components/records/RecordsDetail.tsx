import { useEffect } from "react";
import router from 'next/router';
import { IIdeas } from "types/Ideas"
import { APIWithoutAuth } from "utils/api";
import MotionDiv from 'components/Layout/MotionDiv';

const RecordsDetail = ({ideaRecord}:{ideaRecord:IIdeas}) => {

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
        <div className="grid grid-cols-1 bg-white p-5 rounded-xl shadow-lg">
            <h1>Title: {ideaRecord.topicTitle}</h1>
            <h3>Category: {ideaRecord.category}</h3>
            <p>Ideas:</p>
            {ideaRecord.ideas.map((idea,index) => 
            <div key={index}>
                {idea}
            </div>
            )}
        </div>
    </MotionDiv>
  )
}

export default RecordsDetail