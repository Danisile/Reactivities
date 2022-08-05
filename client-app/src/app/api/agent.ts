import axios, { AxiosResponse } from "axios";
import { error } from "console";
import { url } from "inspector";
import { resolve } from "path";
import { Activity } from "../models/activity";

const sleep = (delay: number) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async Response =>{
    try {
        await sleep(1000);
        return Response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response:AxiosResponse<T>) => response.data;

const requests ={
    get:<T> (url: string) =>axios.get<T>(url).then(responseBody),
    post:<T> (url: string,body: {}) =>axios.post<T>(url,body).then(responseBody),
    put: <T>(url: string,body: {}) =>axios.put<T>(url,body).then(responseBody),
    del:<T> (url: string) =>axios.delete<T>(url).then(responseBody),
}

const Activities ={
    list: () => requests.get<Activity[]>('/controller'),
    details: (id: string) => requests.get<Activity>(`/controller${id}`),
    create: (activity : Activity) => axios.post<void>('/controller', activity),
    update: (activity : Activity) => axios.put<void>(`/controller/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/controller/${id}`)
}

const agent = {
    Activities
}

export default agent;
 