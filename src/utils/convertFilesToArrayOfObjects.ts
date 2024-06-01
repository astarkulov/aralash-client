import {IFileObject} from "../models/IFileObject.ts";

export const convertFilesToArrayOfObjects = (files: FileList): IFileObject[] => {
    const fileObjects: IFileObject[] = [];

    for (const file of files) {
        const extension = getFileExtension(file.name);

        if(extension == 'pdf' || extension == 'docx' || extension == 'dpc' || extension == 'rtf') {
            fileObjects.push({
                file,
                extension,
            });
        }
    }

    return fileObjects;
}

const getFileExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}