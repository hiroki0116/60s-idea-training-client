import { IPhoto } from './Photo';
export interface IUser {
    _id:string;
    firebaseUid: string;
    email: string;
    firstName: string;
    lastName: string;
    images: Array<IPhoto>;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}