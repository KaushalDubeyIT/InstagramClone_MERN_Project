import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/authSlice";

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePicture: file });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePicture)
      formData.append("profilePicture", input.profilePicture);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          gender: res.data.user?.gender,
          profilePicture: res.data.user?.profilePicture,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full my-8">
        {/* Heading */}
        <h1 className="font-bold text-xl py-3">Edit Profile</h1>

        {/* ProfilePhoto change */}
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-15 w-15">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-lg">{user?.username}</h1>
              <span className="text-gray-600 text-sm">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <Input
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={fileChangeHandler}
          />
          <Button
            onClick={() => imageRef.current.click()}
            className="w-fit cursor-pointer bg-[#495DF9] text-white hover:bg-[#384ef4] h-8"
          >
            Change Photo
          </Button>
        </div>

        {/* Bio */}
        <div className="w-full mt-2">
          <Label className="font-bold text-lg mb-3">Bio</Label>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
          />
        </div>

        {/* Gender */}
        <div className="w-full mt-2">
          <Label className="font-bold text-lg mb-3">Gender</Label>
          <Select
            defaultValue={input.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Prefer not to say</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div onClick={editProfileHandler} className="w-full mt-2">
          {loading ? (
            <Button className="w-full cursor-pointer bg-[#495DF9] text-white hover:bg-[#384ef4] h-10">
              <Loader2 className="w-full h-10 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full cursor-pointer bg-[#495DF9] text-white hover:bg-[#384ef4] h-10">
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
