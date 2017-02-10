// This component handles the App template used on every page.
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import Header from './common/Header';
import * as appBarActions from '../actions/appBarActions';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    boxShadow: 'none'
  },
};

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    let { pathname } = this.props.location;
    let classes = 'content';
    if(pathname === '/') {
      classes += ' home';
    }

    return (
      <div className={classnames('carApp')}>
        <div className="spinner-wrapper">
          <div className="spinner" style={style.container}>
            <RefreshIndicator
              size={50}
              left={0}
              top={0}
              status="loading"
              style={style.refresh}
            />
          </div>
        </div>
        <Header {...this.props} />
        <div className={classes}>
          <div id="primary">
            {children}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
