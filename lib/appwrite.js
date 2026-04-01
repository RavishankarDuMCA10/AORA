import { Client, Account, ID, Models, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: "https://sgp.cloud.appwrite.io/v1",
  platform: 'com.ravi.aora',
  projectId: "69ccf8fe002e5121c964",
  databaseId: "69cd11ec00016ca9405c",
  userCollectionId: "69cd125d0026d1789650",
  videoCollectionId: "69cd128c003c929bd8f4",
  storageId: "69cd164600115c277543"
}




let client = new Client();


client
  .setEndpoint(appwriteConfig.endpoint) 
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform); 

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (name, email, password) => {
    try {
        const newAccount = await account.create({
            userId: ID.unique(),
            email,
            password,
            name
        })
        
        if(!newAccount) throw Error("Failed to create account");

        const avatarUrl = avatars.getInitials(name);

        await SignIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                name,
                email,
                avatar: avatarUrl
            }
         )

         return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }    
}

export const SignIn = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        if(!session) throw Error("Failed to Sign In");
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
