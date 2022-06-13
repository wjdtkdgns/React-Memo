import styled from "styled-components";

const Layout = (props) => {
  return <Box>{props.children}</Box>;
};

export default Layout;

const Box = styled.div`
  width: 1000px;

  margin: auto auto;
  display: flex;
  flex-direction: column;
`;
