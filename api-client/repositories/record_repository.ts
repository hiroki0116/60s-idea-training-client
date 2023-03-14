import { API } from "api-client/api-client";

type RecordRepository = {
  updateComment: ({
    comment,
    id,
  }: {
    comment: string;
    id: string;
  }) => Promise<void>;
};

const updateComment = async ({
  comment,
  id,
}: {
  comment: string;
  id: string;
}) => {
  await API.put(`/ideas/${id}`, { comment });
};

export const recordRepository: RecordRepository = {
  updateComment,
};
