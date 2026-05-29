import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";

const Post = () => {
  const [text,setText]=useState("");
  const [open,setOpen]=useState(false);

  const changeEventHandler=(e)=>{
    const inputText= e.target.value;
    if(inputText.trim()){
      setText(inputText);
    }else{
      setText("");
    }
  }
  
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer"/>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
            <Button variant="ghost" className="cursor-pointer w-fit">Add to favorites</Button>
            <Button variant="ghost" className="cursor-pointer w-fit">Delete</Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
      className="rounded-sm my-2 w-full aspect-square object-cover" 
      src="https://images.unsplash.com/photo-1773332585771-5c9c5fa642d1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="post_img" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaRegHeart size={24} className="cursor-pointer hover:scale-104"/>
          <MessageCircle onClick={()=>setOpen(true)} className="cursor-pointer hover:scale-104"/>
          <Send className="cursor-pointer hover:scale-104"/>
        </div>
          <Bookmark className="cursor-pointer hover:scale-104"/>
      </div>
      <span className="font-medium mb-2">1k likes</span>
      <p>
        <span className="font-medium mr-2">username</span>
        caption
      </p>
      <span onClick={()=>setOpen(true)} className="cursor-pointer text-sm text-gray-400">view all 10 comments</span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={changeEventHandler}
        className="outline-none text-sm w-full"
        />
        {
          text && <span className="text-[#3BADF8]">Post</span>
        }
      </div>
    </div>
  );
};

export default Post;
