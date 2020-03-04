import React, { useEffect, useState, useContext } from "react";
import Section from "../sections/Section";
import { fetchCategories } from "../../api/parseCloud";
import Button from "../buttons/Button";
import { withRouter } from "react-router-dom";
import CategoryList from "../lists/CategoryList";
import {
  MODAL_CATEGORY_DELETE,
  modalActions,
  modalTypes
} from "../../data/modals";
import { ModalContext } from "../../contexts/ModalContext";
import { NotificationContext } from "../../contexts/NotificationContext";
import { buildNotification } from "../../data/notifications";

const Categories = withRouter(({ history }) => {
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [modalContent, setModalContent] = useContext(ModalContext);
  const [notification, setNotification] = useContext(NotificationContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categories = await fetchCategories();
      setIsFetching(false);
      setCategories(categories);
    } catch (e) {
      setIsFetching(false);
    }
  };

  const handleAddNewClick = () => {
    history.push("/categories/new");
  };

  const handleDeleteClick = categoryId => {
    let content = {};

    content = MODAL_CATEGORY_DELETE;
    content.payload = { categoryId };

    content.onAction = handleDialogAction;
    setModalContent(content);
  };

  const handleDialogAction = (modalType, action, payload) => {
    if (modalType === modalTypes.CATEGORY_DELETE) {
      if (action.id === modalActions.YES.id) {
        setNotification(buildNotification("Function unavailabe in demo mode"));
      }
    }

    setModalContent({});
  };

  const addNew = () => {
    return (
      <Button
        title="Add new"
        className="action-btn"
        onClick={handleAddNewClick}
      />
    );
  };

  return (
    <React.Fragment>
      <Section size="full" title="Categories" pageAction={addNew}>
        <CategoryList
          isFetching={isFetching}
          categories={categories}
          onDeleteClick={handleDeleteClick}
        />
      </Section>
    </React.Fragment>
  );
});

export default Categories;
