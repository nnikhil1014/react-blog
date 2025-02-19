import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount){
                return this.login({email, password})
                // call another method
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log('Error with the create account method')
        }
    }

    async login({email, password}){
        try{
            await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log('Error with the login method')
        }
    }

    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            console.log('Error with the get current user method')
        }

        return null;
    }


    async logout(){
        try {
            await this.account.deleteSession();
        } catch (error) {
            console.log('Error with the logout method')
        }
    }
}



const authService = new AuthService()

export default authService