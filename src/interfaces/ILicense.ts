import { Document } from 'mongoose'


export interface IUserLicense extends Document {
    _id: string;
    user: string;
    licenseNumber: string;
    licensingBoard: string;
}