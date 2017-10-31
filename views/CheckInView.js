import React from "react/addons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import reactMixin from "react-mixin";
import * as actionCreators from "../actions";
import { Link } from "react-router";

export class CheckInView extends React.Component {
  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || "/landing";
    this.state = {
      phone: "",
      pin: "",
      redirectTo: redirectRoute
    };
  }

  login(e) {
    e.preventDefault();
    this.props.actions.userLogin(
      this.state.phone,
      this.state.pin,
      this.state.redirectTo
    );
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="loginBox">
          <div className="logo">
            <Image src="../public/img/logo.png" />
          </div>

          {this.props.statusText ? (
            <div className="alert alert-info">{this.props.statusText}</div>
          ) : (
            ""
          )}
          <form role="form">
            <div className="form-group">
              <input
                type="text"
                className="form-control input-md contact"
                valueLink={this.linkState("phone")}
                placeholder="Phone"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control input-md contact"
                valueLink={this.linkState("pin")}
                placeholder="Pin"
              />
            </div>
            <center>
              <button
                type="submit"
                className="btn btn-md"
                disabled={this.props.isAuthenticating}
                onClick={this.login.bind(this)}
              >
                Submit
              </button>
            </center>
          </form>
        </div>
      </div>
    );
  }
}

reactMixin(CheckInView.prototype, React.addons.LinkedStateMixin);

const mapStateToProps = state => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
