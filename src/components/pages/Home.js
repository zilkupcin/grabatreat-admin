import React, { useState, useEffect, useContext } from "react";
import Section from "../sections/Section";
import {
  fetchCountryBreakdown,
  fetchDailyBreakdown
} from "../../api/parseCloud";
import CountryMap from "../stats/CountryMap";
import LineChart from "../stats/LineChart";
import { NotificationContext } from "../../contexts/NotificationContext";
import {
  NOTIFICATION_TYPE_NEGATIVE,
  buildNotification
} from "../../data/notifications";
import Parse from "parse";
import DemoModeWarning from "../warnings/DemoModeWarning";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countryStats, setCountryStats] = useState({});
  const [dailyStats, setDailyStats] = useState({});
  const [notification, setNotification] = useContext(NotificationContext);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const countryBreakdown = await fetchCountryBreakdown();
      setCountryStats(countryBreakdown);
      const dailyBreakdown = await fetchDailyBreakdown();
      const earnings = await Parse.Cloud.run("fetchEarningsToday");

      //Add today's earnings to the earnings statistics object
      dailyBreakdown.earnings[14] = earnings;
      setDailyStats(dailyBreakdown);
      setIsLoading(false);
    } catch (e) {
      setNotification(
        buildNotification(
          "Failed to get daily statistics",
          NOTIFICATION_TYPE_NEGATIVE
        )
      );
    }
  };

  return (
    <React.Fragment>
      <Section size="half" title="Daily Earnings">
        <LineChart
          label="Daily Turnover (USD)"
          labels={dailyStats.labels}
          data={dailyStats.earnings}
          isLoading={isLoading}
        />
      </Section>
      <Section size="half" title="Daily User Acquisition">
        <LineChart
          label="Daily Acquired Users"
          labels={dailyStats.labels}
          data={dailyStats.userCount}
          isLoading={isLoading}
        />
      </Section>
      <Section
        size="half"
        title="Today's User Demographics"
        contentClass="section__content--map"
      >
        <CountryMap data={countryStats} isLoading={isLoading} />
      </Section>
    </React.Fragment>
  );
};

export default Home;
