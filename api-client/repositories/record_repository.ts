import { API } from "api-client/api-client";

type RecordRepository = {
  updateRecord: (id: string, reqBody: any) => Promise<void>;
};

const updateRecord = async (id: string, reqBody): Promise<void> => {
  await API.put(`/ideas/${id}`, { ...reqBody }, { errorHandle: false });
};

export const recordRepository: RecordRepository = {
  updateRecord,
};
