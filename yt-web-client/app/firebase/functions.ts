import { httpsCallable } from "firebase/functions";
import { functions } from './firebase'


const generateUploadUrl = httpsCallable(functions, 'generateUploadUrl');
const getVideosFunction = httpsCallable(functions, 'getVideos');

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: "processing" | "processed",
    title?: string,
    description?: string
}

export async function uploadVideo(file: File) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await generateUploadUrl({
        fileExtension: file.name.split('.').pop()
    })

    //upload the file via signed url
    await fetch(response?.data?.url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });

    return;
}

export async function getVideos(){
    const response = await getVideosFunction();
    return response.data as Video[];
}