import { Layout, Row, Menu, Input } from 'antd'
import { MailOutlined, SettingOutlined, AppstoreOutlined, SendOutlined } from '@ant-design/icons'

// import menuWidthAdaption from '../tools/Adaption'


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
}

const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    {
      type: 'divider',
    },
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

const { TextArea } = Input;

const { Header, Content, Footer, Sider } = Layout

const Home =
    <>
      <Layout style={{ height: '100vh'}}>
        <Sider style={{ width: '250px' }}>
            <Menu
                mode="inline"
                theme="dark"
                items={items}
                style={{ height: '100vh'}}
            />
        </Sider>
        <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
                ss
            </Content>
            <Footer style={{ margin: '0 16px', textAlign: 'center' }}>
                <TextArea autoSize={{ minRows: 1, maxRows: 8 }} size="large" style={{ width: '750px' }} />
                &nbsp;
                <SendOutlined style={{ fontSize: '20px', marginBottom: '11px' }} />
            </Footer>
        </Layout>
      </Layout>
    </>
  
export default Home