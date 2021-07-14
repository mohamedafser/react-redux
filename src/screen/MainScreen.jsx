import { Tabs } from "antd";
import { Todo } from "./Todo/Todo";
import { User } from "./Users/User";
import { Layout } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export const MainScreen = () => {
  const { Content } = Layout;

  return (
    <div className="container">
      <Layout style={{ background: "transparent" }}>
        <Content>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Todos" key="1">
              <Todo />
            </TabPane>
            <TabPane tab="Users" key="2">
              <User />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
};
