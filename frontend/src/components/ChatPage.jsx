import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";

const ChatPage = () => {
  const { user, SuggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const isOnline=true;
  const dispatch = useDispatch();

  return (
    <div className="ml-[16%] h-screen flex">
      <section>
        <h1 className="font-bold mb-4 px-3 text-xl" >{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="h-[80vh] overflow-y-auto">
          {
            SuggestedUsers?.map((suggestedUser)=>{
              // console.log(suggestedUser)
              return(
                <div key={suggestedUser?._id} onClick={()=> dispatch(setSelectedUser(suggestedUser))} className="flex gap-3 items-center py-3 pl-3 pr-30 cursor-pointer hover:bg-gray-50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={suggestedUser.profilePicture} alt="profileImage" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser.username}</span>
                  <span className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600" } `}>{isOnline ? "Online" : "Offline"}</span>
                </div>
              </div>
              )
            })
          }
        </div>
      </section>
      {
        selectedUser ? (
          <section className="flex-1 border-l border-gray-300 flex flex-col h-full">
            <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 z-10">
              <Avatar className="">
                  <AvatarImage src={selectedUser?.profilePicture} alt="profileImage" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{selectedUser?.username}</span>
                </div>
            </div>
            messages aayenge
            <div className="flex items-center p-4 border-t border-gray-300">
              <Input type="text" className="focus-visible:ring-transparent flex-1 mr-2" placeholder="Enter your message..." />
              <Button>Send</Button>
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center mx-auto">
            <MessageCircleCode className="h-32 w-32" />
            <h1 className="font-medium text-xl">Your messages</h1>
            <span>Send a message to start a chat.</span>
          </div>
        )
      }
    </div>
  );
};

export default ChatPage;
