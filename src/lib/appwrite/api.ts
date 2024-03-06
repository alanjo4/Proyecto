import { ID, Query } from "appwrite";
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
	try {
		const newAccount = await account.create(
			//UUID: UNIQUE ID
			ID.unique(), // required
			user.email, // required
			user.password,
			user.name,
		);
		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(user.name);

		const newUser = await saveUserToDB({
			accountId: newAccount.$id,
			name: newAccount.name,
			email: newAccount.email,
			username: user.username,
			imageUrl: avatarUrl,
		});

		return newUser;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export async function saveUserToDB(user: {
	accountId: string,
	email: string,
	name: string,
	imageUrl: URL,
	username?: string,
}) {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			user,
		)

		return newUser;
	} catch (error) {
		console.error(error);
	}
}

export async function signInAccount(user: {
	email: string,
	password: string
}) {
	try {
		console.log("email", user.email, "pass", user.password);

		const session = await account.createEmailSession(user.email, user.password);
		return session;
	} catch (error) {
		console.error(error);
	}
}

export async function signOutAccount() {
	try {
		const session = account.deleteSession("current");
		return session;
	} catch (error) {
		console.error(error)
	}
}

export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		console.log(error);
	}
}

export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getRecentPosts() {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(20)]
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
}

export async function getUsers(limit?: number) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const queries: any[] = [Query.orderDesc("$createdAt")];

	if (limit) {
		queries.push(Query.limit(limit));
	}

	try {
		const users = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			queries
		);

		if (!users) throw Error;

		return users;
	} catch (error) {
		console.log(error);
	}
}

export async function likePost(postId: string, likesArray: string[]) {
	try {
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			postId,
			{
				likes: likesArray,
			}
		);

		if (!updatedPost) throw Error;

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

export async function savePost(userId: string, postId: string) {
	try {
		const updatedPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			ID.unique(),
			{
				user: userId,
				post: postId,
			}
		);

		if (!updatedPost) throw Error;

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteSavedPost(savedRecordId: string) {
	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			savedRecordId
		);

		if (!statusCode) throw Error;

		return { status: "Ok" };
	} catch (error) {
		console.log(error);
	}
}
