import { useRouter } from "next/router";
import { useState, memo } from "react";
// third parties
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
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

  const menu = (
    <Menu onClick={toggleMenu} style={{ borderRadius: "0.5rem" }}>
      <Menu.Item
        key="1"
        className="flex items-center tracking-wide"
        onClick={() => setShowModal(true)}
      >
        <DeleteOutlined className="text-lg" />
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="bottomLeft"
        className="text-lg"
      >
        <EllipsisOutlined className="text-xl transform rotate-90" />
      </Dropdown>
      <Modal
        visible={showModal}
        onOk={handleDelete}
        okText="Yes"
        cancelText="Cancel"
        onCancel={() => {
          setShowModal(false);
        }}
        width={350}
      >
        <span className="text-gray-800 font-semibold text-lg text-center mt-5">
          Are you sure to delete?
        </span>
      </Modal>
    </>
  );
};

export default memo(ThreeDotsMenu);
