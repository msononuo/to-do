import { Outlet } from "react-router-dom"
import Footer from "./Footer.js"
import Navbar from "./Navbar.js"

function Layout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout