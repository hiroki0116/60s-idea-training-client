import { IUser } from "./User";

export type ITotalIdeasSessions = {
    _id: null;
    totalIdeas: number;
    totalSessions: number;
}

export type IWeeklyIdeasSessions = {
    _id: string;
    totalIdeas:number;
    totalSessions:number;
}

export type IWeeklyData = {
    weeklyRecords: IWeeklyIdeasSessions[];
    lastMonday: Date;
}

export type IIdeas = {
    _id: string;
    topicTitle: string;
    category: string;
    ideas: string[];
    createdBy: IUser;
    viewed: boolean;
    isLiked: boolean; 
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}