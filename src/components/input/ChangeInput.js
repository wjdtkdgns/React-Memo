// 데이터 변경 or 삭제
import { useState } from "react";
import styled from "styled-components";
import { useMutate } from "../../hooks/useMutate";

const ChangeInput = (props) => {
  const [title, setTitle] = useState("");

  const mutation = useMutate({ id: props.id });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.setIsCorrected(-1);
    mutation.mutate({ title, mode: "CHANGE" });
  };

  const onDeleteHandler = (e) => {
    e.preventDefault();
    props.setIsCorrected(-1);
    mutation.mutate({ title, mode: "DELETE" });
  };

  return (
    <InputBox>
      <label htmlFor="title">title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
