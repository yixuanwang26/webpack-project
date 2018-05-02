
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.scss';

export class TwoPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={styles.TwoPage}>
                <p className={styles.title}>yahahah~~</p>
                <p className={styles.content}>第二个页面哦</p>
            </div>
        )
    }
}