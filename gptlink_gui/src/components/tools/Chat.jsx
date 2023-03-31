import { useState, useEffect } from 'react'
import { Card } from 'antd'
import { UserOutlined, GlobalOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import remarkHighlight from 'remark-highlight.js'
import 'highlight.js/styles/vs2015.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { URL_WS } from '../config/config'


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
            <Card size="small" style={{ marginBottom: '15px' }}>
                <GlobalOutlined style={{ marginRight: '6px', display:'inline-block' }} />
                <ReactMarkdown 
                    plugins={[remarkHighlight]} 
                    children={answer} 
                    components={{
                        code({node, inline, className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={atomOneDark}
                              language={match[1]}
                              PreTag="div"
                              children={String(children).replace(/\n$/, '')}
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                />
            </Card>
        </>
    )
  }

