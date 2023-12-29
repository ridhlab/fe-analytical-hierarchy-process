import {
    Breadcrumb,
    Button,
    Grid,
    Layout,
    Menu,
    Row,
    Space,
    Typography,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import {
    DatabaseOutlined,
    LineChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { colorConfig } from "@/themes/config";
import Avatar from "@/components/layout/Avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Routes } from "@/routes/routes";

interface IProps {
    children: React.ReactNode;
    title: string;
    breadcrumbs?: { label: string; href: string }[];
}

const iconSidebarStyle = {
    fontSize: 20,
    color: colorConfig.neutral.lightGray,
};

const menuKey = {
    Dashboard: Routes.Dashboard,
    VariableInput: Routes.VariableInputIndex,
    VariableOutput: Routes.VariableOutputIndex,
    Result: Routes.ResultIndex,
};

const MainLayout: React.FC<IProps> = ({ children, ...props }) => {
    const [isSiderCollapsed, setIsSiderCollapsed] = React.useState(false);
    const { md } = Grid.useBreakpoint();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeMenuKey, setActiveMenuKey] = React.useState(null);

    const menuItems = React.useMemo<ItemType<MenuItemType>[]>(
        () => [
            {
                key: menuKey.Dashboard,
                label: "Dashboard",
                icon: <PieChartOutlined style={iconSidebarStyle} />,
                onClick: () => navigate(Routes.Dashboard),
            },
            {
                key: menuKey.VariableInput,
                label: "Variable Input",
                icon: <DatabaseOutlined style={iconSidebarStyle} />,
                onClick: () => navigate(Routes.VariableInputIndex),
            },
            {
                key: menuKey.VariableOutput,
                label: "Variable Output",
                icon: <DatabaseOutlined style={iconSidebarStyle} />,
                onClick: () => navigate(Routes.VariableOutputIndex),
            },
            {
                key: menuKey.Result,
                label: "Result Predict",
                icon: <LineChartOutlined style={iconSidebarStyle} />,
                onClick: () => navigate(Routes.ResultIndex),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    React.useEffect(() => {
        setIsSiderCollapsed(!md);
    }, [md]);

    React.useEffect(() => {
        setActiveMenuKey(location.pathname);
    }, [location]);

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    padding: "1rem 0",
                    zIndex: 50,
                }}
                trigger={null}
                collapsible
                collapsed={isSiderCollapsed}
                collapsedWidth={50}
            >
                <Row justify="center" style={{ marginBottom: "2rem" }}>
                    <img src="/vite.svg" />
                </Row>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[activeMenuKey]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: colorConfig.neutral.white,
                        display: "flex",
                        alignItems: "center",
                        position: "sticky",
                        top: 0,
                        zIndex: 5,
                        boxShadow: "15px -3px 21px -5px rgba(0,0,0,0.75)",
                    }}
                >
                    <Row
                        justify="space-between"
                        style={{
                            width: "100%",
                            paddingLeft: isSiderCollapsed ? "1rem" : "10rem",
                        }}
                        align="middle"
                    >
                        <Button
                            type="text"
                            icon={
                                isSiderCollapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() =>
                                setIsSiderCollapsed(!isSiderCollapsed)
                            }
                        />
                        <Avatar />
                    </Row>
                </Header>
                <Content
                    style={{
                        backgroundColor: colorConfig.neutral.lightGray,
                        padding: isSiderCollapsed
                            ? "1rem 2rem 2rem 5rem"
                            : "1rem 2rem 2rem 14.5rem",
                    }}
                >
                    <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        size={24}
                    >
                        <Space direction="vertical" size={0}>
                            <Typography.Title level={4}>
                                {props.title}
                            </Typography.Title>
                            <Breadcrumb
                                items={props.breadcrumbs?.map(
                                    ({ href, label }) => ({
                                        title: <Link to={href}>{label}</Link>,
                                    })
                                )}
                            />
                        </Space>
                        {children}
                    </Space>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
