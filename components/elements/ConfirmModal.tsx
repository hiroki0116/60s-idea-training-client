import Modal from "antd/lib/modal";
import Button from "antd/lib/button";

type props = {
  showConfirm: boolean;
  setShowConfirm: Function;
  handleConfirm: any;
  handleCancel?: any;
  title: any;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const ConfirmModal = ({
  showConfirm,
  setShowConfirm,
  handleConfirm,
  handleCancel,
  title,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}: props) => {
  return (
    <Modal
      open={showConfirm}
      footer={null}
      onCancel={() => setShowConfirm(false)}
      centered
      width="400px"
      closable={false}
    >
      <div className="py-2">
        <div className="mb-12 font-bold mt-2 ml-4">{title}</div>
        <div className="flex justify-end mr-4">
          <Button
            className="rounded mr-2"
            onClick={() => {
              if (handleCancel) {
                handleCancel();
              }
              setShowConfirm(false);
            }}
          >
            {cancelButtonText}
          </Button>
          <Button type="primary" className="rounded" onClick={handleConfirm}>
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
