import { useQuery } from "react-query";
import axios from "axios";

const fetchList = () => {
  return axios.get("https://test-83dac-default-rtdb.firebaseio.com/test.json");
};

export const useLists = () => {
  const { refetch, status, data } = useQuery("Lists", fetchList, {
    refetchOnWindowFocus: false,
  });
  return { refetch, status, data };
};
