import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler=async()=>{
    alert(text);
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="p-0 !max-w-3xl"
        >
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src="https://images.unsplash.com/photo-1773332585771-5c9c5fa642d1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="post_img"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 items-center">
                  <Link>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link className="font-semibold">username</Link>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center text-sm text-center">
                    <Button
                      variant="ghost"
                      className="cursor-pointer w-fit text-[#ED4956] font-bold"
                    >
                      Unfollow
                    </Button>
                    <Button variant="ghost" className="cursor-pointer w-fit">
                      Add to favorites
                    </Button>
                    <Button variant="ghost" className="cursor-pointer w-fit">
                      Delete
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto p-4">
                Comments yahan pe aayenge...
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full outline-none border border-gray-300 p-2 rounded-l-md focus-visible:ring-transparent"
                    onChange={changeEventHandler}
                    value={text}
                  />
                  <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
