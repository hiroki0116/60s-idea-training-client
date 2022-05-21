import { Layout } from "antd";
import Header from './Header';
import Footer from './Footer'
import Sidenav from './Sidenav';
import { useRouter } from 'next/router';
import { useState } from "react";

const { Header: AntHeader, Content, Sider } = Layout;

const DashboardWrapper = ({children}) => {
    const router = useRouter();
    const [isCollapse, setIsCollapse] = useState<boolean>(false);
  
    return (
      <Layout className={"h-screen"}>
        <Sider
          breakpoint="lg"
          trigger={null}
          width={200}
          theme="light"
          className="fixed left-0 h-full"
        >
          <Sidenav color={'#0a2339'} />
        </Sider>
        <Layout>
          <Header name={router.pathname}/>
          <Content className="content-ant">{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
  
  export default DashboardWrapper;