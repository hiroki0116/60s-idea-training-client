import { useEffect } from "react";
import message from "antd/lib/message";
import { recordRepository } from "api-client/repositories/record_repository";

export const useViewStatus = (id: string) => {
  const changeViewStatus = async (id: string) => {
    try {
      await recordRepository.updateRecord(id, { viewed: true });
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    changeViewStatus(id);
    // eslint-disable-next-line
  }, [id]);
};
