import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
//Utils
import { CATEGORIES, DEFAULT_CREATED_AT } from "utils/constants";
import { API } from "api-client/api-client";
//Third Party
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import message from "antd/lib/message";
import Tag from "antd/lib/tag";
import Empty from "antd/lib/empty";
import Pagination from "antd/lib/pagination";
import Switch from "antd/lib/switch";
import TagOutlined from "@ant-design/icons/TagOutlined";
import StarOutlined from "@ant-design/icons/StarOutlined";
import StarFilled from "@ant-design/icons/StarFilled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Components
import MotionDiv from "components/layout/MotionDiv";
import CenterSpin from "components/elements/CenterSpin";
import DatePicker from "components/elements/DatePicker";

const RecordsMain = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [createdAtFrom, setCreatedAtFrom] = useState(
    dayjs(DEFAULT_CREATED_AT).toISOString()
  );
  const [createdAtTo, setCreatedAtTo] = useState(dayjs().toISOString());
  const [results, setResults] = useState([]);
  const [dataInfo, setDataInfo] = useState({ totalDocs: 0 });
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [sortByRecent, setSortByRecent] = useState(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  dayjs.extend(relativeTime);

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

      const { data } = await API.post(`/ideas/search`, requestBody, {
        errorHandle: false,
      });
      const records = data.data.ideas;

      setResults(records);
      setDataInfo({ totalDocs: data.data.paginateData.pagination.total });
    } catch (error: any) {
      console.log(error.message);
      message.error("Search query is not valid");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    window.scroll(0, 0);
  };

  return (
    <MotionDiv>
      {/* Filter section */}
      <div className="grid grid-cols-1 bg-white p-5 rounded-xl shadow-lg dark:bg-slate-800">
        <div className="font-bold text-lg">Search</div>

        <div className="sm:flex sm:justify-around grid grid-cols-2 gap-3 w-full py-3">
          <div className="sm:w-2/6">
            <div>Keyword</div>
            <Input.Search
              onPressEnter={() => handleSubmit()}
              placeholder="Search data"
              onChange={(e) => setSearchInput(e.target.value)}
              onSearch={() => handleSubmit()}
              value={searchInput}
              allowClear
            />
          </div>
          <div className="sm:w-1/6 w-full">
            <div>Category</div>
            <Select
              className="w-full"
              onChange={(value: string) => setCategory(value)}
              allowClear
              value={category}
            >
              {CATEGORIES.map((cate, key) => (
                <Select.Option value={cate.value} key={key}>
                  {cate.value}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="sm:w-1/6 w-full">
            <div>From (optional)</div>
            <div>
              <DatePicker
                className="w-full"
                onChange={(date: any) => {
                  const formattedCreatedAtFrom =
                    date === null
                      ? dayjs(DEFAULT_CREATED_AT).toISOString()
                      : dayjs(date).startOf("day").toISOString();
                  setCreatedAtFrom(formattedCreatedAtFrom);
                }}
              />
            </div>
          </div>
          <div className="sm:w-1/6 w-full">
            <div>To (optional)</div>
            <div>
              <DatePicker
                className="w-full"
                onChange={(date: any) => {
                  const formattedCreatedAtTo =
                    date === null
                      ? dayjs().toISOString()
                      : dayjs(date).endOf("day").toISOString();
                  setCreatedAtTo(formattedCreatedAtTo);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results table */}
      <div className="grid grid-cols-1 p-6 w-full bg-white rounded-lg h-full shadow my-5 relative dark:bg-slate-800">
        <div className="absolute sm:top-5 top-6 left-6">
          <Switch
            checked={sortByRecent}
            onChange={() => setSortByRecent(!sortByRecent)}
            checkedChildren="Recent"
            unCheckedChildren="Older"
            className="shadow"
          />
        </div>
        <div
          className="flex flex-col absolute sm:top-4 top-6  sm:left-28 left-24 sm:text-lg text-xl cursor-pointer transform transition duration-500 hover:scale-110"
          onClick={() => {
            setIsLiked(!isLiked);
          }}
        >
          {isLiked ? <StarFilled /> : <StarOutlined />}{" "}
          <div className="text-xs sm:block hidden">Favorites</div>
        </div>
        {loading ? (
          <CenterSpin />
        ) : (
          <>
            {!loading && results?.length ? (
              <>
                <div className="sm:mb-3 mb-5 flex sm:justify-center justify-end w-full">
                  <Pagination
                    size="small"
                    total={dataInfo.totalDocs}
                    current={current}
                    onChange={handlePageChange}
                    pageSize={pageSize}
                    responsive
                    pageSizeOptions={["9", "18", "36", "50"]}
                  />
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-5 w-full">
                  {results.map((result) => (
                    <Link key={result._id} href={`/records/${result._id}`}>
                      <div
                        className={`relative rounded-xl mb-2 p-5 shadow-lg border border-purple-100  hover:bg-purple-50 cursor-pointer dark:bg-slate-900 hover:dark:bg-slate-700 dark:border-none ${
                          result.viewed ? "bg-white" : "bg-blue-50"
                        }`}
                      >
                        <div className="absolute top-1 left-4 text-base cursor-pointer">
                          {result?.isLiked ? <StarFilled /> : <StarOutlined />}
                        </div>
                        <div className="absolute top-1 right-0 text-gray-500 text-xs">
                          {dayjs(result?.createdAt).fromNow()}
                          <Tag
                            color="cyan"
                            style={{
                              borderRadius: "0.5rem",
                              marginLeft: "5px",
                            }}
                            icon={<TagOutlined />}
                          >
                            {result?.category && result?.category.length
                              ? result?.category
                              : "Others"}
                          </Tag>
                        </div>
                        <h3 className="border-l-4 pl-2 text-16 font-bold tracking-wide text-gray-700 my-4 dark:text-green-400">
                          {result.topicTitle}
                        </h3>
                        {result.ideas.map((idea, index) => (
                          <div
                            key={index}
                            className="mb-1 whitespace-pre-wrap break-normal"
                          >
                            <Tag
                              color={
                                currentTheme === "dark" ? "green" : "purple"
                              }
                              style={{
                                borderRadius: "0.5rem",
                                overflowWrap: "normal",
                                wordBreak: "normal",
                                whiteSpace: "normal",
                              }}
                            >
                              - {idea}
                            </Tag>
                          </div>
                        ))}
                        {result.viewed ? (
                          <div className="absolute bottom-1 right-2 text-xs text-red-400 uppercase">
                            Viewed
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex justify-center">
                  <Pagination
                    size="small"
                    total={dataInfo.totalDocs}
                    current={current}
                    onChange={handlePageChange}
                    pageSize={pageSize}
                    responsive
                    pageSizeOptions={["9", "18", "36", "50"]}
                  />
                </div>
              </>
            ) : (
              <Empty
                description={
                  <div className="font-bold">
                    No data yet. <br />
                    Start your first exercise!
                  </div>
                }
              />
            )}
          </>
        )}
      </div>
    </MotionDiv>
  );
};

export default RecordsMain;
