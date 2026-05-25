import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "Explore" },
  { icon: <MessageCircle />, text: "Messages" },
  { icon: <Heart />, text: "Notifications" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <LogOut />, text: "Logout" },
];

const LeftSidebar = () => {
    const navigate= useNavigate();

    const logOutHandler=async()=>{
        try {
            const res=await axios.get("http://localhost:8000/api/v1/user/logout",{withCredentials:true});
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler=(textType)=>{
        if(textType == "Logout") logOutHandler();
    }

  return (
    <div className="fixed top-0 left-0 z-10 border-r border-gray-300 px-4 h-screen w-[16%] ">
      <div className="flex flex-col gap-3">
         <Link
          to="/"
          className="w-fit p-3 mt-4 mb-6 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <FaInstagram size={28} />
        </Link>
        {sidebarItems.map((item, index) => {
          return (
            <div
              key={index}
              onClick={()=>sidebarHandler(item.text)}
              className="flex items-center gap-3 relative hover:bg-gray-100 rounded-lg cursor-pointer p-3"
            >
              {item.icon}
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
