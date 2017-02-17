import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import dateFormat from 'dateformat';

import { isEmpty } from 'lodash';
import { empty } from 'locutus/php/var';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import * as serviceActions from '../../actions/serviceActions';
import * as flashMessages from '../../actions/flashMessages';
import * as appBarActions from '../../actions/appBarActions';

import serviceTypes from '../../config/config';

const buttonStyle = {
  marginTop: 15
};

class EditEntry extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    service: PropTypes.object.isRequired
  };

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      service: Object.assign({}, this.props.service),
      errors: {},
      isLoading: false
    };
  }

  componentWillMount() {
    const { appBarActions } = this.props.actions;
    appBarActions.updateNavAction('VIEW_ENTRIES');

    const { serviceActions } = this.props.actions;
    const { serviceId, serviceType } = this.props.params;

    serviceActions.loadService(serviceId);
    appBarActions.updatePageTitle('Edit ' + serviceTypes[serviceType]);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.service.id != nextProps.service.id) {
      // necessary to populate form for existing service is loaded directly
      this.setState({
        service: Object.assign({}, nextProps.service)
      });
    }
  }

  datePickerOnChange = (e, date) => {

    const { service } = Object.assign({}, this.state);
    //
    // let _service = service;
    // // _service.replacementDate = moment(date).format();
    // let formatReplacementDate = dateFormat(date, 'isoDateTime');
    // _service.replacementDate = formatReplacementDate;
    //
    // // console.log(_service);
    //
    // this.setState({
    //   service: _service
    // });

    const formatDateToString = dateFormat(date, 'yyyy-mm-dd hh:MM:ss');
    service.replacementDate = formatDateToString;
    this.setState({
      service
    });
  }

  updateServiceState = (e) => {
    const field = e.target.name;
    let service = this.state.service;
    service[field] = e.target.value;
    return this.setState({service});
  }

  validateInputs(data) {
    let errors = {};

    if(empty(data.brandName)) errors.brandName = 'This field is required';
    if(empty(data.marking)) errors.marking = 'This field is required';

    return {
      errors,
      isValid: isEmpty(errors)
    }
  }

  isValid(data) {
    const { errors, isValid } = this.validateInputs(data);
    if(!isValid) {
      this.setState({
        errors
      });
    }
    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { service } = this.state;

    if(this.isValid(service)) {
      this.setState({
        errors: {},
        // isLoading: true
      });
      this.props.actions.serviceActions.updateService(service).then(
        () => {
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
    const { errors, service } = this.state;
    // let replacementDate = service.replacementDate;

    // if(!isEmpty) replacementDate = dateFormat(replacementDate);
    // console.log(service.replacementDate);
    // console.log(service.replacementDate);
    // console.log(replacementDate);
    // console.log(dateFormat(service.replacementDate));



    // console.log(moment(formatReplacementDate).isValid());

    // console.log(formatReplacementDate);
    return (
      <div>
        <form onSubmit={this.onSubmit} className="list">
          <DatePicker
            format={null}
            hintText="Date Replaced"
            className="form-control"
            name="replacementDate"
            value={!isEmpty(service.replacementDate) ? new Date(service.replacementDate) : {}}
            onChange={this.datePickerOnChange}
          />
          <TextField
            className="form-control"
            hintText="Brand Name"
            floatingLabelText="Brand Name"
            fullWidth={true}
            name="brandName"
            value={service.brandName}
            onChange={this.updateServiceState}
            errorText={errors.brandName && errors.brandName}
          />
          <TextField
            className="form-control"
            hintText="Serial No."
            floatingLabelText="Serial No."
            fullWidth={true}
            name="marking"
            value={service.marking}
            onChange={this.updateServiceState}
            errorText={errors.marking && errors.marking}
          />
          <TextField
            className="form-control"
            hintText="Remarks"
            floatingLabelText="Remarks"
            fullWidth={true}
            name="remarks"
            value={service.remarks}
            onChange={this.updateServiceState}
          />
          <RaisedButton disabled={this.state.isLoading} label="Save Changes" type="submit" primary={true} style={buttonStyle} />
        </form>
      </div>
    );
  }
}

function getServiceById(services, id) {
  const service = services.filter(service => service.id == id);
  if (service.length) return service[0]; // since filter returns an array, have to grab the first item
  return null;
}

function mapStateToProps(state, ownProps) {
  const serviceId = ownProps.params.serviceId; // from the path `/course/:id`
  let service = { brandName: '', remarks: '', marking: '' };
  if(serviceId && state.services.length > 0) {
    service = getServiceById(state.services, serviceId);
  }
  return {
    service
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
