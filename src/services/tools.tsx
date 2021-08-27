import api from "./api";

export interface ResultGetTools {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export interface IPostNewTool {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export const GetAllTools = async (): Promise<ResultGetTools[]> => {
  const route = "tools";

  try {
    const response = await api.get(route);

    return response.data;
  } catch (error) {
    throw error.response || "Connection lost";
  }
};

export const FindToolsFiltered = async (
  search: string,
  tagFilter: boolean
): Promise<ResultGetTools[]> => {
  let route = `tools?q=${search}`;
  if (tagFilter) {
    route = `tools?tags_like=${search}`;
  }

  try {
    const response = await api.get(route);

    return response.data;
  } catch (error) {
    throw error.response || "Connection lost";
  }
};

export const RemoveTool = async (id: number): Promise<[]> => {
  const route = `tools/${id}`;

  try {
    const response = await api.delete(route);

    return response.data;
  } catch (error) {
    throw error.response || "Connection lost";
  }
};

export const AddNewTool = async (formData: IPostNewTool): Promise<[]> => {
  const route = "tools";

  try {
    const response = await api.post(route, formData);

    return response.data;
  } catch (error) {
    throw error.response || "Connection lost";
  }
};
