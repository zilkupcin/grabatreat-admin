import React, { Suspense } from "react";
// import Login from "./components/pages/Login";
// import Dashboard from "./components/pages/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Modal from "./components/modal/Modal";
import Parse from "parse";
import { ModalProvider } from "./contexts/ModalContext";
import PageMask from "./components/masks/PageMask";
import { MaskProvider } from "./contexts/MaskContext";

const Login = React.lazy(() => import("./components/pages/Login"));
const Dashboard = React.lazy(() => import("./components/pages/Dashboard"));

//DEV
Parse.initialize(
  process.env.REACT_APP_PARSE_CLIENT_KEY,
  process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <Router>
      <MaskProvider>
        <ModalProvider>
          <div className="App">
            <PageMask />
            <Modal />
            <Suspense fallback={false}>
              <Switch>
                {process.env.REACT_APP_DEMO === "0" && (
                  <Route exact path="/login" component={Login} />
                )}
                <Route exact path="/*" component={Dashboard} />
              </Switch>
            </Suspense>
          </div>
        </ModalProvider>
      </MaskProvider>
    </Router>
  );
}

export default App;
