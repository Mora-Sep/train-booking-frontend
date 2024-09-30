import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";

const { Sider, Content, Footer } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to="/user/user-details">User Details</Link>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <Link to="/user/complain">Complain</Link>,
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: <Link to="/user/order-history">Order History</Link>,
  },
  {
    key: "4",
    icon: <ContainerOutlined />,
    label: <Link to="/user/pending-payments">Pending Payments</Link>,
  },
  // Additional menu items can be added here
];

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme="dark"
      >
        <div className="logo" />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Button type="primary" danger>
            Logout
          </Button>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
