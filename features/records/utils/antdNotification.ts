import notification from "antd/lib/notification";

export const openNotification = () => {
  notification.success({
    message: `Successfully updated!`,
    duration: 2.5,
    placement: "bottomRight",
  });
};
