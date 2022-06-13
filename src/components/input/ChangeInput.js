// 데이터 변경 or 삭제
import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { fetchingStatus } from "../../store/recoil/Status";
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

const ChangeInput = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();
  const setStatus = useSetRecoilState(fetchingStatus);

  const { mutate } = useMutation(
    (data) =>
      fetching({
        title: data.title,
        body: data.body,
        id: props.id,
        mode: data.mode,
      }),
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
    mutate({ title, body, mode: "CHANGE" });
    props.setIsCorrected(-1);
  };

  const onDeleteHandler = (e) => {
    e.preventDefault();
    mutate({ title, body, mode: "DELETE" });
    props.setIsCorrected(-1);
  };

  return (
    <InputBox>
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
      <button onClick={onDeleteHandler}>Delete</button>
    </InputBox>
  );
};

export default ChangeInput;

const InputBox = styled.div`
  width: 1000px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  background-color: #ededed;
  & input {
    margin-top: 5px;
    margin-bottom: 10px;
  }
  & button:first-of-type {
    margin-bottom: 10px;
  }
`;
