import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser, setSuggestedUsers } from "@/redux/authSlice";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const dispatch = useDispatch();
  const { SuggestedUsers, user } = useSelector((store) => store.auth);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold">Suggested for you</h1>
        <span className="font-medium text-xs text-black hover:text-gray-600 cursor-pointer">
          See All
        </span>
      </div>
      {SuggestedUsers?.map((userData) => {
        const isFollowing = user?.following?.includes(userData._id);

        const followOrUnfollowHandler = async () => {
          try {
            const res = await axios.post(
              `https://instagramclone-mern-project.onrender.com/api/v1/user/followorunfollow/${userData._id}`,
              {},
              {
                withCredentials: true,
              },
            );

            if (res.data.success) {
              const updatedFollowing = isFollowing
                ? user.following.filter((id) => id !== userData._id)
                : [...user.following, userData._id];

              dispatch(
                setAuthUser({
                  ...user,
                  following: updatedFollowing,
                }),
              );

              const updatedSuggestedUsers = SuggestedUsers.map((u) =>
                u._id === userData._id
                  ? {
                      ...u,
                      followers: isFollowing
                        ? u.followers.filter((id) => id !== user._id)
                        : [...u.followers, user._id],
                    }
                  : u,
              );

              dispatch(setSuggestedUsers(updatedSuggestedUsers));

              toast.success(res.data.message);
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
            );
          }
        };

        return (
          <div
            key={userData._id}
            className="my-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${userData._id}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userData?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col justify-center">
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${userData._id}`}>
                    {userData?.username}
                  </Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {userData?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <span
              onClick={followOrUnfollowHandler}
              className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495D6]"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
