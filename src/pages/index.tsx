import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import SimpleModal from "../components/ModalComponent";
import AddTool from "../components/AddTool";
import {
  FindToolsFiltered,
  GetAllTools,
  ResultGetTools,
} from "../services/tools";
import NotFoundValues from "../components/NotFoundValues";
import { useGlobalContext } from "../context/AppContext";

const Home: NextPage = () => {
  const [dataTools, setDataTools] = useState<ResultGetTools[]>([]);
  const [dataToolsFiltered, setDataToolsFiltered] = useState<ResultGetTools[]>(
    []
  );
  const [findTool, setFindTool] = useState<string>("");
  const [searchByTags, setSearchByTags] = useState<boolean>(false);
  const [searchFirstLoad, setSearchFirstLoad] = useState<boolean>(false);

  const { tools } = useGlobalContext();
  const { actions, newTool, changePersist } = tools;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetAllTools();
        setDataTools(response);
      } catch (error) {
        console.log(error.statusText, error.status);
      }
      setSearchFirstLoad(true);
    };
    getData();
  }, [changePersist]);

  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const response = await FindToolsFiltered(findTool, searchByTags);
        setDataToolsFiltered(response);
      } catch (error) {
        console.log(error.statusText, error.status);
      }
    };
    if (findTool.length > 0) {
      getFilteredData();
    } else {
      setDataToolsFiltered(dataTools);
    }
  }, [findTool, searchByTags, dataTools]);

  const onChangeSearch = (e: any) => {
    setFindTool(e.target.value);
  };

  const onChangeSearchByTags = (e: any) => {
    setSearchByTags(e.target.checked);
  };

  const removeItemList = (index: number) => {
    let auxData = [...dataToolsFiltered];
    auxData.splice(index, 1);
    setDataToolsFiltered(auxData);
  };

  return (
    <>
      <SimpleModal visible={newTool} close={actions.closeCreateTool}>
        <AddTool />
      </SimpleModal>

      <div className={styles.containerMain}>
        <header className={styles.header}>
          <p className={styles.titleHeader}>VUTTR</p>
          <p className={styles.subTitleHeader}>Very Usefull Tools to Remeber</p>
        </header>
        <main className={styles.mainHome}>
          <div className={styles.containerSearch}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              onChange={onChangeSearch}
              value={findTool}
            />
            <FormControlLabel
              control={
                <Checkbox color="default" onChange={onChangeSearchByTags} />
              }
              label="Search in tags only"
            />
          </div>

          <Button
            style={{ textTransform: "none" }}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={actions.createTool}
          >
            Add
          </Button>
        </main>

        {dataToolsFiltered?.map((item, index) => (
          <Card
            key={index}
            item={item}
            removeItem={() => removeItemList(index)}
          />
        ))}

        {dataToolsFiltered.length == 0 && searchFirstLoad && <NotFoundValues />}
      </div>
    </>
  );
};

export default Home;
