import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextGlobal {
  tools: {
    newTool: boolean;
    changePersist?: boolean;
    actions: {
      createTool: () => void;
      closeCreateTool: () => void;
      onChangePersist: () => void;
    };
  };
}

interface IAppProvider {
  children: JSX.Element;
}

export const AppContext = createContext<ContextGlobal>({
  tools: {
    newTool: false,
    actions: {
      createTool: () => {},
      closeCreateTool: () => {},
      onChangePersist: () => {},
    },
  },
});

const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [newTool, setNewTool] = useState<boolean>(false);
  const [changePersist, setChangePersist] = useState<boolean>(false);

  const createTool = () => {
    setNewTool(true);
  };

  const closeCreateTool = () => {
    setNewTool(false);
  };

  const onChangePersist = () => {
    setChangePersist(!changePersist);
  };
  return (
    <AppContext.Provider
      value={{
        tools: {
          newTool,
          changePersist,
          actions: {
            createTool,
            closeCreateTool,
            onChangePersist,
          },
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => useContext(AppContext);
