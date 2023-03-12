import { APIWithoutAuth } from "api-client/api-client";

type AuthRepository = {
  removeFirebaseUserIfUserNotInSync(
    email: string
  ): Promise<{ success: boolean; message: string }>;
  handlePasswordLessEmail(
    email: string,
    continueUrl: string
  ): Promise<{ success: boolean; message: string }>;
};

const removeFirebaseUserIfUserNotInSync = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  const res = await APIWithoutAuth.post(
    `/auth/remove-fb-user-if-not-in-sync/${email}`
  );
  return { success: res.data.success, message: res.data.message };
};

const handlePasswordLessEmail = async (
  email: string,
  continueUrl: string
): Promise<{ success: boolean; message: string }> => {
  const res = await APIWithoutAuth.post(
    `/auth/email/password-less-login/${email}`,
    { continueUrl }
  );
  return { success: true, message: res.data.message };
};

export const authRepository: AuthRepository = {
  removeFirebaseUserIfUserNotInSync,
  handlePasswordLessEmail,
};
