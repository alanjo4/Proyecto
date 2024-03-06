import {
	useMutation,
	useQuery,
	useQueryClient
} from "@tanstack/react-query";

import { createUserAccount, signInAccount, signOutAccount, getRecentPosts, getUsers, likePost, savePost, deleteSavedPost, getCurrentUser } from "../appwrite/api";
import { INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

/** Auth queries */

/*
Hooks de react: (un hook es UNA FUNCIÓN, solo que se le dice hook, por un concepto teórico)

useState -> para manejar el estado de mi aplicación
useEffect -> detectar cuando el componente se monta, cuando se desmonta y cuándo se actualiza.
			-> state cuando se monta es true, y el use effect detecta la condición de si monta o no
			-> lo mismo cuando se desmonta
			-> lo mismo cuando se actualiza

useCreateUserAccount -> es un custom hook
*/
export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};
// Callback era una función que se llama dentro de OTRA FUNCIÓN

export const useSignInAccount = () => {
	return useMutation({
		mutationFn: (user: {
			email: string,
			password: string
		}) => signInAccount(user)
	});
}

export const useSignOutAccount = () => {
	return useMutation({
		mutationFn: signOutAccount
	});
}


/** POST QUERIES */
export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};

export const useGetUsers = (limit?: number) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS],
		queryFn: () => getUsers(limit),
	});
};

export const useLikePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			postId,
			likesArray,
		}: {
			postId: string;
			likesArray: string[];
		}) => likePost(postId, likesArray),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
			savePost(userId, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

/** USER QUERIES */

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};