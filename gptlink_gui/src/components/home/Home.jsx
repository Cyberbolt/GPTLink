import { useState } from 'react'
import { Layout, Menu, Input } from 'antd'
import { MailOutlined, SettingOutlined, AppstoreOutlined, SendOutlined} from '@ant-design/icons'
import axios from 'axios'

import { ChatBox} from '../tools/Chat'
import { URL } from '../config/config'


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
  const [question, setQuestion] = useState('')

  // Used to render the dialog list.
  let dialogues = []
  const [listItems, setListItems] = useState(
    dialogues.map(dialogue =>
      <ChatBox role={dialogue.role} content={dialogue.content} />
    )
  )

  const getChat = () => {
    
    // rendering problem
    dialogues.push({'role': 'user', 'content': question})
    setListItems(
      dialogues.map(dialogue =>
        <ChatBox role={dialogue.role} content={dialogue.content} />
      )
    )

    axios({
        method: 'patch',
        url: URL + '/api/conversation/chat_stream',
        data: JSON.stringify({
          'question': question
        }),
        headers:{
          'Content-Type': 'application/json'
        },
        responseType: 'stream',
    })
    .then((response) => {
      dialogues.push({'role': 'assistant', 'content': response.data})
      // render answer
      setListItems(
        dialogues.map(dialogue =>
          <ChatBox role={dialogue.role} content={dialogue.content} />
        )
      )
    
    })

  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
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
                {listItems}
                {/* <ChatBox role="user" content="sdasd" />
                <ChatBox role="assistant" content="sdasd" /> */}
              </div>
            </Content>
            
            <Footer style={{ margin: '0 16px', textAlign: 'center' }}>
              <div style={{ width: '750px', margin: '0 auto'}}>
                  <TextArea 
                    value={question}
                    onChange={handleQuestionChange}
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