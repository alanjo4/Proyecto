import { Link } from "react-router-dom";

import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { SigninValidation } from "@/lib/validation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export default function SignIn() {
	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
		// Handle Sign In
		console.log(user);
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
						Log in
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