import { useState, useEffect } from "react";
import { recordRepository } from "api-client/repositories/record_repository";
import { IIdeas } from "api-client/models/Ideas";
import message from "antd/lib/message";

export const useSubmit = ({
  searchInput,
  category,
  createdAtFrom,
  createdAtTo,
  current,
  pageSize,
  sortByRecent,
  isLiked,
}: {
  searchInput: string;
  category: string | undefined;
  createdAtFrom: string;
  createdAtTo: string;
  current: number;
  pageSize: number;
  sortByRecent: boolean;
  isLiked: boolean;
}): {
  loading: boolean;
  results: IIdeas[];
  dataInfo: { totalDocs: number };
  handleSubmit: () => Promise<void>;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IIdeas[]>();
  const [dataInfo, setDataInfo] = useState({ totalDocs: 0 });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const requestBody = {
        searchInput: searchInput.trim(),
        category,
        createdAtFrom,
        createdAtTo,
        current,
        pageSize,
        sortByRecent,
        isLiked,
      };

      const { ideas, totalDocs } = await recordRepository.searchRecords({
        requestBody,
      });

      setResults(ideas);
      setDataInfo({ totalDocs });
    } catch (error: any) {
      console.log(error.message);
      message.error("Search query is not valid");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line
  }, [
    searchInput,
    current,
    pageSize,
    category,
    createdAtTo,
    createdAtFrom,
    sortByRecent,
    isLiked,
  ]);

  return { results, dataInfo, loading, handleSubmit };
};
