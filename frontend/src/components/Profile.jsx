import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);
  console.log(userProfile);

  const isLoggedInUser = user?._id === userProfile?._id;
  const isFollowing = true;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks ;

  return (
    <div className="flex flex-col gap-15 w-[50vw] mx-auto items-center mt-15">
      <div className="">
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
            <Link to="/account/edit"><Button
              variant="secondary"
              className="hover:bg-gray-200 w-70 h-10 cursor-pointer"
            >
              Edit profile
            </Button></Link>
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
      <div className="border-t border-t-gray-200 w-[50vw]">
        <div className="flex items-center justify-center gap-15 mt-2 text-sm">
          <span className={`py-3 cursor-pointer ${activeTab === "posts" ? "font-bold" : ""}`} onClick={()=>handleTabChange("posts")} >POSTS</span>
          <span className={`py-3 cursor-pointer ${activeTab === "saved" ? "font-bold" : ""}`} onClick={()=>handleTabChange("saved")}>SAVED</span>
          <span className="py-3 cursor-pointer">REELS</span>
          <span className="py-3 cursor-pointer">TAGS</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {
            displayedPost?.map((post)=>{
              return(
                <div key={post._id} className="relative cursor-pointer group" >
                  <img src={post.image} alt="postImage" className="rounded-sm w-full aspect-square object-cover my-2" />
                  <div className="absolute inset-0 flex justify-center items-center bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                    <div className="flex items-center space-x-4 text-white">
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <Heart/>
                        <span>{post?.likes.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-gray-300">
                        <MessageCircle size={21}/>
                        <span>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;