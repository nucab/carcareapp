import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appBarActions from '../../actions/appBarActions';

class SettingsPage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.updatePageTitle('Settings');
  }

  render() {
    return (
      <h1>Settings</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
