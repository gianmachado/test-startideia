import React from "react";
import Image from "next/image";
import errorFind from "../../../public/search-not-found.png";

import styles from "./NotFoundValues.module.css";

const NotFoundValues: React.FC = () => {
  return (
    <div className={styles.containerNotFound}>
      <Image src={errorFind} alt="Not Find" objectFit="fill" />
      <span className={styles.labelNotFind}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Oh sorry! I couldn't find any tags
      </span>
    </div>
  );
};

export default NotFoundValues;
