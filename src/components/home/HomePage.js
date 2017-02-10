import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

/**
 * Material UIs
 */
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';

import * as appBarActions from '../../actions/appBarActions';

const listItemStyle = {
  paddingTop: '6px',
  paddingBottom: '6px'
};

const dividerStyle = {
  marginTop: '15px',
  marginBottom: '15px'
};

class HomePage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.updatePageTitle('Car App');
    document.body.classList.add('show-spinner');
  }

  componentDidMount() {
    // setTimeout(() => {
      document.body.classList.remove('show-spinner');
    // }, 3000);
  }

  render() {
    return(

      <div>
        <List className="car-services">
          <Link to="/service/engine"><ListItem style={listItemStyle} primaryText={'Engine Oil'} leftIcon={<FontIcon className="flaticon-malfunction-indicador" />} /></Link>
          <Link to="/service/transmission"><ListItem style={listItemStyle} primaryText="Transmission Oil" leftIcon={<ContentInbox />} /></Link>
          <Link to="/service/antifreeze"><ListItem style={listItemStyle} primaryText="Antifreeze" leftIcon={<FontIcon className="flaticon-air-conditioning" />} /></Link>
          <Link to="/service/brake"><ListItem style={listItemStyle} primaryText="Brake Fluid" leftIcon={<FontIcon className="flaticon-brake-system-warning" />} /></Link>
          <Link to="/service/steering"><ListItem style={listItemStyle} primaryText="Power Steering Fluid" leftIcon={<ContentSend />} /></Link>
          <Link to="/service/glass"><ListItem style={listItemStyle} primaryText="Glass Washer" leftIcon={<FontIcon className="flaticon-windshield-washer" />} /></Link>
          <Divider style={dividerStyle} />
          <Link to="/service/oil"><ListItem style={listItemStyle} primaryText="Oil Filter" leftIcon={<FontIcon className="flaticon-oil" />} /></Link>
          <Link to="/service/fuel"><ListItem style={listItemStyle} primaryText="Fuel Filter" leftIcon={<ContentInbox />} /></Link>
          <Link to="/service/air"><ListItem style={listItemStyle} primaryText="Air Filter" leftIcon={<ContentInbox />} /></Link>
          <Link to="/service/cabin"><ListItem style={listItemStyle} primaryText="Cabin Air Filter" leftIcon={<ContentInbox />} /></Link>
          <Divider style={dividerStyle} />
          <Link to="/service/spark"><ListItem style={listItemStyle} primaryText="Spark Plug" leftIcon={<ContentInbox />} /></Link>
          <Link to="/service/voltage"><ListItem style={listItemStyle} primaryText="High Voltage Wire" leftIcon={<ContentInbox />} /></Link>
          <Link to="/service/belt"><ListItem style={listItemStyle} primaryText="Timing Belt" leftIcon={<ContentInbox />} /></Link>
          <Divider style={dividerStyle} />
          <Link to="/service/brake"><ListItem style={listItemStyle} primaryText="Brake Disc" leftIcon={<ContentInbox />} /></Link>
          <Link to="/service/brake-pads"><ListItem style={listItemStyle} primaryText="Brake Pads" leftIcon={<ContentInbox />} /></Link>
        </List>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(HomePage);
