export interface TodoInfo {
    id: number;
    category: string;
    context: string;
    experience: number;
    createdAt: Date;
    deletedAt?: Date;
    isCompleted: boolean;
    isDeleted?: boolean;
}

export interface TodoResponseModel {
    id: number;
    category: string;
    context: string;
    experience: number;
    createdAt: Date;
    isCompleted: boolean;
    isDeleted?: boolean;
}
