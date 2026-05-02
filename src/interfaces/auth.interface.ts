export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
    terms: boolean;
}

export interface LoginFormValues {
    email: string;
    password: string;
}