
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './WelcomePage.scss';
import { Link, Switch, Route } from 'react-router-dom';
import BookSearch from '../routes/Book/Search';
import { DashBoard } from '../routes/DashBoard';
import { OperateBorrow } from '../routes/Operate/Borrow';
import { OperateReturn } from '../routes/Operate/Return';
import { SystemMemu } from '../routes/System/Memu';
import { SystemMemuPer } from '../routes/System/MemuPer';
import { SystemRole } from '../routes/System/Role';
import { SystemUser } from '../routes/System/User';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        const { location: { pathname }, history } = this.props;
        if(pathname === '/'){
            history.push('/dash-board');
        }
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <h2 style={{ color: '#fff', opacity: '0.7' }}>图书管理系统</h2>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            theme="dark"
                            mode="inline"
                           // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="index"><span><Icon type="laptop" /><Link to='/dash-board'>首页</Link></span></Menu.Item>
                            <SubMenu key="bookOp" title={<span><Icon type="user" />书籍操作</span>}>
                                <Menu.Item key="borrow"><Link to='/operate-borrow'>借书</Link></Menu.Item>
                                <Menu.Item key="return"><Link to='/operate-return'>还书</Link>还书</Menu.Item>
                            </SubMenu>
                            <SubMenu key="bookQuery" title={<span><Icon type="laptop" />书籍查询</span>}>
                                <Menu.Item key="query"><Link to='/book-search'>汇总查询</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="setup" title={<span><Icon type="notification" />系统配置</span>}>
                                <Menu.Item key="user"><Link to='/system-user'>用户信息</Link></Menu.Item>
                                <Menu.Item key="role"><Link to='/system-role'>角色维护</Link></Menu.Item>
                                <Menu.Item key="memu"><Link to='/system-memu'>菜单维护</Link></Menu.Item>
                                <Menu.Item key="memuPermission"><Link to='/system-memu-per'>菜单权限分配</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Switch>
                                <Route path='/dash-board' component={DashBoard} />
                                <Route path='/book-search' component={BookSearch} />
                                <Route path='/operate-borrow' component={OperateBorrow} />
                                <Route path='/operate-return' component={OperateReturn} />
                                <Route path='/system-user' component={SystemUser} />
                                <Route path='/system-role' component={SystemRole} />
                                <Route path='/system-memu' component={SystemMemu} />
                                <Route path='/system-memu-per' component={SystemMemuPer} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}