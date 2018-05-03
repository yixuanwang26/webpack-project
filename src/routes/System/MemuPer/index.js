
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';

export class SystemMemuPer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={styles.TwoPage}>
                <p className={styles.title}>yahahah~~</p>
                <p className={styles.content}>系统菜单权限分配</p>
            </div>
        )
    }
}