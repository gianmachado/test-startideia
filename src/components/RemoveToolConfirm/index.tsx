import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";

import styles from "./RemoveToolConfirm.module.css";
import { RemoveTool, ResultGetTools } from "../../services/tools";

interface IRemoveToolConfirm {
  close: () => void;
  removeItem: () => void;
  item: ResultGetTools;
}

const RemoveToolConfirm: React.FC<IRemoveToolConfirm> = ({
  close,
  item,
  removeItem,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const removeToolConfirm = () => {
    setLoading(true);

    setTimeout(() => {
      RemoveTool(item.id);
      close();
      removeItem();
      setLoading(false);
    }, 3000);
  };
  return (
    <div className={styles.containerMain}>
      <Button
        startIcon={<CloseIcon />}
        onClick={close}
        style={{ backgroundColor: "transparent" }}
      >
        <strong> Remove Tool</strong>
      </Button>
      <span>
        Are you sure want to remove <strong>{item?.title}</strong>?
      </span>

      <div className={styles.containerButton}>
        <Button
          style={{ textTransform: "none" }}
          variant="outlined"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          style={{ textTransform: "none" }}
          variant="outlined"
          onClick={removeToolConfirm}
        >
          {loading ? <CircularProgress size={22} /> : "Yes, remove"}
        </Button>
      </div>
    </div>
  );
};

export default RemoveToolConfirm;
