import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useState } from "react";
//Utils
import { CATEGORIES, DEFAULT_CREATED_AT } from "utils/constants";
//Third Party
import AutoComplete from "antd/lib/auto-complete";
import Select from "antd/lib/select";
import Tag from "antd/lib/tag";
import Empty from "antd/lib/empty";
import Pagination from "antd/lib/pagination";
import Switch from "antd/lib/switch";
import TagOutlined from "@ant-design/icons/TagOutlined";
import StarOutlined from "@ant-design/icons/StarOutlined";
import StarFilled from "@ant-design/icons/StarFilled";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Components
import MotionDiv from "components/layouts/MotionDiv";
import DatePicker from "components/elements/DatePicker";
const CenterSpin = dynamic(() => import("components/elements/CenterSpin"), {
  ssr: false,
});
//Hooks
import { useSubmit } from "features/records/hooks/useSubmit";
dayjs.extend(relativeTime);

const RecordsMain = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [sortByRecent, setSortByRecent] = useState(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [createdAtFrom, setCreatedAtFrom] = useState<Dayjs>();
  const [createdAtTo, setCreatedAtTo] = useState<Dayjs>();
  // hooks
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { results, dataInfo, loading } = useSubmit({
    searchInput,
    category,
    createdAtFrom: createdAtFrom?.toISOString(),
    createdAtTo: createdAtTo?.toISOString(),
    current,
    pageSize,
    sortByRecent,
    isLiked,
  });
  const options = results?.map((result) => {
    return { value: result.topicTitle };
  });

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
            <AutoComplete
              value={searchInput}
              options={options}
              allowClear
              onChange={(text) => setSearchInput(text || "")}
              style={{ width: "100%" }}
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
            <div>From</div>
            <div>
              <DatePicker
                className="w-full"
                value={createdAtFrom}
                onChange={(date) => {
                  setCreatedAtFrom(date);
                }}
              />
            </div>
          </div>
          <div className="sm:w-1/6 w-full">
            <div>To</div>
            <div>
              <DatePicker
                className="w-full"
                value={createdAtTo}
                onChange={(date) => {
                  setCreatedAtTo(date);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results table */}
      <div className="grid grid-cols-1 p-6 w-full bg-white rounded-lg h-full shadow my-5 relative dark:bg-slate-800">
        {loading ? (
          <CenterSpin />
        ) : (
          <>
            <div className="absolute sm:top-5 top-6 left-6">
              <Switch
                checked={sortByRecent}
                onChange={() => setSortByRecent(!sortByRecent)}
                checkedChildren="Recent"
                unCheckedChildren="Older"
              />
            </div>
            <div
              className="flex flex-col place-items-center absolute sm:top-4 top-6 md:left-32 left-24 sm:text-lg text-xl cursor-pointer transform transition duration-500 hover:scale-110"
              onClick={() => {
                setIsLiked(!isLiked);
              }}
            >
              {isLiked ? <StarFilled /> : <StarOutlined />}{" "}
              <div className="text-xs sm:block hidden">Favorites</div>
            </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 w-full">
                  {results.map((result) => (
                    <Link key={result._id} href={`/records/${result._id}`}>
                      <div
                        className={`relative rounded-xl mb-2 p-5 shadow-lg border border-purple-100  hover:bg-purple-50 cursor-pointer dark:bg-slate-900 hover:dark:bg-slate-700 dark:border-none ${
                          result.viewed ? "bg-white" : "bg-blue-50"
                        }`}
                        style={{ minHeight: "200px" }}
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
