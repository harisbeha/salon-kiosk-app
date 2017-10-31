import React from "react";
import { Route, IndexRoute } from "react-router";
import { App } from "../containers";
import {
  HomeView,
  CheckInView,
  LandingView,
  NewProductsView,
  ReferFriendView
} from "../views";

import { requireAuthentication } from "../components/AuthenticatedComponent";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="checkin" component={CheckInView} />
    <Route path="landing" component={requireAuthentication(LandingView)} />
    <Route path="products" component={NewProductsView} />
    <Route path="refer" component={requireAuthentication(ReferFriendView)} />
  </Route>
);
