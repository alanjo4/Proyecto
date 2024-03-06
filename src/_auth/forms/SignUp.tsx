import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import Loader from "@/components/shared/Loader";

import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"

import { useCreateUserAccount } from "@/lib/react-query/queries";
import { useSignInAccount } from "@/lib/react-query/queries";

import { useUserContext } from "@/context/AuthContext";

export default function SignUp() {
	const { toast } = useToast();
	const navigate = useNavigate();

	// Queries (react-query library)
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
	const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
	const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		}
	});

	const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
		try {
			const newUser = createUserAccount(user);

			if (!newUser) {
				toast({
					title: "There was an issue in the sign up",
				})
			}

			const session = await signInAccount({
				email: user.email,
				password: user.password,
			})

			if (!session) {
				toast({
					title: "Something went wrong. Please login again.",
				})
				navigate("/sign-in");
				return
			}

			const isLoggedIn = await checkAuthUser();

			if (isLoggedIn) {
				form.reset();
				navigate("/");
			} else {
				toast({
					title: "Check your credentials. Please try again.",
				});
			}
		} catch (error) {
			console.error({ error });
		}
	};

	return (
		<Form {...form}>
			<div className="flex-center flex-col sm:w-420">
				<img src="/images/logo.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create account</h2>
				<p className="small-medium md:base-regular mt-2 text-light-3">To use snapgram, please enter your details</p>
				<form onSubmit={form.handleSubmit(handleSignup)} className="mt-4 flex w-full flex-col gap-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Name</FormLabel>
								<FormControl>
									<Input className="shad-input" placeholder="Enter your name" {...field} />
								</FormControl>
								<FormDescription>
									This is your public name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Username</FormLabel>
								<FormControl>
									<Input className="shad-input" placeholder="Enter your username" {...field} />
								</FormControl>
								<FormDescription>
									This will be your username.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Email</FormLabel>
								<FormControl>
									<Input type="email" className="shad-input" placeholder="Enter your email" {...field} />
								</FormControl>
								<FormDescription>
									This is your email.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Password</FormLabel>
								<FormControl>
									<Input type="password" className="shad-input" placeholder="Enter your password" {...field} />
								</FormControl>
								<FormDescription>
									This will be your password.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="shad-button_primary">
						{isCreatingAccount || isSigningInUser || isUserLoading ? (
							<div className="flex-center gap-2">
								<Loader /> Loading...
							</div>
						) : (
							"Sign Up"
						)}
					</Button>

					<p>
						Already have an account?
						<Link to="/sign-in" className="text-small-semibold ml-1 text-primary-500">
							Log in
						</Link>
					</p>
				</form>
			</div>
			<Toaster />
		</Form>
	)
}