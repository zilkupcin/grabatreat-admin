import React, { useState, useEffect, useContext } from "react";
import { useParams, withRouter } from "react-router-dom";
import Section from "../sections/Section";
import LoadingIndicator from "../loading/LoadingIndicator";
import UserDetails from "../details/UserDetails";
import { fetchUserById } from "../../api/parseCloud";
import { NotificationContext } from "../../contexts/NotificationContext";
import { NOTIFICATION_TYPE_NEGATIVE } from "../../data/notifications";

const Viewer = withRouter(({ location }) => {
  const viewerType = location.pathname.split("/")[1];

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [object, setObject] = useState();
  const [notification, setNotification] = useContext(NotificationContext);

  const fetchObject = async () => {
    let fetchedObject;

    try {
      if (viewerType === "users") {
        fetchedObject = await fetchUserById(id);
      } else {
        throw new Error("Object type not supported");
      }

      setObject(fetchedObject);
      setIsLoading(false);
    } catch (e) {
      //Show an error notification
      setNotification(e, NOTIFICATION_TYPE_NEGATIVE);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObject();
  }, [fetchObject]);

  const getDetailsComponent = () => {
    switch (viewerType) {
      //Determines the object type and shows the details associated with that object
      case "users": {
        return <UserDetails user={object} />;
      }
      default:
        return;
    }
  };

  const getTitle = () => {
    switch (viewerType) {
      case "users": {
        return "User Info";
      }
      default:
        return;
    }
  };

  return (
    <Section title={getTitle()} size="full">
      {isLoading ? <LoadingIndicator /> : getDetailsComponent()}
    </Section>
  );
});

export default Viewer;
