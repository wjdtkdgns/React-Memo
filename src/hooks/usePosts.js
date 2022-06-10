import axios from "axios";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { fetchingStatus } from "../store/recoil/Status";

// 전부
const fetchList = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

const useLists = () => {
  const setStatus = useSetRecoilState(fetchingStatus);

  const { status, data, error } = useQuery("Lists", fetchList);
  if (status === "loading") {
    setStatus("LOADING");
    return null;
  }
  if (status === "error") {
    setStatus("ERROR");
    alert(error);
    return null;
  }
  return data;
};

export default useLists;
