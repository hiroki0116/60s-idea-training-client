import { useState, useEffect } from "react";
import message from "antd/lib/message";
import { recordRepository } from "api-client/repositories/record_repository";

export const useUpdateComment = ({
  comment,
  id,
}: {
  comment: string;
  id: string;
}): { commentLoading: boolean } => {
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  const updateComment = async () => {
    try {
      setCommentLoading(true);
      await recordRepository.updateComment({ comment, id });
      setCommentLoading(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    updateComment();
    //eslint-disable-next-line
  }, [comment]);

  return { commentLoading };
};
