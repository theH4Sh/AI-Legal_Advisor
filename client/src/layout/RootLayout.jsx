import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
const RootLayout = () => {
    return ( 
        <div>
            <Sidebar />
            <div>
                <Navbar />
                <Outlet />
            </div>
        </div>
     );
}
 
export default RootLayout;