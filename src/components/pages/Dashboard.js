import React, { useState, useEffect, useContext, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { defaults } from "react-chartjs-2";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
// import Home from "./Home";
// import Config from "./Config";
// import Categories from "./Categories";
// import Orders from "./Orders";
import Parse from "parse";
// import Editor from "./Editor";
import Notifications from "../notifications/Notifications";
import { NotificationProvider } from "../../contexts/NotificationContext";
// import Creator from "./Creator";
// import Users from "./Users";
// import Viewer from "./Viewer";
import NavigationMobile from "../navigation/NavigationMobile";
import { MaskContext } from "../../contexts/MaskContext";
// import NotFound from "./NotFound";
import DemoModeWarning from "../warnings/DemoModeWarning";
import LoadingIndicator from "../loading/LoadingIndicator";

const Home = React.lazy(() => import("./Home"));
const Config = React.lazy(() => import("./Config"));
const Categories = React.lazy(() => import("./Categories"));
const Orders = React.lazy(() => import("./Orders"));
const Editor = React.lazy(() => import("./Editor"));
const Creator = React.lazy(() => import("./Creator"));
const Users = React.lazy(() => import("./Users"));
const Viewer = React.lazy(() => import("./Viewer"));
const NotFound = React.lazy(() => import("./NotFound"));

defaults.global.defaultFontFamily = "Poppins";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [maskActive, setMaskActive] = useContext(MaskContext);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const statsPromises = [
        Parse.Cloud.run("fetchEarningsToday"),
        Parse.Cloud.run("fetchUserCountTotal"),
        Parse.Cloud.run("fetchOrderCostToday")
      ];

      const [earnings, userCount, orderCost] = await Promise.all(statsPromises);

      setStats({
        earningsToday: earnings,
        orderCostToday: orderCost,
        userCountAllTime: userCount
      });
      setIsLoading(false);
    } catch (e) {}
  };

  const handleMobileMenuCloseClick = () => {
    setMaskActive(false);
    setMobileMenuActive(false);
  };

  const handleMobileMenuClick = () => {
    setMobileMenuActive(true);
    setMaskActive(true);
  };

  const handleMobileMenuItemSelect = () => {
    setMobileMenuActive(false);
    setMaskActive(false);
  };

  //Unlsess the website is in demo mode, redirect to the login page if user is not logged in
  if (process.env.REACT_APP_DEMO === "0" && Parse.User.current() === null) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <NavigationMobile
        isActive={mobileMenuActive}
        onClose={handleMobileMenuCloseClick}
        onSelect={handleMobileMenuItemSelect}
        stats={stats}
        isLoading={isLoading}
      />
      <Header
        stats={stats}
        isLoading={isLoading}
        onMobileMenuClick={handleMobileMenuClick}
      />
      <div className="container">
        <NotificationProvider>
          <Notifications />
          <Navigation />
          <div className="content">
            <DemoModeWarning />
            <Suspense fallback={<LoadingIndicator fullHeight={true} />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/config" component={Config} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/categories/edit/:id" component={Editor} />
                <Route
                  exact
                  path="/categories/new"
                  component={() => <Creator type="TYPE_CATEGORY" />}
                />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/users/*/:id" component={Viewer} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Suspense>
          </div>
        </NotificationProvider>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
