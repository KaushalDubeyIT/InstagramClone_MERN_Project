import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { readFileAsDataUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth)

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataUrl(file);
      setImagePreview(dataUrl);
      // console.log(dataUrl)
    }
  };

  const closeHandler = () => {
  setOpen(false);
  setFile("");
  setCaption("");
  setImagePreview("");
}

  const createPostHandler=async(e)=>{
    const formData = new FormData();
    formData.append("caption",caption);
    if(imagePreview) formData.append("image",file);
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/post/addpost",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent onInteractOutside={closeHandler}>
          <DialogHeader className="text-center font-semibold">
            Create new post
          </DialogHeader>
          <hr />
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="profilepic" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <h1 className="text-xs font-semibold">{user?.username}</h1>
              <span className="text-gray-600 text-xs">Bio here...</span>
            </div>
          </div>
          <Textarea
            className="focus-visible:ring-transparent border-none"
            value={caption}
            onChange={(e)=>setCaption(e.target.value)}
            placeholder="Write a caption..."
          />
          {imagePreview && (
            <div className="w-full h-64 overflow-hidden rounded-md">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <Input
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={fileChangeHandler}
          />
          <Button
            onClick={() => imageRef.current.click()}
            className="w-fit mx-auto cursor-pointer bg-[#0095F6] hover:bg-[#258bcf]"
          >
            Select from computer
          </Button>
          {
            imagePreview && (
              loading?(
                <Button className="py-5">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ):(
                <Button onClick={createPostHandler} type="submit" className="w-full py-5" >Post</Button>
              )
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
