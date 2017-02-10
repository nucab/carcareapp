import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appBarActions from '../../actions/appBarActions';

class UserLoginPage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    // this.props.actions.drawerToggle();
  }

  render() {
    return (
      <h1>Login</h1>
    );
  }
}

function mapStateToProps(state) {
  return state;
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);
