
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import styles from './style.scss';
import { Table, Button, Card, Form, Row, Col, Input, Popconfirm, Icon, Modal, DatePicker, Switch, Select } from 'antd';
import { queryUsers } from './action';

const modelFormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        const { modelVisibleFlag: modelVisibleFlagCur } = this.props.editModel;
        const { modelVisibleFlag: modelVisibleFlagNext, currentRecord } = nextProps.editModel;
        const { form: { setFieldsValue, getFieldsValue, getFieldValue, getFieldDecorator } } = this.props;
        if (!!modelVisibleFlagNext && modelVisibleFlagCur !== modelVisibleFlagNext) {
            if (currentRecord) {
                for (let key in currentRecord) {
                    if (key === 'birthday' && currentRecord.birthday) {
                        setFieldsValue({
                            birthday: moment(currentRecord.birthday)
                        });
                        continue;
                    }

                    if (!getFieldValue([key])) {
                        getFieldDecorator(key);
                    }
                    setFieldsValue({
                        [key]: currentRecord[key],
                    })
                }
            }
        }

    }

    handleModelOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = { ...values };
                if (params.birthday) {
                    params.birthday = values.birthday.format('YYYY-MM-DD HH:mm:ss');
                }
                if (params.__status === 'add'){
                    delete params.passwordConfirm
                }
                this.props.modelEditOK(params)
            }
        });
    }

    handleModelCancel = () => {
        this.props.modelEditCancel();
    }


    render() {
        const { modelVisibleFlag, saveLoading, currentRecord } = this.props.editModel;
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        return (
            <Modal
                title="编辑用户信息"
                width={800}
                className={styles.editable}
                visible={modelVisibleFlag}
                wrapClassName={null}
                onOk={this.handleModelOk}
                onCancel={this.handleModelCancel}
                closable={false}
                confirmLoading={saveLoading}
            >
                <Form className="editable">
                    <Row gutter={8} >
                        <Col sm={12}>
                            <Form.Item {...modelFormItemLayout} label="用户名">
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请填写用户名' }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={12}>
                            <Form.Item {...modelFormItemLayout} label="出生年月">
                                {getFieldDecorator('birthday', {
                                    rules: [{ required: true, message: '请填写出生年月' }]
                                })(
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8} >
                        <Col sm={12}>
                            <Form.Item {...modelFormItemLayout} label="性别">
                                {getFieldDecorator('sex', {
                                    rules: [{ required: true, message: '请填写性别' }]
                                })(
                                    <Select >
                                        <Select.Option key='1' value="F">女</Select.Option>
                                        <Select.Option key='2' value="M">男</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={12}>
                            <Form.Item {...modelFormItemLayout} label="手机号">
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请填写手机号' }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8} >
                        <Col sm={12}>
                            <Form.Item {...modelFormItemLayout} label="邮箱">
                                {getFieldDecorator('email')(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={12}>
                            <Form.Item {...modelFormItemLayout} label="身份证号">
                                {getFieldDecorator('identityCardId', {
                                    rules: [{ required: true, message: '请填写身份证号' }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    {
                        currentRecord && currentRecord.__status === 'add' ? (
                            <Row gutter={8} >
                                <Col sm={12}>
                                    <Form.Item {...modelFormItemLayout} label="密码">
                                        {getFieldDecorator('password')(
                                            <Input />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col sm={12}>
                                    <Form.Item {...modelFormItemLayout} label="确认密码">
                                        {getFieldDecorator('passwordConfirm')(
                                            <Input />,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : null
                    }
                    <Row gutter={8} >
                        <Col sm={12}>
                            <Form.Item {...modelFormItemLayout} label="是否启用">
                                {getFieldDecorator('enableFlag')(
                                    <Switch defaultChecked checked={getFieldValue('enableFlag') === 'Y'} />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

const mapStateToPropsEdit = state => {
    return {
        editModel: state.usersReducer.editModel,
    }
}

const mapDispatchToPropsEdit = dispatch => ({
    modelEditOK: (record) => dispatch({
        type: 'user/modelEditOk',
        payload: record,
    }),
    modelEditCancel: () => dispatch({
        type: 'user/modelEditCancel',
        payload: null
    }),

})

const EditFormModal = connect(mapStateToPropsEdit, mapDispatchToPropsEdit)(Form.create({})(EditModal));

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingId: '',
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'rowNumber',
            key: 'rowNumber',
            render: (text, record, index) => {
                return index + 1;
            },
        }, {
            title: '工号',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '出生年月',
            dataIndex: 'birthday',
            key: 'birthday',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: (text) => {
                return text === 'F' ? '女' : '男';
            },
        }, {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '身份证号',
            dataIndex: 'identityCardId',
            key: 'identityCardId',
        }, {
            title: '是否启用',
            dataIndex: 'enableFlag',
            key: 'enableFlag',
            render: (text) => {
                return text === 'Y' ? '是' : '否';
            },
        }, {
            title: '修改密码',
            dataIndex: 'changePassWord',
            key: 'changePassWord',
            render: () => {
                return <a>修改密码</a>
            }
        }];
    }
    componentDidMount() {
        this.props.fetchUsers();
    }

    handleClickOneRow = (record, index) => {
        var _this = this;
        return {
            onClick: () => {
                _this.props.openEditModel({
                    ...record,
                    __status: 'update',
                });
            },
        }
    }

    handleAddNew = () => {
        this.props.openEditModel({
            userId: '',
            userName: '',
            birthday: null,
            sex: null,
            phone: '',
            email: '',
            identityCardId: '',
            enableFlag: 'N',
            password: '',
            __status: "add",
        })
    }

    render() {

        const { form: { getFieldDecorator }, userList } = this.props;
        return (
            <div className={styles.userPage}>
                <Card title="" bordered={false} style={{ marginBottom: 24 }}>
                    <Form layout="horizontal">
                        <Row gutter={16} type="flex" justify="space-between" align="middle">
                            <Col lg={8} md={12} sm={24}>
                                <Form.Item label="工号">
                                    {getFieldDecorator('userId')(
                                        <Input placeholder="请输入工号" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col lg={8} md={12} sm={24}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator('userName')(
                                        <Input placeholder="请输入用户名" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col lg={8} md={12} sm={24} style={{ marginTop: 12, textAlign: 'right' }} >
                                <Button type="primary" onClick={this.handleAddNew} style={{ marginRight: 10 }}>新增</Button>
                                <Button type="primary" onClick={this.handleSubmit} style={{ marginRight: 10 }}>查询</Button>
                                <Button type="primary" onClick={this.handleSubmit} >重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card>
                    <Table
                        pagination={false}
                        dataSource={userList}
                        columns={this.columns}
                        rowKey="userId"
                        onRow={this.handleClickOneRow}
                    />
                </Card>
                <EditFormModal />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userList: state.usersReducer.userList,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(queryUsers()),
    openEditModel: (record) => dispatch({
        type: 'user/openEditModel',
        payload: record,
    })
})


export const SystemUser = connect(mapStateToProps, mapDispatchToProps)(Form.create({})(User));