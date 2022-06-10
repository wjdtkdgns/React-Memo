// 데이터 표시
import styled from "styled-components";
import useLists from "../../hooks/usePosts";

const List = () => {
  const data = useLists();
  return (
    <ListBox>
      {data?.data.map((data) => (
        <div key={data.id}>
          <p>
            <span>
              {data.id} {data.title}
            </span>
          </p>
          <p>{data.body}</p>
        </div>
      ))}
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
