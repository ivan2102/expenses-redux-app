import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {

const authUser = useSelector(state => state.auth)
const { userInfo } = authUser
const navigate = useNavigate()

if(userInfo?.token) {

navigate('/login')
return null
}

  return (
    <div>{ children }</div>
  )
}
export default ProtectedRoute