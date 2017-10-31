import React from "react";
import { Link } from "react-router";

export default class NavBar extends React.Component {
  constructor(props, context) {
    super(props);
    context.router;
    this.state = {};
  }

  render() {
    return (
      <div className="menuBox">
        <div>
          <li className="btn horizontalBar">
            <Link to="/landing">Services</Link>
          </li>
          <li className="btn horizontalBar">
            <Link to="/products">New Products</Link>
          </li>
          <li className="btn horizontalBar">
            <Link to="/refer">Refer A Friend</Link>
          </li>
        </div>
      </div>
    );
  }
}
