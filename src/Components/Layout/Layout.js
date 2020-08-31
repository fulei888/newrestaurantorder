import React, {Component} from 'react';
import classes from './Layout.module.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component {
  state = {
    SideDrawerClosed : true,
  }

  closeSideDrawerHandler = () => {
    this.setState({SideDrawerClosed: true});
  }
  toggleSideDrawer = () => {
    this.setState(prevState => {return ({SideDrawerClosed: !prevState})});
  }
  render() {
    return (
      <React.Fragment>
        <SideDrawer 
        closeModal = {this.closeSideDrawerHandler} 
        SideDrawerClosed = {this.state.SideDrawerClosed}
        clickOpenSideDrawer = {this.state.clickOpenSideDrawer}
        isAuth = {this.props.isAuthenticated}
        />
        <Toolbar 
        clickOpenSideDrawer = {this.toggleSideDrawer}
        isAuth = {this.props.isAuthenticated}
        />
        <main className ={classes.Content}>
          {this.props.children}
        </main>
        
      </React.Fragment> 
      )
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.token != null
  }
}

export default connect(mapStateToProps)(Layout);