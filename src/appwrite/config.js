import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query} from 'appwrite';

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.log('Appwrite Service createpost error in storage method error')
        }
    }
    
    async updatePost(slug, {title, content, status, featuredImage}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log('Appwrite Service update post error in storage method error')
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log('Error in the deletePost method')
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log('Error in the getPost method')
            return false
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                queries,
                100,
                0
            )
        } catch (error) {
            console.log('Error in the getAllPost method')
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Error in the uploadFile method')
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            console.log('Error in the deleteFile method')    
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }

    
}
const service = new Service();
export default service;