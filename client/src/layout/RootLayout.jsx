import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useState} from "react"

const RootLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    return ( 
        <div>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div>
                <Navbar toggleSidebar={() => setIsSidebarOpen(!setIsSidebarOpen)} />
                <Outlet />
            </div>
        </div>
     );
}
 
export default RootLayout;