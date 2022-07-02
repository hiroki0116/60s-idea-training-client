import MotionDivWhenView from 'components/Layout/MotionDivWhenView';
import { PRIMARY_COLOR } from 'utils/constants';
import LineChartOutlined from '@ant-design/icons/LineChartOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HighlightOutlined from '@ant-design/icons/HighlightOutlined';

const SecondSection = () => {
    type Content = {title: string, body: string, icon: any}

    const contents:Content[] = [
        {
            title: "Better thinking availability",
            body: "Outputting has the effect of increasing the capacity of the brain and increasing the speed of information processing.",
            icon: <LineChartOutlined className='text-4xl pb-5'/>
        },
        {
            title: "Better Mental Health",
            body: "Psychological stress can be reduced by knowing your stress, worries, and fears and facing the problems.",
            icon: <HeartOutlined className='text-4xl pb-5'/>
        },
        {
            title: "Better Learning Practice",
            body: "Familier with the forgetting curve theory? 70% of what you learn today will be lost tomorrow without reviewing.",
            icon: <HighlightOutlined className='text-4xl pb-5'/>
        }

    ]

  return (
    <div className="min-h-screen w-full grid grid-cols-1 px-28 justify-items-center content-center text-white gap-10 tracking-wider" style={{backgroundColor:PRIMARY_COLOR}}>
        <h3 className='text-4xl text-white text-center'>Why do you want to <br/>train output skill ?</h3>
        <MotionDivWhenView  variants = {{visible: { opacity: 1, x: 0 },hidden: { opacity: 0, x: 10 }}}>
            <div className='grid grid-cols-3 gap-10 w-full p-10 h-52'>
            {contents.map((content, index) => (
                <div className='col-1 rounded-lg border border-white p-5 transform transition duration-500 hover:scale-110' key={index}>
                    {content.icon}
                    <h4 className='text-lg text-white font-bold tracking-wider pb-5'>{content.title}</h4>
                    <p className='border-l-2 pl-2 text-base'>{content.body}</p>
                </div>
            ))}
            </div>
        </MotionDivWhenView>
    </div>
  )
}

export default SecondSection