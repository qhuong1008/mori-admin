import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthContextProvider } from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <React.StrictMode>
            <ThemeEditorProvider>
              <BrowserRouter>
                <Switch>
                  {/* <Route path={`/auth`} component={AuthLayout} /> */}
                  <Route path={`/admin`} component={AdminLayout} />
                  {/* <Route path={`/rtl`} component={RtlLayout} /> */}
                  {/* <Redirect from="/" to="/admin" /> */}
                </Switch>
              </BrowserRouter>
            </ThemeEditorProvider>
          </React.StrictMode>
        </ChakraProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
