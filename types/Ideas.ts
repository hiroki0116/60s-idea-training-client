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