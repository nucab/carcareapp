import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

/**
 * Material UI
 */
import FlatButton from 'material-ui/FlatButton';

import Alert from 'react-bootstrap/lib/Alert';

import * as appBarActions from '../../actions/appBarActions';

const buttonAlertStyle = {
  paddingLeft: 16,
  paddingRight: 16,
}

class FuelPage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  // static defaultProps = {
  //   title: 'asdfasdf'
  // }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.updatePageTitle('Fuel Consumption');
  }

  render() {
    return (
      <Alert bsStyle="warning">
        <span>Fuel consumption wasn't added</span> <Link to="fuel/add"><FlatButton style={buttonAlertStyle} primary={true}>Add first one</FlatButton></Link>
      </Alert>
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

export default connect(mapStateToProps, mapDispatchToProps)(FuelPage);
