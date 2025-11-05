import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useState} from "react"
import { useSelector } from "react-redux";

const RootLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const isAuthenticated = useSelector((state) => state.isAuthenticated)

    return ( 
        <div>
            {isAuthenticated && (
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            )}
            <div>
            {isAuthenticated && (
                <Navbar toggleSidebar={() => setIsSidebarOpen(!setIsSidebarOpen)} />
            )}
                <Outlet />
            </div>
        </div>
     );
}
 
export default RootLayout;