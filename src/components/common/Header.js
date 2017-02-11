import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';

import { empty } from 'locutus/php/var';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
// import FlatButton from 'material-ui/FlatButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import * as appBarActions from '../../actions/appBarActions';
// import serviceTypes from '../../config/config';

const avatarStyle = {
  color: "#FFF"
};

const navStyle = {
  position: 'fixed'
};

const menuItemStyle = {
  paddingLeft: '0px',
  paddingRight: '0px'
};

class Header extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    drawer: PropTypes.bool,
    logged: PropTypes.bool
  };


  constructor(props) {
    super(props);

    this.drawerToggle = this.drawerToggle.bind(this);

    this.state = {
      drawer: false,

    };
  }

  drawerToggle() {
    this.setState({
      drawer: !this.state.drawer
    });
  }

  render() {
    const { serviceType } = this.props.params;

    return (
      <div className="primary-navigation-container">
        <Drawer
          docked={false}
          containerClassName="primary-navigation"
          width={250}
          open={this.state.drawer}
          onRequestChange={this.drawerToggle}
          style={navStyle}
        >
          <div className="user-top">
            <div className="user-info">
              <List>
                <ListItem
                  disabled={true}
                  leftAvatar={<Avatar>A</Avatar>}
                  style={avatarStyle}
                >
                  Noah John
                </ListItem>
              </List>
            </div>
          </div>

          <MenuItem innerDivStyle={menuItemStyle}><IndexLink to="/">Car App</IndexLink></MenuItem>
          <MenuItem innerDivStyle={menuItemStyle}><Link to="/fuel">Fuel Consumption</Link></MenuItem>
          <MenuItem innerDivStyle={menuItemStyle}><Link to="/travel">Travel Cost</Link></MenuItem>
          <MenuItem innerDivStyle={menuItemStyle}><Link to="/calculate">Calculate Consumption</Link></MenuItem>
          <Divider />
          <MenuItem innerDivStyle={menuItemStyle}><Link to="/settings">Settings</Link></MenuItem>
          <MenuItem innerDivStyle={menuItemStyle}><Link to="/logout">Log Out</Link></MenuItem>
        </Drawer>
        <AppBar
          style={navStyle}
          className="appBar"
          title={this.props.pageTitle}
          iconElementLeft={
            empty(serviceType) ?
            <IconButton className="hidden-sm hidden-md hidden-lg" onTouchTap={this.drawerToggle}><NavigationMenu className="hidden-sm hidden-md hidden-lg" /></IconButton> :
            <Link to={this.props.serviceAction == 'LIST_ENTRIES' ? '/' : '/service/' + serviceType}><IconButton><NavigationArrowBack color={'#FFF'} /></IconButton></Link>
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      appBarActions: bindActionCreators(appBarActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
