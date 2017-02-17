import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

  render() {
    let services = this.props.services || [];
    return (
      <div>
        <ListRow entries={services} serviceType={this.props.params.serviceType} />
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
