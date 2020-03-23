import "react-hot-loader"
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store";

import Configuration from "./configuration";

import Index from "./components/index";

// Load the configuration from the 'configuration' scope variable

// Setup the initial Store values
//Session.thunks.setSessionJwt(configuration.token)(store.dispatch);
//ReviewStatus.thunks.getReviewStatus()(store.dispatch, store.getState);

// Load the configuration from the 'configuration' scope variable
declare const configuration : Configuration

// Bootstrap React, and Redux
ReactDOM.render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById(configuration.containerId)
);
