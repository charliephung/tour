import React from "react";

import Loadable from "react-loadable";
import Spinner from "./components/animation/spinner";

// Loading
const Loading = () => <Spinner />;

const routes = [
  {
    path: "/",
    exact: true,
    main: Loadable({
      loader: () => import("./pages/HomePage"),
      loading: Loading
    })
  },
  {
    path: "/saigon",
    exact: true,
    main: Loadable({
      loader: () => import("./pages/TripPage"),
      loading: Loading
    })
  }
];

export default routes;
