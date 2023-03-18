import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import message from "antd/lib/message";
import { recordRepository } from "api-client/repositories/record_repository";
import { IIdeas } from "api-client/models/Ideas";

export const useFetchRecord = (): {
  loading: boolean;
  ideaRecord: IIdeas;
} => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ideaRecord, setIdeaRecord] = useState<IIdeas>();

  const getIdeaRecord = async (id: string) => {
    try {
      setLoading(true);
      const data = await recordRepository.getRecord(id);
      setIdeaRecord(data);
    } catch (error) {
      message.error("Failed to fetch the record");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router && router?.query?.id)
      getIdeaRecord(router?.query?.id?.toString());
  }, [router]);

  return { loading, ideaRecord };
};
