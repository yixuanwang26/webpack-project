
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './WelcomePage.scss';
import { Link, Switch, Route } from 'react-router-dom';
import { OnePage } from '../routes/OnePage';
import { TwoPage } from '../routes/TwoPage';

export class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className={styles.WelcomePage}>
                <div>
                    <div className={styles.header}>
                        <ul>
                            <li><Link to='/'>OnePage</Link></li>
                            <li><Link to='/two'>TwoPage</Link></li>
                        </ul>
                    </div>
                    <div className={styles.main}>
                        <Switch>
                            <Route exact path='/' component={OnePage} />
                            <Route path='/two' component={TwoPage} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}