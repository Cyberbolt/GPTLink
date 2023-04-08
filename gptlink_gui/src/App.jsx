import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Home from './components/chat/Home'
import Login from "./components/login/Login"
import MyInput from './components/chat/Test'


export default function App() {
    return (
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/chat">s</Link>
              </li>
            </ul>
          </nav> */}
          
          <Route path="/chat" component={Home} />
          <Route path="/" component={Login} />
        </div>
      </Router>
    )

}

