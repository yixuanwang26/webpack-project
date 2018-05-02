
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './FreePage.scss';
import { Link, Switch, Route } from 'react-router-dom';


export class FreePage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className={styles.FreePage}>
                <div>
                    lallalala 我是卖报的小行家
                </div>
            </div>
        )
    }
}