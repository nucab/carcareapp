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

class TravelPage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isValid: false,
      distance: 0,
      fuelPer100: 0,
      fuelCost: 0,
      totalCost: 0,
      amountFuel: 0,
      errors: {}
    };
  }

  componentWillMount() {
    this.props.actions.updatePageTitle('Travel Cost');
  }

  validateInput(data) {
    let errors = {};

    if(empty(data.distance)) {
      errors.distance = 'Field must consist of only numbers';
    }

    if(empty(data.fuelPer100)) {
      errors.fuelPer100 = 'Field must consist of only numbers';
    }

    if(empty(data.fuelCost)) {
      errors.fuelCost = 'Field must consist of only numbers';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

    // if()
    // console.log(e.target.getAttribute('required'));
    //
    // const { errors, isValid} = this.validateInput(this.state);
    // if(!isValid) this.setState({ errors });
  }

  calculate = (e) => {
    e.preventDefault();

    this.setState({
      errors: {},
      isValid: false
    });

    let { errors, isValid } = this.validateInput(this.state);

    if(isValid) {
      const { distance, fuelPer100, fuelCost } = this.state;
      const amountFuel = (distance / 100) * fuelPer100;
      const totalCost = amountFuel * fuelCost;
      this.setState({
        amountFuel,
        totalCost,
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
          hintText="Distance / km"
          floatingLabelText="Distance / km"
          type="number"
          ref="distance"
          name="distance"
          errorText={errors.distance && errors.distance}
          onChange={this.onChange}
          onBlur={this.onChange}
        /><br />
        <TextField
          fullWidth={true}
          hintText="Fuel Consumption per 100 km"
          floatingLabelText="Fuel Consumption per 100 km"
          type="number"
          ref="fuelPer100"
          name="fuelPer100"
          errorText={errors.fuelPer100 && errors.fuelPer100}
          onChange={this.onChange}
          onBlur={this.onChange}
        /><br />
        <TextField
          fullWidth={true}
          hintText="Fuel cost per 1 liter"
          floatingLabelText="Fuel cost per 1 liter"
          type="number"
          ref="fuelCost"
          name="fuelCost"
          errorText={errors.fuelCost && errors.fuelCost}
          onChange={this.onChange}
          onBlur={this.onChange}
        /><br />
        <RaisedButton onClick={this.calculate} disabled={this.state.isLoading} label="Get travel cost" type="submit" primary={true} style={buttonStyle} />
        <br />
        <br />
        <Alert bsStyle="info" className={classnames({ hidden: !this.state.isValid })}>
          <p>
            <span>The required amount of fuel: </span><strong>{numeral(this.state.amountFuel).format('0,0.00')}</strong>
          </p>
          <p>
            <span>Travel Cost: </span><strong>{numeral(this.state.totalCost).format('0,0.00')}</strong>
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

export default connect(mapStateToProps, mapDispatchToProps)(TravelPage);
