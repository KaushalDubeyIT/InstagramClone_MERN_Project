import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const { userProfile } = useSelector((store) => store.auth);
  console.log(userProfile);

  const isLoggedInUser = true;
  const isFollowing = true;

  return (
    <div className="flex flex-col w-[50vw] mx-auto items-center mt-15">
      <div>
        {/* upper */}
        <div className="flex items-center justify-start gap-5 mr-45">
          {/* left */}
          <section className="">
            <Avatar className="h-36 w-36 cursor-pointer">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilePhoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          {/* right */}
          <section className="flex flex-col gap-2">
            <div className="font-bold text-2xl cursor-pointer">
              {userProfile?.username}
            </div>
            <div className="text-sm">{userProfile?.bio || "Bio here..."}</div>
            <div className="flex gap-3 items-center">
              <p>
                <span className="font-semibold">
                  {userProfile?.posts.length}
                </span>{" "}
                <span className="text-sm">posts</span>
              </p>
              <p>
                <span className="font-semibold">
                  {userProfile?.followers.length}
                </span>{" "}
                <span className="text-sm">followers</span>
              </p>
              <p>
                <span className="font-semibold">
                  {userProfile?.following.length}
                </span>{" "}
                <span className="text-sm">following</span>
              </p>
            </div>
            {isLoggedInUser && (
              <Badge
                variant="secondary"
                className="p-2 text-sm flex items-center cursor-pointer"
              >
                <AtSign />
                <span>{userProfile?.username}</span>
              </Badge>
            )}
          </section>
        </div>

        {/* lower */}
        {isLoggedInUser ? (
          <div className="flex gap-4 mt-6 w-full justify-center">
            <Button
              variant="secondary"
              className="hover:bg-gray-200 w-70 h-10 cursor-pointer"
            >
              Edit profile
            </Button>
            <Button
              variant="secondary"
              className="hover:bg-gray-200 w-70 h-10 cursor-pointer"
            >
              View archive
            </Button>
          </div>
        ) : isFollowing ? (
          <div className="flex gap-4 mt-6 w-full justify-center">
            <Button className="bg-[#495DF9] text-white hover:bg-[#384ef4] w-70 h-10 cursor-pointer">
              Follow
            </Button>
            <Button
              variant="secondary"
              className="hover:bg-gray-200 w-70 h-10 cursor-pointer"
            >
              Message
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <Button className="bg-[#495DF9] text-white hover:bg-[#384ef4] w-140 h-10 cursor-pointer">
              Follow
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
