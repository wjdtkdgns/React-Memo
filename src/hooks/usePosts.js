import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { fetchingStatus } from "../store/recoil/Status";
import axios from "axios";

const fetchList = () => {
  return axios.get("https://test-83dac-default-rtdb.firebaseio.com/test.json");
};

export const useLists = () => {
  const setStatus = useSetRecoilState(fetchingStatus);

  const { data } = useQuery("Lists", fetchList, {
    retry: 0,
    onSuccess: () => {
      setStatus("SUCCESS");
    },
    onError: () => {
      setStatus("ERROR");
    },
  });
  return data;
};
