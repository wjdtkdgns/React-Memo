// 데이터 표시
import { useState } from "react";
import styled from "styled-components";
import ChangeInput from "../input/ChangeInput";

const List = (props) => {
  const [isCorrected, setIsCorrected] = useState(-1);

  return (
    <ListBox>
      <button onClick={props.refetch}>refetch</button>
      {/* 임시 */}
      {props.status === "loading" ? <p>Loading...</p> : ""}
      {props.status === "error" ? <p>Error</p> : ""}
      {props.status === "success"
        ? props.data?.data
            .filter((data) => data !== null)
            .map((data) => (
              <div key={data.id}>
                <p>
                  <span>
                    {data.id} {data.title}
                  </span>
                </p>
                <p>{data.body}</p>
                <button
                  onClick={() => {
                    isCorrected === -1
                      ? setIsCorrected(data.id)
                      : setIsCorrected(-1);
                  }}
                >
                  change
                </button>
                {isCorrected === data.id && (
                  <ChangeInput
                    setIsCorrected={setIsCorrected}
                    refetch={props.refetch}
                    id={data.id}
                  />
                )}
              </div>
            ))
        : ""}
    </ListBox>
  );
};

export default List;

const ListBox = styled.div`
  width: 1000px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  & div {
    width: 100%;
  }

  & div p {
    margin: 5px 10px;
    font-size: 15px;
  }

  & div span {
    font-size: 20px;
  }
`;
