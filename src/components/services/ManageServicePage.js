import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { isEmpty } from 'lodash';

import * as serviceActions from '../../actions/serviceActions';
import * as appBarActions from '../../actions/appBarActions';
import * as flashMessages from '../../actions/flashMessages';

import serviceTypes from '../../config/config';

import ListRow from './ListRow';

class ManageServicePage extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    entries: []
  };

  static propTypes = {
    actions: PropTypes.object,
    entries: PropTypes.array.isRequired
  };

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentWillMount() {
    document.body.classList.add('show-spinner');
    const { appBarActions } = this.props.actions;
    const { serviceType } = this.props.params;

    appBarActions.updatePageTitle(serviceTypes[serviceType]);
    appBarActions.updateNavAction('LIST_ENTRIES');

    const { serviceActions } = this.props.actions;
    serviceActions.loadServicesByType(serviceType)
      .then(() => {
        if(isEmpty(this.props.services)) this.context.router.push(`/service/${serviceType}/add`);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      serviceType: this.props.params.serviceType
    });
  }

  componentDidMount() {
    document.body.classList.remove('show-spinner');
  }

  goToEditPage = (url) => {
    console.log(this.context.router);
    // this.context.router.push(url);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    let services = this.props.services || [];

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <ListRow goToEditPage={this.goToEditPage} openDialog={this.handleOpen} entries={services} serviceType={this.props.params.serviceType} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    services: state.services
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      serviceActions: bindActionCreators(serviceActions, dispatch),
      flashMessages: bindActionCreators(flashMessages, dispatch),
      appBarActions: bindActionCreators(appBarActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageServicePage);
