import { useContext } from "react"
import { UserContext } from "../components/UserContext"

function Home() {
  const {user ,token} = useContext(UserContext)
  return (
    <div> 
      <h1>Welcome to the TO-DO App</h1>
       {token ?<h3>Hi {user.username}</h3>: null} 
    </div>
  )
}

export default Home