import { Row, Card, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'


const Login = () => (
    <div>
        <Row type="flex" justify="center" align="middle" style={{minHeight:'100vh'}}>
            <Card
                title="GPTLink"
                bordered={false}
                size="small"
                align="middle"
                style={{width: '300px'}}
            >
                <p>
                    <Input 
                        size="small" 
                        placeholder="用户名" 
                        style={{ width: '200px' }}
                        prefix={<UserOutlined />} 
                    />
                </p>
                <p>
                    <Input 
                        size="small" 
                        placeholder="密码" 
                        style={{ width: '200px' }}
                        prefix={<LockOutlined />} 
                    />
                </p>
                <Button type="primary" size="small" style={{float: "right"}}>
                    登录
                </Button>
            </Card>
        </Row>
    </div>
)

export default Login