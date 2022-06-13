import List from "../components/list/List";
import Input from "../components/input/Input";
import Layout from "../components/ui/Layout";
import { useLists } from "../hooks/useLists";

const MainPage = () => {
  const { refetch, status, data } = useLists();
  return (
    <Layout>
      <List refetch={refetch} status={status} data={data} />
      <Input refetch={refetch} />
    </Layout>
  );
};

export default MainPage;
