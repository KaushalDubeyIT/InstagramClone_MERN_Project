import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const { SuggestedUsers } = useSelector((store) => store.auth);
  return (
    <div className="my-5">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold">Suggested for you</h1>
        <span className="font-medium text-xs text-black hover:text-gray-600 cursor-pointer">
          See All
        </span>
      </div>
      {SuggestedUsers?.map((user) => {
        return (
          <div key={user._id} className="my-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user._id}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col justify-center">
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user._id}`}>{user?.username}</Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495D6]">Follow</span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
