
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';

export class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={styles.DashBoard}>
                <p className={styles.title}>yahahah~~</p>
                <p className={styles.content}>首页面板</p>
            </div>
        )
    }
}