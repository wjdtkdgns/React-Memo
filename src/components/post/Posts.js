// 데이터 표시
import { Fragment, useState } from "react";
import styled from "styled-components";
import { usePosts } from "../../hooks/usePosts";
import ChangeInput from "../input/ChangeInput";

const List = () => {
  const [isCorrected, setIsCorrected] = useState(-1);

  const { status, data } = usePosts();

  let content;

  if (status === "error") {
    content = <p>Error</p>;
  }
  if (status === "loading") {
    content = <p>Loading...</p>;
  }
  if (status === "success") {
    content = (
      <Fragment>
        {data?.data.posts.map((data) => (
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
              <ChangeInput setIsCorrected={setIsCorrected} id={data.id} />
            )}
          </div>
        ))}
      </Fragment>
    );
  }

  return <ListBox>{content}</ListBox>;
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
