import { API } from "api-client/api-client";
import { IIdeas } from "api-client/models/Ideas";
import { SearchReqBody } from "../types/Records";

type RecordsRepository = {
  searchRecords: ({
    requestBody,
  }: {
    requestBody: SearchReqBody;
  }) => Promise<{ ideas: IIdeas[]; totalDocs: number }>;
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

export const recordsRepository: RecordsRepository = {
  searchRecords,
};
