import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetching = (props) => {
  if (props.mode === "DELETE") {
    return axios.delete(
      `https://test-83dac-default-rtdb.firebaseio.com/test/${props.id - 1}.json`
    );
  }
  const data = {
    title: props.title,
    body: props.body,
    id: props.id,
  };
  return axios.put(
    `https://test-83dac-default-rtdb.firebaseio.com/test/${props.id - 1}.json`,
    data
  );
};

export const useMutate = (props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => {
      const id = props.id === null ? data.id : props.id;
      fetching({
        title: data.title,
        body: data.body,
        id,
        mode: data.mode,
      });
    },
    {
      onSuccess: (data) => {
        // 쿼리 무효화 안하면 list 업로드가 안됨
        // queryKey가 'Lists'로 시작하는 모든 쿼리 무효화'
        console.log(data);
        queryClient.invalidateQueries({ refetchActive: true });
      },
    }
  );
  return mutation;
};
