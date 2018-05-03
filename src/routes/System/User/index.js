
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';

export class SystemUser extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={styles.TwoPage}>
                <p className={styles.title}>yahahah~~</p>
                <p className={styles.content}>系统用户配置</p>
            </div>
        )
    }
}