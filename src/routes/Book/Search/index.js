
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import { QUERY_BOOKS } from './actionTypes';
import { queryBooks } from './action';

class BookSearch extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.test();
    }

    getColumns = () => {
        return [{
            title: '书名',
            dataIndex: 'bookName',
            key: 'bookName',
        }, {
            title: '语言',
            dataIndex: 'language',
            key: 'language',
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        }];
    }

    addRow = () => {
        this.props.test();
    }

    render() {
        const { books } = this.props;
        const columns = this.getColumns();
        return (
            <div className={styles.TwoPage}>
                <p className={styles.title}>yahahah~~</p>
                <p className={styles.content}>书籍查询界面</p>
                <Button type="primary" onClick={this.addRow}>增加一条数据</Button>
                <Table 
                columns={columns} 
                dataSource={books} 
                rowKey="id"
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.booksReducer.books,
    }
}

const mapDispatchToProps = dispatch => ({
    test: () => dispatch(queryBooks())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookSearch)

