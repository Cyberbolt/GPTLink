import { useState, useEffect } from 'react'
import { Card, Tooltip, Button } from 'antd'
import { UserOutlined, GlobalOutlined, CopyOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import remarkHighlight from 'remark-highlight.js'
import 'highlight.js/styles/vs2015.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { URL_WS } from '../config/config'
import { CopyToClipboard } from 'react-copy-to-clipboard'


const first_paragraph = {
  display: 'inline',
  margin: 0
}


export function ChatBox({ key, question, oldAnswer }) {
    let [answer, setAnswer] = useState('')

    useEffect(() => {
        if (oldAnswer == null) {
            const ws = new WebSocket(URL_WS + '/ws/conversation/chat_stream')
            ws.onopen = () => {
              ws.send(question);
            }
            ws.onmessage = (event) => {
              for (let i in event.data) {
                answer += event.data[i]
                setAnswer(answer)
              }
            }
        }
        else {
            answer = oldAnswer
        }
    }, [])

    // Generate dialog
    return (
        <>
            <Card size="small" style={{ marginBottom: '15px' }}>
                <UserOutlined style={{ marginRight: '6px' }} />
                {question}
            </Card>
            <Card size="small" style={{ marginBottom: '15px', display: 'flex' }}>
              <GlobalOutlined style={{ marginRight: '6px' }} />
              <ReactMarkdown 
                  plugins={[remarkHighlight]} 
                  unwrapDisallowed={true} // Replace the p tag with its child element
                  children={answer} 
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      const lang = match ? match[1] : null;
                      return !inline && lang ? (
                        <div style={{ position: 'relative' }}>
                          <SyntaxHighlighter
                            style={dracula}
                            language={lang}
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            {...props}
                          />
                          <span
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              padding: '4px 8px',
                              backgroundColor: '#fafafa',
                              borderRadius: '0 0 4px 0',
                            }}
                          >
                            <CopyToClipboard text={String(children).replace(/\n$/, '')}>
                              <Tooltip title="复制" placement="top">
                                <Button type="text" icon={<CopyOutlined />} />
                              </Tooltip>
                            </CopyToClipboard>
                          </span>
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },                    
                      p({node, children, ...props}) {
                        return <p style={first_paragraph} {...props}>{children}</p>
                      }
                  }}
              />
            </Card>
        </>
    )
  }
