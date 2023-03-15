import { API } from "api-client/api-client";
import { IUser } from "api-client/models/User";

type UserRepository = {
  updateUser: (id: string, reqBody: any) => Promise<IUser>;
};

const updateUser = async (id: string, reqBody: any): Promise<IUser> => {
  const { data } = await API.put(`/users/${id}`, { ...reqBody });
  return data.data;
};

export const userRespository: UserRepository = {
  updateUser,
};
