import { Card } from 'antd'
import { UserOutlined, GlobalOutlined } from '@ant-design/icons'


let choice = {
    'user': <UserOutlined style={{ marginRight: '6px' }} />,
    'assistant': <GlobalOutlined style={{ marginRight: '6px' }} />
}

export function ChatBox({ role, content }) {
    // Generate dialog
    return (
        <Card size="small" style={{ marginBottom: '15px' }}>
            {choice[role]}
            {content}
        </Card>
    );
  }

