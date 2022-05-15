import { APIWithoutAuth } from 'utils/api';

export const removeFirebaseUserIfUserNotInSync = async (email: string) => {
  try {
    const res = await APIWithoutAuth.post(`/auth/remove-fb-user-if-not-in-sync/${email}`);
    return { success: res.data.success, message: res.data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const handlePasswordLessEmail = async (email: string, continueUrl: string) => {
  try {
    const res = await APIWithoutAuth.post(`/auth/email/password-less-login/${email}`, { continueUrl });
    return { success: true, message: res.data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};