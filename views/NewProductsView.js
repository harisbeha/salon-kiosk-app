import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import { ProductList } from "../components";

export class ProtectedView extends React.Component {
  componentWillMount() {
    this.fetchNewProducts();
  }

  fetchNewProducts() {
    let token = this.props.token;
    this.props.actions.newProductsFetch();
  }

  render() {
    return (
      <div>
        {this.props.isFetching === true ? (
          <h1>Loading data...</h1>
        ) : (
          <div>
            <h1>Products</h1>
            <ProductList products={this.state.products} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data.data,
  isFetching: state.data.isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);
