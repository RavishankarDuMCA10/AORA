import { Client, Account, ID, Models, Avatars, Databases, Query } from 'react-native-appwrite';

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
        // FIX 1: Pass positional arguments instead of an object
        const newAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            name
        );
        
        if(!newAccount) throw Error("Failed to create account");

        const avatarUrl = avatars.getInitials(name).toString();

        // FIX 2: Clear existing session before signing in to avoid "session active" error
        try {
            await account.deleteSession('current');
        } catch (sessionError) {
            // Ignore if no session exists
        }

        await signIn(email, password);

        // Create the user document in your collection
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username: name,
                email: email,
                avatar: avatarUrl
            }
         );

         return newUser;
    } catch (error) {
        console.log("CreateUser Error:", error.message);
        throw new Error(error);
    }    
}

export const signIn = async (email, password) => {
    try {
        // Force clear any "ghost" sessions first
        try {
        await account.deleteSession("current");
        } catch (e) {
        // Ignore error if no session existed
        }

        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();        
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if(!currentUser) throw Error;        
        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
