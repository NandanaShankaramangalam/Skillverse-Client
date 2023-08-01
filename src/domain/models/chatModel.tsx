import { Interface } from "readline";

interface student{
    _id:string,
    username:string;
    firstName:string,
    lastName:string,
    profileImg:string
}
interface tutor{
    _id:string,
    username:string;
    firstName:string,
    lastName:string,
    profileImg:string
}
export interface Chats{
    _id:string,
    chatName:string,
    student:student,
    tutor:tutor,
    latestMessage:latest
}

export interface latest{
    chat:string,
    content:string
}

export interface Message{
    _id:string
    student:student,
    tutor:tutor,
    content:string,
    chat:Chats
    createdAt:string,
}

// export interface sender{
//     _id:string,
//     username:string,
//     firstname:string,
//     lastname:string,
//     profileImg:string

// }