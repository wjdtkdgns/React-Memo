import { useQuery } from "react-query";
import axios from "axios";

const fetchList = () => {
  return axios.get("https://dummyjson.com/posts");
};

export const usePosts = () => {
  return useQuery("Posts", fetchList, {
    refetchOnWindowFocus: false,
  });
};
