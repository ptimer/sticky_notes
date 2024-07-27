/* eslint-disable @typescript-eslint/no-explicit-any */
import { databases, collections } from './config';
import { ID } from 'appwrite';
 
const db: any = {};
 
collections.forEach((collection) => {
    db[collection.name] = {
        create: async (payload: any, id = ID.unique()) => {
            return await databases.createDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        update: async (id: string, payload: any) => {
            return await databases.updateDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        delete: async (id: string) => {
            return await databases.deleteDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        get: async (id: string) => {
            return await databases.getDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        list: async (queries: any) => {
            return await databases.listDocuments(
                collection.dbId,
                collection.id,
                queries
            );
        },
    };
});
 
export { db };