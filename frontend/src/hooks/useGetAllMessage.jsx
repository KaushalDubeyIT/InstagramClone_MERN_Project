import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
  const { selectedUser } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`https://instagramclone-mern-project.onrender.com/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setMessages(res.data.message));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMessage();
    }, [selectedUser]);
};
export default useGetAllMessage;