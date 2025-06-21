import { FormBuilder } from "../../../../../shared/components/formbuilder/components/FormBuilder";
import { FormField } from "../../../../../shared/components/formbuilder/components/FormField";
import { loginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin.hook";
import { Box } from "@mui/material";
import { EMAIL_CHARACTER_LIMIT, PASSWORD_CHARACTER_LIMIT } from "../../../../../shared/constants/charcter-limits.const";

export function Login() {
    const { handleLogin, isLoading } = useLogin();
   
    const extraLinks = [
        { name: 'Help', path: '/help' },
    ];

    return (
        <Box sx={{
            width: '100%',
            maxWidth: 600,
            margin: '0 auto',
            padding: 2,
            marginTop: 0,
            height: '88vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <FormBuilder
                title="Login"
                schema={loginSchema}
                onSubmit={handleLogin}
                submitButtonText={isLoading ? "Entrando..." : "Login"}
                defaultValues={{
                    email: '',
                    password: ''
                }}
                showSubmitButton={true}
                extralinks={extraLinks}
                className="w-full gap-4"
                subTitle="Please login to continue."
                isLoading={isLoading}
            >
                <FormField
                    name="email"
                    label="Email"
                    InputType="email"
                    placeholder="Enter your email or username"
                    autoComplete="email"
                    autoFocus={true}
                    CharacterLimit={EMAIL_CHARACTER_LIMIT}
                    disabled={isLoading}
                />
               
                <FormField
                    name="password"
                    label="Password"
                    InputType="password"
                    placeholder="Enter your password"
                    CharacterLimit={PASSWORD_CHARACTER_LIMIT}
                    disabled={isLoading}
                />
            </FormBuilder>
        </Box>
    );
}