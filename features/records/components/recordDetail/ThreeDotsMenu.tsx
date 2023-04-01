import { useRouter } from "next/router";
import { useState, memo } from "react";
// third parties
import Dropdown from "antd/lib/dropdown";
import Button from "antd/lib/button";
import type { MenuProps } from "antd";
import Modal from "antd/lib/modal";
import message from "antd/lib/message";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
// utils
import { API } from "api-client/api-client";

type Props = {
  ideaRecordId: string;
  setDeleteLoading: (boolean) => void;
};

const ThreeDotsMenu = ({ ideaRecordId, setDeleteLoading }: Props) => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const toggleMenu = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await API.delete(`/ideas/${ideaRecordId}`, { errorHandle: false });
      message.success("Successfully Deleted!");
      setDropDownVisible(false);
      setShowModal(true);
      router.push("/records");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <DeleteOutlined className="text-lg" />
          <p className="font-bold">Delete</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items, onClick: toggleMenu }}
        trigger={["click"]}
        placement="bottomLeft"
        className="text-lg"
      >
        <EllipsisOutlined className="text-xl transform rotate-90" />
      </Dropdown>
      <Modal
        open={showModal}
        width={350}
        title="Are you sure to delete?"
        footer={null}
      >
        <div className="flex justify-end gap-5 pt-5">
          <Button onClick={() => setShowModal(false)} type="default">
            Cancel
          </Button>
          <Button onClick={handleDelete} type="primary">
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default memo(ThreeDotsMenu);
