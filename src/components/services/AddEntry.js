import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

// import { formatDate } from '../../../server/shared/tools/dateUtils';
import dateFormat from 'dateformat';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import * as serviceActions from '../../actions/serviceActions';
import * as flashMessages from '../../actions/flashMessages';
import * as appBarActions from '../../actions/appBarActions';

import validateInput from '../../../server/shared/validations/addService';

import serviceTypes from '../../config/config';


const buttonStyle = {
  marginTop: 15
};

class AddEntry extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      replacementDate: {},
      brandName: '',
      marking: '',
      remarks: '',
      serviceType: this.props.params.serviceType,
      errors: {},
      isLoading: false
    };
  }

  componentWillMount() {
    const { serviceType } = this.props.params;
    const { appBarActions } = this.props.actions;

    appBarActions.updatePageTitle('Add ' + serviceTypes[serviceType]);
  }

  datePickerOnChange = (e, date) => {
    const formatDateToString = dateFormat(date, 'yyyy-mm-dd hh:MM:ss');
    this.setState({
      replacementDate: formatDateToString
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if(!isValid) {
      this.setState({
        errors
      });
    }
    return isValid;
  }

  onSubmit = (e) => {

    e.preventDefault();

    if(this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      });

      // console.log(this.state);

      this.props.actions.serviceActions.addService(this.state).then(
        () => {
          // this.setState({
          //   isLoading: false,
          //   brandName: '',
          //   marking: '',
          //   remarks: '',
          //   replacementDate: '',
          //   errors: {}
          // });
          // this.refs.addServiceForm.reset();
          this.context.router.push(`/service/${this.props.params.serviceType}`);
        },
        (err) => {
          const { data } = err.response;
          this.setState({ errors: data, isLoading: false });
        }
      );
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form ref="addServiceForm" onSubmit={this.onSubmit} className="list">
          <DatePicker
            hintText="Date Replaced"
            className="form-control"
            name="replacementDate"
            ref="replacementDate"
            value={!isEmpty(this.state.replacementDate) ? new Date(this.state.replacementDate) : {}}
            onChange={this.datePickerOnChange}
          />
          <TextField
            className="form-control"
            hintText="Brand Name"
            floatingLabelText="Brand Name"
            fullWidth={true}
            name="brandName"
            ref="brandName"
            value={this.state.brandName}
            onChange={this.onChange}
            errorText={errors.brandName && errors.brandName}
          />
          <TextField
            className="form-control"
            hintText="Serial No."
            floatingLabelText="Serial No."
            fullWidth={true}
            name="marking"
            ref="marking"
            value={this.state.marking}
            onChange={this.onChange}
            errorText={errors.marking && errors.marking}
          />
          <TextField
            className="form-control"
            hintText="Remarks"
            floatingLabelText="Remarks"
            fullWidth={true}
            name="remarks"
            ref="remarks"
            value={this.state.remarks}
            onChange={this.onChange}
          />
          <RaisedButton disabled={this.state.isLoading} label="SAVE" type="submit" primary={true} style={buttonStyle} />
        </form>
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
      serviceActions: bindActionCreators(serviceActions, dispatch),
      appBarActions: bindActionCreators(appBarActions, dispatch),
      flashMessages: bindActionCreators(flashMessages, dispatch)
    }
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
