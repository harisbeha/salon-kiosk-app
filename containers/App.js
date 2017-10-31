import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { logoutRedirect, checkInRedirect } from '../actions';
import { NavBar, ProductList } from '../components';

import '../styles/core.scss';
import '../styles/ios-extras.scss';
import '../styles/android-extras.scss';

@connect((state) => {
    return {
     isAuthenticated: state.auth.isAuthenticated
    };
})

export default class CoreLayout extends React.Component {

    render () {

        const {dispatch} = this.props;

        return (
            <div>
                {this.props.isAuthenticated ? 
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-8'>
                                <NavBar />
                                {this.props.children}
                            </div>
                            <div className='col-xs-4'>
                                <div className='logo'>
                                    <Image source={require('../public/assets/img/logo.png')} />
                                </div>

                                <div className='buttonBox'>
                                    <center>
                                    <button onClick={this.checkInRedirect.bind(this)} className="btn btn-lg btnCheckIn">Check In</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            
            : 
                 
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-8 productBox'>
                            <NavBar />
                            // !TODO Determine if presentational or stateful 
                            // <ProductList />
                        </div>
                        <div className='col-xs-4'>
                            <ul className='nav navbar-nav navbar-right'>
                                {this.props.children}
                            </ul>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}
