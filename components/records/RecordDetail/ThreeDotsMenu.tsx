import { useState } from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const ThreeDotsMenu = ({deleteIdeaRecord}) => {
    const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    
    const toggleMenu = () => {
        setDropDownVisible(!dropDownVisible);
    };

    const handleDelete = () => {
        setDropDownVisible(false);
        setShowModal(true);
    }

    const menu = (
      <Menu onClick={toggleMenu} style={{borderRadius:'0.5rem'}}>
        <Menu.Item key="1" className='flex items-center tracking-wide' onClick={handleDelete}>
            <DeleteOutlined className='text-lg'/>Delete
        </Menu.Item>
      </Menu>
    );

  return (
    <>
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft" className="text-lg">
            <EllipsisOutlined className="text-xl transform rotate-90" />
        </Dropdown>
        <Modal
            visible={showModal}
            onOk={deleteIdeaRecord}
            okText="Yes"
            cancelText="Cancel"
            onCancel={()=>{setShowModal(false)}}
            width={350}
        >
            <div className="text-gray-800 font-semibold text-lg text-center mt-5">
                Are you sure to delete?
            </div>
        </Modal>
    </>
  )
}

export default ThreeDotsMenu;