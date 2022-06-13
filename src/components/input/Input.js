//  데이터 추가용
import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { fetchingStatus } from "../../store/recoil/Status";
import axios from "axios";

const fetching = (props) => {
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

const Input = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();
  const setStatus = useSetRecoilState(fetchingStatus);

  const { mutate } = useMutation(
    (props) => fetching({ title: props.title, body: props.body, id: props.id }),
    {
      retry: 0,
      onMutate: () => {
        setStatus("LOADING");
      },
      onSuccess: () => {
        // 쿼리 무효화 안하면 list 업로드가 안됨
        // 캐시가 있는 모든 쿼리 무효화
        queryClient.invalidateQueries();
        // queryKey가 'Lists'로 시작하는 모든 쿼리 무효화
        queryClient.invalidateQueries("Lists");
        setStatus("SUCCESS");
      },
      onError: () => {
        setStatus("ERROR");
      },
    }
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ title, body, id });
    setId("");
    setTitle("");
    setBody("");
  };

  return (
    <InputBox>
      <label htmlFor="id">id</label>
      <input id="id" value={id} onChange={(e) => setId(e.target.value)}></input>
      <label htmlFor="title">title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label htmlFor="body">body</label>
      <input
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button onClick={onSubmitHandler}>Submit</button>
    </InputBox>
  );
};

export default Input;

const InputBox = styled.div`
  width: 1000px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  & input {
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;
