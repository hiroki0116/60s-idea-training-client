import { Layout, Spin } from "antd";
import Header from './Header';
import Footer from './Footer'
import Sidenav from './Sidenav';
import { useRouter } from 'next/router';

const { Header: AntHeader, Content, Sider } = Layout;

const DashboardWrapper = ({children}) => {
    const router = useRouter();
    if (!router.isReady) return <Spin />;
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          trigger={null}
          width={200}
          theme="light"
          className="h-screen"
        >
          <Sidenav />
        </Sider>
        <Layout>
          <Header name={router.pathname}/>
          <Content className="px-5 py-10 bg-slate-50">{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
  
  export default DashboardWrapper;