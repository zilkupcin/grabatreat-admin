import React, { useState, useContext } from "react";
import CategoryForm from "../forms/CategoryForm";
import Section from "../sections/Section";
import { validate, OBJECT_CATEGORY } from "../../utils/creatorUtils";
import { NotificationContext } from "../../contexts/NotificationContext";
import {
  NOTIFICATION_TYPE_NEGATIVE,
  buildNotification
} from "../../data/notifications";

const Creator = ({ type }) => {
  // Constants used to deremine what object type we're creating
  const TYPE_CATEGORY = "TYPE_CATEGORY";

  const [data, setData] = useState({});
  const [notification, setNotification] = useContext(NotificationContext);

  const handleInputChange = (dataKey, value) => {
    setData({ ...data, [dataKey]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const [isValid, error] = validate(OBJECT_CATEGORY, data);

    if (isValid) {
    } else {
      setNotification(buildNotification(error, NOTIFICATION_TYPE_NEGATIVE));
    }
  };

  return (
    <Section title="Add category" size="full">
      {type === TYPE_CATEGORY && (
        <CategoryForm
          newEntry={true}
          data={data}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
        />
      )}
    </Section>
  );
};

export default Creator;
