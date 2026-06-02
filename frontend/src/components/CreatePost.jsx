import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const CreatePost = ({ open, setOpen }) => {

  const imageRef=useRef();

  // const createPostHandler=async()=>{
  //   try {

  //   } catch (error) {

  //   }
  // }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader className="text-center font-semibold">
            Create new post
          </DialogHeader>
          <hr />
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src="" alt="profilepic" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <h1 className="text-xs font-semibold">Username</h1>
              <span className="text-gray-600 text-xs">Bio here...</span>
            </div>
          </div>
          <Textarea className="focus-visible:ring-transparent border-none" placeholder="Write a caption..."/>
          <Input ref={imageRef} type="file" className="hidden"/>
          <Button onClick={()=>imageRef.current.click()} className="w-fit mx-auto cursor-pointer bg-[#0095F6] hover:bg-[#258bcf]">Select from computer</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
