//  데이터 추가용
import { useState } from "react";
import styled from "styled-components";
import { useMutate } from "../../hooks/useMutate";

const Input = (props) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const mutation = useMutate({ id: null });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate({ title, id, mode: "ADD" });
    setId("");
    setTitle("");
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
