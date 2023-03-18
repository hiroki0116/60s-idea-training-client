import { API } from "api-client/api-client";
import { IIdeas } from "api-client/models/Ideas";
import { SearchReqBody } from "features/records/types/Records";

type RecordRepository = {
  getRecord: (id: string) => Promise<IIdeas>;
  updateRecord: (id: string, reqBody: any) => Promise<void>;
  searchRecords: ({
    requestBody,
  }: {
    requestBody: SearchReqBody;
  }) => Promise<{ ideas: IIdeas[]; totalDocs: number }>;
};

const getRecord = async (id: string): Promise<IIdeas> => {
  const { data } = await API.get(`/ideas/${id}`);
  return data.data;
};

const updateRecord = async (id: string, reqBody): Promise<void> => {
  await API.put(`/ideas/${id}`, { ...reqBody }, { errorHandle: false });
};

const searchRecords = async ({
  requestBody,
}: {
  requestBody: SearchReqBody;
}): Promise<{ ideas: IIdeas[]; totalDocs: number }> => {
  const { data } = await API.post("/ideas/search", requestBody, {
    errorHandle: false,
  });
  return {
    ideas: data.data.ideas,
    totalDocs: data.data.paginateData.pagination.total,
  };
};

export const recordRepository: RecordRepository = {
  getRecord,
  updateRecord,
  searchRecords,
};
