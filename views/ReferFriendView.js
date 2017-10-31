import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";

export class ReferFriendView extends React.Component {
  componentWillMount() {}

  createReferral() {
    // !Todo - Implement logic
  }

  render() {
    return (
      <div>
        {this.props.isFetching === true ? (
          <h1>Loading data...</h1>
        ) : (
          <div>
            <h1>Refer a Friend!</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  isFetching: state.data.isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);
