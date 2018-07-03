import React from "react";

import Loadable from "react-loadable";
import Spinner from "./components/animation/Spinner";

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
    path: "/:tripId",
    exact: true,
    main: Loadable({
      loader: () => import("./pages/TripPage"),
      loading: Loading
    })
  }
];

export default routes;
