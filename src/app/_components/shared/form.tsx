/*
 * These components are a modified version of the original shadcn/ui Form components.
 * @see https://ui.shadcn.com/docs/components/form
 *
 * */

import {
	type FormLabelProps,
	InputLabel,
	type InputLabelProps,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

const FormItem = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof Box>
>(({ ...props }, ref) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<Box ref={ref} {...props} />
		</FormItemContext.Provider>
	);
});
FormItem.displayName = "FormItem";

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);

	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

const FormLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
	({ ...props }, ref) => {
		const { error, formItemId } = useFormField();

		return (
			<InputLabel
				ref={ref}
				// className={cn(error && "text-destructive", className)}
				error={!!error}
				htmlFor={formItemId}
				{...props}
			/>
		);
	},
);
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef<HTMLLabelElement, FormLabelProps>(
	({ children, ...props }, ref) => {
		const { error, formMessageId } = useFormField();
		const body = error ? String(error?.message) : children;

		if (!body) {
			return null;
		}

		return (
			<FormLabel ref={ref} id={formMessageId} error={!!error} {...props}>
				{body}
			</FormLabel>
		);
	},
);
FormMessage.displayName = "FormMessage";

const FormControl = React.forwardRef<
	React.ElementRef<typeof Box>,
	React.ComponentPropsWithoutRef<typeof Box>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Box
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

export {
	Form,
	useFormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormControl,
};
