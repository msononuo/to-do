import useUser from "../components/useUser.js"

function Home() {
  const {user ,token} = useUser()
  return (
    <div> 
      <h1>Welcome to the TO-DO App</h1>
       {token && user ? <h3>Hi {user.username}</h3> : null}
    </div>
  )
}

export default Home