export interface IFile {
    fileId: number;
    guidId?: string;
    name?: string;
    path: string;
    size: number;
}

export interface IFileList {
    files: IFile[];
}

export interface IFileAttach {
    fileAttachId: number;
    fileDinhKemId: number;
    name: string;
    type: number;
    size: number;
    path: string;
    forWeb?: boolean;
    checkSum?: string;
    isDelete?: boolean;
    guidId?: string;
}

export interface IGenericFile {
    id?: number;
    idNhanSu?: number;
    idFileDinhKem?: number;
    tenFile?: string;
    type?: number;
    size?: number;
    path?: string;
    forWeb?: boolean;
    checkSum?: string;
    guidId?: string;
    idsFileDinhKem?: any[];
}

export enum FileUploadTypeEnum {
    All = 0,
    Image = 1,
    Video = 2,
    Office = 3,
    Audio = 4,
    Application = 5
}

export const FileUploadTypeDescription = {
    [FileUploadTypeEnum.All]: 'Tất cả',
    [FileUploadTypeEnum.Image]: 'Hình ảnh',
    [FileUploadTypeEnum.Video]: 'Video',
    [FileUploadTypeEnum.Office]: 'Office',
    [FileUploadTypeEnum.Audio]: 'Audio',
    [FileUploadTypeEnum.Application]: 'Application',
}

