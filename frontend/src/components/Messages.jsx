import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Messages = ({ selectedUser }) => {
  console.log(selectedUser._id);
  return (
    <div className="p-4 flex-1 my-3 overflow-y-auto">
        {/* ProfilePart */}
      <div className="flex flex-col gap-2 items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={selectedUser?.profilePicture} alt="pic" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-medium text-xl">{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`} ><Button variant="secondary" className="w-fit p-3 hover:bg-gray-200">
            View profile
          </Button></Link>
      </div>

      {/* MessagePart */}
      <div className="flex flex-col gap-3">
        {
            [1,2,3,4].map((msg)=>{
                return (
                    <div>
                        <div>{msg}</div>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
};

export default Messages;
