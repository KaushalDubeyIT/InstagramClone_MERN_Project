import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";

const Messages = ({ selectedUser }) => {
  useGetAllMessage();
    const { messages } = useSelector((store) => store.chat);

  console.log(selectedUser._id);
  return (
    <div className="p-4 flex-1 my-3 overflow-y-auto">
        {/* ProfilePart */}
      <div className="flex flex-col gap-2 items-center">
        <Link to={`/profile/${selectedUser?._id}`} >
        <Avatar className="h-24 w-24 cursor-pointer">
          <AvatarImage src={selectedUser?.profilePicture} alt="pic" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </Link>
        <span className="font-medium text-xl">{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`} ><Button variant="secondary" className="w-fit p-3 hover:bg-gray-200 cursor-pointer">
            View profile
          </Button></Link>
      </div>

      {/* MessagePart */}
      <div className="flex flex-col gap-3">
        {
            messages && messages.map((msg)=>{
                return (
                    <div>
                        <div>{msg.message}</div>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
};

export default Messages;
