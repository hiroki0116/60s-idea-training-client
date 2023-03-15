import { API } from "api-client/api-client";
import { IUser } from "api-client/models/User";

type UserRepository = {
  updateUser: (id: string, reqBody: any) => Promise<IUser>;
  createProfileImage: (
    uri: string | Blob | File | ProgressEvent<FileReader>,
    folder: string
  ) => Promise<{ url: string; public_id: string }>;
  updateProfileImage: (id: string) => Promise<void>;
};

const updateUser = async (id: string, reqBody: any): Promise<IUser> => {
  const { data } = await API.put(`/users/${id}`, { ...reqBody });
  return data.data;
};

const createProfileImage = async (
  uri: string | Blob | File | ProgressEvent<FileReader>,
  folder: string
): Promise<{ url: string; public_id: string }> => {
  const { data } = await API.post("/users/images", { image: uri, folder });
  return data.data;
};

const updateProfileImage = async (id: string): Promise<void> => {
  await API.put("/users/images", { public_id: id });
};

export const userRespository: UserRepository = {
  updateUser,
  createProfileImage,
  updateProfileImage,
};
