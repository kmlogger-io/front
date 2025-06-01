import { FormBuilder } from "../../../../../shared/components/formbuilder/components/FormBuilder";
import { FormField } from "../../../../../shared/components/formbuilder/components/FormField";
import { loginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin.hook";
import { Box } from "@mui/material";
import { EMAIL_CHARACTER_LIMIT, PASSWORD_CHARACTER_LIMIT } from "../../../../../shared/constants/charcter-limits.const";

export function Login(){
    const { handleLogin } = useLogin();

    const extraLinks = ['Sign Up', 'Forgot Password?', 'Help'];

    return(
        <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <FormBuilder
                title="Login"
                schema={loginSchema}
                onSubmit={handleLogin}
                submitButtonText="Login"
                defaultValues={{
                    email: '',
                    password: ''
                }}
                showSubmitButton={true}
                extralinks={extraLinks}
                className="w-full gap-4"
                subTitle="Please login to continue."
            >
                <FormField
                    name="email"
                    label="Email"
                    InputType="email"
                    placeholder="Digite seu email"
                    autoComplete="email"
                    autoFocus={true}
                    CharacterLimit={EMAIL_CHARACTER_LIMIT}
                />
                
                <FormField
                    name="password"
                    label="Password"
                    InputType="password"
                    placeholder="Digite sua senha"
                    CharacterLimit={PASSWORD_CHARACTER_LIMIT}
                />
            </FormBuilder>
        </Box>
    ) 
}