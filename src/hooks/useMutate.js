import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetching = (props) => {
  if (props.mode === "DELETE") {
    return axios
      .delete(`https://dummyjson.com/posts/${props.id}`)
      .then(console.log);
  }
  if (props.mode === "ADD") {
    return axios
      .post(
        `https://dummyjson.com/posts/add`,
        JSON.stringify({
          title: props.title,
          userId: 1,
        }),
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
      .then(console.log);
  }
  if (props.mode === "CHANGE")
    return axios
      .put(
        `https://dummyjson.com/posts/${props.id}`,
        JSON.stringify({
          title: props.title,
        }),
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
      .then(console.log);
};

export const useMutate = (props) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) => {
      const id = props.id === null ? data.id : props.id;
      fetching({
        title: data.title,
        id,
        mode: data.mode,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Posts");
      },
    }
  );
};
