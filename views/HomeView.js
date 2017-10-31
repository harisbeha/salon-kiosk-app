import React from "react";
import { Link } from "react-router";
import { logoutRedirect } from "../actions";

export default class HomeView extends React.Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <li>
              <a
                href="#"
                onClick={() => this.props.dispatch(logoutRedirect())}
              >
                Done
              </a>
            </li>
          </div>
        ) : (
          <div className="checkInBox">
            <div className="logo">
              <Image src="../public/img/logo.png" />
            </div>
            <center>
              <div className="buttonBox">
                <center>
                  <li className="btn loginBtn">
                    <Link to="/checkin">Check In</Link>
                  </li>
                </center>
              </div>
            </center>
          </div>
        )}
      </div>
    );
  }
}
