import { PRIMARY_COLOR } from "utils/constants";
import { Timeline } from 'antd';
import GithubOutlined from '@ant-design/icons/GithubOutlined'

const HeroSection = () => {
    const handleContact = () => {
        const emailSubject:string = 'Contact via 60s Idea Training';
        const emailBody:string = "Hi, Hiroki.%0D%0A%0D%0AI am reaching out to you regarding...";
        window.open(`mailto:hirokiseino0116@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
    }

  return (
    <div className="min-h-screen w-full grid sm:grid-cols-3 grid-cols-1 justify-items-center items-center sm:px-36 px-10" style={{backgroundColor:PRIMARY_COLOR}}>
        <div className="sm:col-span-2">
            <div className="sm:pb-20 pb-5 pt-16">
                <div className="pb-3 text-base text-green-400">Hi, my name is</div>
                <div className="sm:text-6xl text-4xl pb-5 text-zinc-300 flex items-center gap-3">
                    <GithubOutlined className="cursor-pointer" onClick={()=>{window.open('https://github.com/hiroki0116','_blank')}}/>
                    <div>Hiroki Seino.</div>
                </div>
                <div className="sm:text-4xl text-2xl text-zinc-400">I build systems with Web Technology.</div>
            </div>

            <div className="text-white text-base tracking-wider sm:w-3/5 w-full leading-6 pb-10">
                I&apos;m an enthusiastic junior software developer from Japan.
                I have been working for a startup project in Sydney/Australia currently.
            </div>
            <div>
                <button 
                    className="border border-green-400 text-green-500 px-5 py-2 rounded transform transition duration-500 hover:scale-110"
                    onClick={handleContact}
                >
                    Get in Touch
                </button>
            </div>
        </div>

        <div className="sm:col-span-1 sm:pt-10">
            <Timeline>

                <Timeline.Item color="#4ade80">
                    <div className="text-zinc-300">Develop a job site with MERN stack</div>
                    <div className="text-zinc-400 text-sm">2021 Dec - 2022 Current</div>
                </Timeline.Item>

                <Timeline.Item color="gray">
                    <div className="text-zinc-300">Master degree in ICT (Web and Mobile Technology) at Western Sydney University</div>
                    <div className="text-zinc-400 text-sm">2020 Feb - 2021 Nov</div>
                </Timeline.Item>
                <Timeline.Item color="gray">
                    <div className="text-zinc-300">Sales at Amazon Japan Books team</div>
                    <div className="text-zinc-400 text-sm">2019 Mar - 2019 Dec</div>
                </Timeline.Item>
                <Timeline.Item color="gray">
                    <div className="text-zinc-300">Retail Management at Nitori Inc.</div>
                    <div className="text-zinc-400 text-sm">2014 Mar - 2016 Oct</div>
                </Timeline.Item>
                <Timeline.Item color="#67EEF9">
                    <div className="text-zinc-300">Bachelor degree in Economics</div>
                    <div className="text-zinc-400 text-sm">2010 Apr - 2014 Mar</div>
                </Timeline.Item>
            </Timeline>
        </div>

        <div className="absolute bottom-24 -right-10 text-zinc-400 transform rotate-90">
            <p className="text-zinc-400">
                console.log (&quot;Hello World!&quot;);
            </p>
        </div>
        <div className="absolute bottom-0 right-14 text-zinc-400">
            <p className="text-zinc-400">
                {`<60sIdeaTraining />`}
            </p>
        </div>
        
    </div>
  )
}

export default HeroSection