import { API } from "api-client/api-client";
import { currAuthUser } from "utils/auth";

type ImageRepository = {
  updateProfileImage: () => Promise<void>;
};

const updateProfileImage = async (): Promise<void> => {
  await API.put("/users/images", {
    public_id: currAuthUser().images[0].public_id,
  });
};

export const imageRepository: ImageRepository = {
  updateProfileImage,
};
