import { useState, useRef, useEffect } from 'react'
import { Layout, Menu, Input, Card } from 'antd'
import { MailOutlined, SettingOutlined, AppstoreOutlined, SendOutlined, UserOutlined, GlobalOutlined} from '@ant-design/icons'

import { ChatBox} from '../tools/Chat'


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


function Home() {
  // Questions for storing input.
  const questionRef = useRef(null)

  // Used to render the dialog list.
  const [nums, setNums] = useState([])

  const getChat = () => {
    const newNums = nums.concat([{
      'question': questionRef.current.resizableTextArea.textArea.value,
      'answer': null
    }])
    setNums(newNums)
  }

  return (
    <>
      <Layout style={{ height: '100vh'}}>

        <Sider width={ '250px' }>
            <Menu
                mode="inline"
                theme="dark"
                items={items}
                style={{ height: '100vh'}}
            />
        </Sider>

        <Layout className="site-layout">

            <Content style={{ margin: '0 16px' }}>
              <div style={{ width: '750px', margin: '0 auto'}}>

                {nums.map((message, index) => (
                  <ChatBox 
                    key={index}
                    question={message['question']} 
                    oldAnswer={message['answer']}
                  />
                ))}

              </div>
            </Content>
            
            <Footer style={{ margin: '0 16px', textAlign: 'center' }}>
              <div style={{ width: '750px', margin: '0 auto'}}>
                  <TextArea
                    ref={questionRef}
                    autoSize={{ minRows: 1, maxRows: 8 }} 
                    size="large"
                    style={{ width: '700px', marginLeft: 0}} 
                  />
                  &nbsp;
                  <span onClick={getChat} >
                    <SendOutlined style={{ fontSize: '20px', marginBottom: '11px' }} />
                  </span>
              </div>
            </Footer>
        </Layout>

      </Layout>
    </>
  )
}

export default Home