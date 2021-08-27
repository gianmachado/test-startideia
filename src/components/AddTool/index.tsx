import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import styles from "./AddTool.module.css";
import { AddNewTool, IPostNewTool } from "../../services/tools";
import { useGlobalContext } from "../../context/AppContext";

const AddTool: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IPostNewTool>({
    title: "",
    link: "",
    description: "",
    tags: [],
  });
  const [validation, setValidation] = useState(true);

  const { tools } = useGlobalContext();

  const insertNewTool = () => {
    if (
      formData.title == "" ||
      formData.link == "" ||
      formData.description == "" ||
      formData.tags.length == 0
    ) {
      setValidation(false);
      return;
    }
    setValidation(true);

    setLoading(true);

    setTimeout(() => {
      AddNewTool(formData);
      tools.actions.closeCreateTool();
      tools.actions.onChangePersist();
      setLoading(false);
    }, 3000);
  };

  const onChangeFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeFormDataTags = (e: any) => {
    const value = e.target.value;
    const arrayValues = value.split(",");
    setFormData({
      ...formData,
      tags: arrayValues,
    });
  };

  return (
    <div className={styles.containerMain}>
      <Button
        startIcon={<AddIcon />}
        style={{ backgroundColor: "transparent" }}
      >
        <strong> Add new Tool</strong>
      </Button>
      <div className={styles.containerForm}>
        <TextField
          required
          label="Tool Name"
          variant="outlined"
          name="title"
          value={formData?.title}
          onChange={onChangeFormData}
        />
        <TextField
          required
          label="Tool Link"
          variant="outlined"
          name="link"
          value={formData?.link}
          onChange={onChangeFormData}
        />
        <TextField
          label="Tool description"
          multiline
          rows={4}
          variant="outlined"
          name="description"
          value={formData?.description}
          onChange={onChangeFormData}
        />
        <TextField
          placeholder="Exemple: node,react,typescript"
          required
          label="Tags"
          variant="outlined"
          name="tags"
          value={formData?.tags}
          onChange={onChangeFormDataTags}
        />
      </div>

      {!validation && (
        <span className={styles.labelError}>
          You must fill all these fields.
        </span>
      )}
      <div className={styles.containerButton}>
        <Button
          style={{ textTransform: "none" }}
          variant="outlined"
          onClick={insertNewTool}
        >
          {loading ? <CircularProgress size={22} /> : "Add tool"}
        </Button>
      </div>
    </div>
  );
};

export default AddTool;
