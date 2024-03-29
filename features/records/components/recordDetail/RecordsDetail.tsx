import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTheme } from "next-themes";
// Third Party
import Tag from "antd/lib/tag";
import Input from "antd/lib/input";
import message from "antd/lib/message";
import Select from "antd/lib/select";
import Spin from "antd/lib/spin";
import { Editor } from "@tinymce/tinymce-react";
import dayjs from "dayjs";
// Icons
import FieldTimeOutlined from "@ant-design/icons/FieldTimeOutlined";
import TagOutlined from "@ant-design/icons/TagOutlined";
import BulbTwoTone from "@ant-design/icons/BulbTwoTone";
import FileTextTwoTone from "@ant-design/icons/FileTextTwoTone";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import StarOutlined from "@ant-design/icons/StarOutlined";
import StarFilled from "@ant-design/icons/StarFilled";
// components
import { openNotification } from "features/records/utils/antdNotification";
import MotionDiv from "components/layouts/MotionDiv";
import ThreeDotsMenu from "./ThreeDotsMenu";
import ChatGPTInput from "./ChatGPTInput";
import { useUpdateComment } from "features/records/hooks/useUpdateComment";
import { useViewStatus } from "features/records/hooks/useViewStatus";
const CenterSpin = dynamic(() => import("components/elements/CenterSpin"), {
  ssr: false,
});
// utils
import { CATEGORIES } from "utils/constants";
import { capitalizeFirst } from "utils/formatter";
// api
import { recordRepository } from "api-client/repositories/record_repository";
// types
import { IIdeas } from "api-client/models/Ideas";

const { Option } = Select;

const RecordsDetail = ({ ideaRecord }: { ideaRecord: IIdeas }) => {
  const [comment, setComment] = useState<string>(ideaRecord?.comment || "");
  const [isLiked, setIsLiked] = useState<boolean>(ideaRecord?.isLiked);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [topicTitle, setTopicTitle] = useState<string>(
    ideaRecord?.topicTitle || ""
  );
  // hooks
  useViewStatus(ideaRecord?._id);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { commentLoading } = useUpdateComment({ comment, id: ideaRecord?._id });
  // handlers
  const updateTopicTitle = async () => {
    try {
      await recordRepository.updateRecord(ideaRecord?._id, {
        topicTitle: topicTitle,
      });
      openNotification();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const updateCategory = async (category: string) => {
    try {
      await recordRepository.updateRecord(ideaRecord?._id, {
        category: category,
      });
      openNotification();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleLiked = async () => {
    try {
      setLikeLoading(true);
      setIsLiked(!isLiked);
      await recordRepository.updateRecord(ideaRecord?._id, {
        isLiked: !isLiked,
      });
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLikeLoading(false);
    }
  };

  if (deleteLoading) return <CenterSpin />;
  return (
    <MotionDiv>
      <Link href={"/records"} className="text-blue-500 flex items-center gap-1">
        <LeftOutlined /> <span className="font-extrabold">Back to Records</span>
      </Link>
      <div className="grid grid-cols-1 bg-white p-5 rounded-xl shadow-lg sm:w-2/3 w-full mx-auto gap-2 relative dark:bg-slate-800">
        <div
          className="absolute top-2 right-12 text-lg cursor-pointer transform transition duration-500 hover:scale-110"
          onClick={handleLiked}
        >
          {isLiked ? (
            likeLoading ? (
              <Spin />
            ) : (
              <StarFilled />
            )
          ) : likeLoading ? (
            <Spin />
          ) : (
            <StarOutlined />
          )}
        </div>
        <div className="absolute top-2 right-2">
          <ThreeDotsMenu
            ideaRecordId={ideaRecord?._id}
            setDeleteLoading={setDeleteLoading}
          />
        </div>
        <Input
          size="large"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
          onBlur={updateTopicTitle}
          bordered={false}
          style={
            currentTheme === "dark"
              ? {
                  fontWeight: "700",
                  fontSize: "1.25rem",
                  marginTop: "1rem",
                  color: "#4ade80",
                }
              : { fontWeight: "700", fontSize: "1.25rem", marginTop: "1rem" }
          }
        />
        <div className="flex items-center gap-2 text-gray-500">
          <FieldTimeOutlined className="text-base dark:text-green-400" />
          <span className="dark:text-green-400">Created</span>
          <div className="ml-10 text-gray-800 dark:text-green-400">
            {dayjs(ideaRecord?.createdAt).format("MMMM D YYYY h:mm A")}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500 dark:text-green-400 h-auto">
          <TagOutlined className="text-base" />
          <span>Category</span>
          <div className="flex items-center">
            <Select
              bordered={false}
              defaultValue={ideaRecord?.category || "Other"}
              style={{ marginLeft: "1rem" }}
              onChange={(value) => updateCategory(value)}
            >
              {CATEGORIES.map((cate, key) => (
                <Option value={cate.value} key={key}>
                  <div>
                    <Tag
                      color={currentTheme === "dark" ? "green" : "cyan"}
                      style={{ borderRadius: "0.5rem" }}
                    >
                      {cate.value}
                    </Tag>
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <hr className="text-gray-100 my-5 dark:text-gray-700" />

        <div className="rounded-lg shadow-lg p-5 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-1">
            <BulbTwoTone className="text-base" />
            <h3 className="text-base font-bold tracking-widest dark:text-green-400">
              IDEAS
            </h3>
          </div>
          <div className="px-3">
            {ideaRecord?.ideas?.map((idea, index) => (
              <div key={index} className="tracking-wide">
                {index + 1}. {capitalizeFirst(idea)}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg shadow-lg p-5 bg-slate-50 mt-3 dark:bg-slate-900">
          <div className="flex items-center gap-2 relative">
            <FileTextTwoTone className="text-base" />
            <h3 className="text-base font-bold tracking-widest dark:text-green-400">
              NOTES
            </h3>
            {commentLoading ? (
              <div className="absolute top-2 right-2 dark:text-green-400">
                saving...
              </div>
            ) : null}
          </div>
          <ChatGPTInput comment={comment} setComment={setComment} />
          <div className="grid grid-cols-1">
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
              init={{
                branding: false,
                placeholder: "",
                content_style: `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {//color: rgba(34,47,62,.7); color: #d4d4d4;}`,
                height: 320,
                menubar: true,
                contextmenu: "copy paste",
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat |  copy paste",
              }}
              initialValue={ideaRecord?.comment || ""}
              value={comment}
              onEditorChange={(v) => {
                setComment(v);
              }}
            />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default RecordsDetail;
