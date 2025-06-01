import { FormBuilder } from "../../../../../shared/components/formbuilder/components/FormBuilder";
import { FormField } from "../../../../../shared/components/formbuilder/components/FormField";
import { loginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin.hook";
import { Box } from "@mui/material";

export function Login(){
    const { handleLogin } = useLogin();

    const extraLinks = ['Esqueci minha senha', 'Registrar'];

    return(
        <Box sx={{ width: '100%', maxWidth: 400 }}>
            <FormBuilder
                title="Login"
                schema={loginSchema}
                onSubmit={handleLogin}
                submitButtonText="Entrar"
                defaultValues={{
                    email: '',
                    password: ''
                }}
                showSubmitButton={true}
                extralinks={extraLinks}
                className="w-full"
            >
                <FormField
                    name="email"
                    label="Email"
                    InputType="email"
                    placeholder="Digite seu email"
                />
                
                <FormField
                    name="password"
                    label="Senha"
                    InputType="password"
                    placeholder="Digite sua senha"
                />
            </FormBuilder>
        </Box>
    ) 
}