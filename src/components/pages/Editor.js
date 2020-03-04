import React, { useState, useEffect, useContext } from "react";
import { useParams, withRouter } from "react-router-dom";
import { fetchCategoryById } from "../../api/parseCloud";
import Section from "../sections/Section";
import CategoryForm from "../forms/CategoryForm";
import { parseCategory } from "../../utils/parseUtils";
import LoadingIndicator from "../loading/LoadingIndicator";
import {
  NOTIFICATION_TYPE_NEGATIVE,
  buildNotification
} from "../../data/notifications";
import { NotificationContext } from "../../contexts/NotificationContext";

const Editor = withRouter(({ location }) => {
  const pageName = location.pathname.split("/")[1];

  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useContext(NotificationContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //Determine what object to edit.
      switch (pageName) {
        case "categories": {
          const category = await fetchCategoryById(id);
          setData(parseCategory(category));
          break;
        }
        default:
          break;
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setNotification(e, NOTIFICATION_TYPE_NEGATIVE);
    }
  };

  const handleInputChange = (dataKey, value) => {
    setData({ ...data, [dataKey]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    switch (pageName) {
      case "categories":
        setNotification(
          buildNotification(
            "Function unavailable in demo mode",
            NOTIFICATION_TYPE_NEGATIVE
          )
        );
        break;
      default:
        break;
    }
  };

  return (
    <Section title="Edit Category" size="full">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <CategoryForm
          data={data}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
        />
      )}
    </Section>
  );
});

export default Editor;
