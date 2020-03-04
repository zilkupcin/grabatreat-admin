import React from "react";
import { formatDate } from "../../utils/dateUtils";
import ErrorNoData from "../errors/ErrorNoData";

const UserDetails = ({ user }) => {
  //Dynamically extract values from Parse.Object
  const getValue = key => {
    const value = user.get(key);

    if (value === undefined || value === "") {
      return "-";
    } else if (value instanceof Date) {
      return formatDate(value);
    } else {
      return value;
    }
  };

  if (!user) {
    return <ErrorNoData message="No such user found" />;
  }

  return (
    <div className="details">
      <div className="detail">
        <label className className="detail__label">
          Username
        </label>
        <span className="detail__value">{getValue("username")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Email
        </label>
        <span className="detail__value">{getValue("email")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Registration Country
        </label>
        <span className="detail__value">{getValue("regCountry")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Last Session Country
        </label>
        <span className="detail__value">{getValue("sessionCountry")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Registration IP Address
        </label>
        <span className="detail__value">{getValue("regIp")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Last Session IP Address
        </label>
        <span className="detail__value">{getValue("sessionIp")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Points
        </label>
        <span className="detail__value">{getValue("points")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          All Time Points
        </label>
        <span className="detail__value">{getValue("allTimePoints")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Referral
        </label>
        <span className="detail__value">{getValue("referredBy")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Referral Count
        </label>
        <span className="detail__value">{getValue("referralCount")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Invitation Code
        </label>
        <span className="detail__value">{getValue("invCode")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Created At
        </label>
        <span className="detail__value">{getValue("createdAt")}</span>
      </div>
      <div className="detail">
        <label className className="detail__label">
          Updated At
        </label>
        <span className="detail__value">{getValue("updatedAt")}</span>
      </div>
    </div>
  );
};

export default UserDetails;
