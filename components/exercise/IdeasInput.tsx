import { useRef,useEffect } from 'react';
import { Input,Tag } from 'antd'
const { TextArea } = Input;
import BulbOutlinded from '@ant-design/icons/BulbOutlined';


const IdeasInput = ({
    value=[],
    onChange,
    isPlaying,
    ideaValue,
    setIdeaValue
}:{
    value?: string[];
    onChange?: (string)=>void;
    isPlaying: boolean;
    ideaValue: string;
    setIdeaValue: (e) =>void;
}) => {
    const inputRef = useRef<any>(null);

    const handleAdd = (e) => {
        if(e.keyCode == 13){
            e.preventDefault();
        }
        let inputValue = ideaValue.trim();
        if(inputValue.length){
            let newValues = [...value];
            newValues = [...value, ideaValue.trim()];
            onChange && onChange(newValues);
            if (inputRef?.current) inputRef?.current?.focus();
            setIdeaValue('')
        }
    };

    const handeOnChange = (e) => setIdeaValue(e.target.value);


  return (
      <>
        <TextArea
            placeholder='Elaborate your idea!'
            style={{borderRadius:'0.5rem', maxWidth:'500px'}}
            className='bg-blue-100'
            allowClear
            disabled={!isPlaying}
            onPressEnter={handleAdd}
            value={ideaValue}
            onChange={handeOnChange}
            ref={inputRef}
            showCount
            bordered={false}
        />
        {value.length ? (
            <ul className='px-2 mb-5 font-bold tracking-wide text-16 whitespace-normal flex flex-wrap'>
                {value.map((idea,index)=> (
                <li key={index}>
                    <Tag 
                        color={'purple'}
                        style={{borderRadius:'0.5rem',verticalAlign: 'middle',marginTop:'10px'}}
                        closable
                    >
                        <BulbOutlinded style={{verticalAlign: 'middle'}}/> {idea}
                    </Tag>
                </li>
                ))}
            </ul>
            ) : null
        }
      </>
  )
}

export default IdeasInput