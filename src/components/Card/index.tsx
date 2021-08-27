import { Button } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./Card.module.css";
import { ResultGetTools } from "../../services/tools";
import SimpleModal from "../ModalComponent";
import RemoveToolConfirm from "../RemoveToolConfirm";

interface ICard {
  item: ResultGetTools;
  removeItem: () => void;
}
const Card: React.FC<ICard> = ({ item, removeItem }) => {
  const [removeTool, setRemoveTool] = useState<boolean>(false);

  const closeRemoveTool = () => {
    setRemoveTool(false);
  };

  const confirmRemoveTool = () => {
    setRemoveTool(true);
  };
  return (
    <>
      <SimpleModal visible={removeTool} close={closeRemoveTool}>
        <RemoveToolConfirm
          close={closeRemoveTool}
          item={item}
          removeItem={removeItem}
        />
      </SimpleModal>

      <div className={styles.card}>
        <div className={styles.headerCard}>
          <a href={item.link} className={styles.titleCard}>
            {item.title}
          </a>
          <Button
            size="small"
            startIcon={<CloseIcon />}
            onClick={confirmRemoveTool}
          >
            <strong> Remove</strong>
          </Button>
        </div>
        <span>{item.description}</span>
        <strong>
          {item.tags?.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </strong>
      </div>
    </>
  );
};

export default Card;
