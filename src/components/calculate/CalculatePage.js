import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isEmpty } from 'lodash';
import numeral from 'numeral';

import classnames from 'classnames';

import { empty } from 'locutus/php/var';

/**
 * Material UI
 */
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Alert from 'react-bootstrap/lib/Alert';

import * as appBarActions from '../../actions/appBarActions';

const buttonStyle = {
  marginTop: 15
};

class CalculatePage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      errors: {},
      distance: 0,
      fuel: 0,
      efficiency: 0
    };
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.updatePageTitle('Calculate Consumption');
  }

  validateInput(data) {
    let errors = {};

    if(empty(data.distance)) {
      errors.distance = 'This field is required';
    }

    if(empty(data.fuel)) {
      errors.fuel = 'This field is required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  calculate = (e) => {
    e.preventDefault();

    this.setState({
      errors: {},
      isValid: false
    });

    let { errors, isValid } = this.validateInput(this.state);

    if(isValid) {
      const { distance, fuel } = this.state;
      const efficiency = distance / fuel;
      this.setState({
        efficiency,
        isValid
      });
    } else {
      this.setState({ errors });
    }
  }

	render() {
    const { errors } = this.state;

		return (
      <form>
        <TextField
          fullWidth={true}
          hintText="Fuel Used (L)"
          floatingLabelText="Fuel Used (L)"
          type="number"
          ref="fuel"
          name="fuel"
          errorText={errors.fuel && errors.fuel}
          onChange={this.onChange}
        /><br />
        <TextField
          fullWidth={true}
          hintText="Distance Travelled (Km)"
          floatingLabelText="Distance Travelled (Km)"
          type="number"
          ref="distance"
          name="distance"
          errorText={errors.distance && errors.distance}
          onChange={this.onChange}
        /><br />
        <RaisedButton onClick={this.calculate} disabled={this.state.isLoading} label="Calculate" type="submit" primary={true} style={buttonStyle} />
        <br />
        <br />
        <Alert bsStyle="info" className={classnames({ hidden: !this.state.isValid })}>
          <p>
            <span>Fuel Consumption: </span><strong>{numeral(this.state.efficiency).format('0,0.00')} L/Km</strong>
          </p>
        </Alert>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalculatePage);
