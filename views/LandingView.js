import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";

export class LandingView extends React.Component {
  componentWillMount() {
    this.fetchServices();
  }

  fetchServices() {
    let token = this.props.token;
    this.props.actions.servicesFetch(token);
  }

  renderServices() {
    // Map services into unordered list
  }

  render() {
    return (
      <div>
        {this.props.isFetching === true ? (
          <h1>Loading data...</h1>
        ) : (
          <div>
            <h1>Landing Page</h1>
            <h1>
              Welcome back,
              {this.props.userName}!
            </h1>
            <h3>'!Todo render services'</h3>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  services: state.data.data,
  isFetching: state.data.isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);
