import { Link, useNavigate } from "react-router-dom";

import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";


export default function SignIn() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	// Query
	const { mutateAsync: signInAccount, isPending: isLoading } = useSignInAccount();

	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
		// Espero la respuesta de la función asíncrona de signInAccount ¿xq? Porque el proceso de logearse lleva X tiempo
		const session = await signInAccount(user);

		if (!session) {
			toast({ title: "Login failed. Please try again.", variant: "destructive" });
			return;
		}

		// Espera la respuesta de la función asíncrona de checkAuthUser
		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset();
			// Te lleva al home, donde van a estar las publicaciones
			navigate("/");
		} else {
			toast({ title: "Login failed. Please try again.", variant: "destructive" });
			return;
		}
	};

	return (
		<Form {...form}>
			<div className="flex-center flex-col sm:w-420">
				<img src="/images/logo.svg" alt="logo" />

				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Log in to your account
				</h2>
				<p className="small-medium md:base-regular mt-2 text-light-3">
					Welcome back! Please enter your details.
				</p>
				<form
					onSubmit={form.handleSubmit(handleSignin)}
					className="mt-4 flex w-full flex-col gap-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Email</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
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
									<Input type="password" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="shad-button_primary">
						{isLoading || isUserLoading ? (
							<div className="flex-center gap-2">
								<Loader /> Loading...
							</div>
						) : (
							"Log in"
						)}
					</Button>

					<p className="text-small-regular mt-2 text-center text-light-2">
						Don't have an account?
						<Link
							to="/sign-up"
							className="text-small-semibold ml-1 text-primary-500">
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
}