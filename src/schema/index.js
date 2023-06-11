import * as Yup from 'yup';

export const ValidationRegister = Yup.object({
    username: Yup.string().trim('White spaces not allowed!').strict().required('Please enter your name'),
    email: Yup.string().trim('White spaces not allowed!').strict().email().required('Please enter your email!'),
    password: Yup.string()
        .trim('White spaces not allowed!')
        .strict()
        .required('Password is Required')
        .min(8, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/[a-z]+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/[A-Z]+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/\d+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
});

export const ValidationLogin = Yup.object({
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().min(8).required('Please enter your password')
});

export const ValidationForgotPass = Yup.object({
    email: Yup.string().email().required('Please enter your email')
});

export const ValidationResetPass = Yup.object({
    password: Yup.string()
        .trim('White spaces not allowed!')
        .strict()
        .required('Password is Required')
        .min(8, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/[a-z]+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/[A-Z]+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/\d+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required'),
    confirmPassword: Yup.string()
        .required('Confirm Password is Required')
        .oneOf([Yup.ref('password')], 'Confirm Password did not match')
});

export const ValidationQRScan = Yup.object({
    email: Yup.string().email().required('Please enter your email')
});

export const ValidationPassword = Yup.object({
    currentPassword: Yup.string().required('Current Password is Required'),
    newPassword: Yup.string()
        .trim('White spaces not allowed!')
        .strict()
        .required('New Password is Required')
        .notOneOf([Yup.ref('currentPassword')], 'New Password must be different')
        .min(8, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/[a-z]+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/[A-Z]+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required')
        .matches(/\d+/, 'Password must contain at least one Uppercase, Lowercase and Number and Minimum Length 8 is Required'),
    confirmPassword: Yup.string()
        .required('Confirm Password is Required')
        .oneOf([Yup.ref('newPassword')], 'Confirm Password did not match')
});

export const ValidationRecipt = Yup.object({
    // email: Yup.string().email().required('Please enter your email'),
    walletAddress: Yup.string().trim('White spaces not allowed!').strict().required('Please enter your wallet address'),
    receiptId: Yup.string().trim('White spaces not allowed!').strict().required('Please enter your id')
});
