<template>
    <div class="Content_Box">
        <h2 class="Content_Box_Title">Registro</h2>
        <p class="Content_Box_Subtitle">Ingrese los datos correspondientes para realizar su registro</p>

        <div class="Content_Form">
            <form @submit="handleSubmit">

                <div class="Form_Field">
                    <span>Nombres</span>
                    <input :type="formLogin.names.type" v-model="formLogin.names.value"
                        placeholder="Ingrese su nombre completo">
                </div>

                <div class="Form_Field">
                    <span>Apellidos</span>
                    <input :type="formLogin.surnames.type" v-model="formLogin.surnames.value"
                        placeholder="Ingrese sus apellidos">
                </div>

                <div class="Form_Field">
                    <span>Correo</span>
                    <input :type="formLogin.email.type" v-model="formLogin.email.value" placeholder="Ingrese su email">
                </div>

                <div class="Form_Field">
                    <span>Contraseña</span>
                    <input :type="formLogin.password.type" v-model="formLogin.password.value"
                        placeholder="Ingrese su contraseña">
                </div>
                <div class="Options_Form">
                    <span @click="handleShowPass" class="Btn_ShowPass">Mostrar contraseña</span>
                </div>



                <div class="Btns_Form">
                    <span class="Msg_Error">{{ Msg_Error }}</span>

                    <Loading v-if="isLoading" />
                    <button type="submit" class="btn btn-primary">
                        {{ isLoading ? 'Cargando...' : 'Enviar registro' }}
                    </button>
                    <p class="Divisor_Btns">o</p>
                    <router-link to="/login" class="btn btn-secundary">Iniciar sesion</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import LogoGoogle from '../assets/img/icon_google.png';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { auth, app } from "../firebaseConfig";
import Loading from '../components/Loading.vue';
import { useRouter } from 'vue-router'

export default {
    setup() {
        const isLoading = ref(false);
        const Msg_Error = ref("");
        const router = useRouter();

        const formLogin = reactive({
            names: {
                value: "",
                error: false,
                success: false,
                type: "text"
            },
            surnames: {
                value: "",
                error: false,
                success: false,
                type: "text"
            },
            email: {
                value: "",
                error: false,
                success: false,
                type: "email"
            },
            password: {
                value: "",
                error: false,
                success: false,
                type: "password"
            },
        });

        const handleSubmit = (event) => {
            event.preventDefault();
            let error = false;
            const { names: { value: namesUser }, surnames: { value: surnamesUser }, email: { value: emailUser }, password: { value: passwordUser } } = formLogin;
            isLoading.value = true;


            if (!namesUser) {
                Msg_Error.value = "Debe escribir sus nombres";
                error = true;
                isLoading.value = false;
                return;
            }

            if (!surnamesUser) {
                Msg_Error.value = "Debe escribir sus apellidos";
                isLoading.value = false;
                error = true;
                return;
            }

            if (!emailUser) {
                Msg_Error.value = "Debe escribir su correo";
                error = true;
                isLoading.value = false;
                return;
            } else {
                isLoading.value = false;
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailValid = regex.test(emailUser);
                Msg_Error.value = !emailValid ? 'Debe escribir un correo valido' : ''
                if (!emailValid) {
                    return
                }
            }

            if (!passwordUser) {
                Msg_Error.value = "Debe escribir su contraseña";
                isLoading.value = false;
                error = true;
                return;
            }

            if (!error) {
                registerWithEmailPass(emailUser, passwordUser);
            }
        };
        const registerWithEmailPass = async (email, password) => {
            isLoading.value = true;
            try {
                const userRegisterResponse = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userRegisterResponse);
                setTimeout(() => {
                    isLoading.value = false;
                    router.push('/login');
                }, 1500);
            }
            catch (error) {
                console.error("Ha ocurrido un error en el registro", error);
                setTimeout(() => {
                    isLoading.value = false;
                }, 1500);
            }
        };
        

        const handleShowPass = () => {
            const newType = formLogin.password.type === "text" ? "password" : "text";
            formLogin.password = {
                ...formLogin.password,
                type: newType,
            };
            console.log(formLogin.password.type);
        };
        return {
            formLogin,
            handleSubmit,
            handleShowPass,
            logoGoogle: LogoGoogle,
            isLoading,
            Msg_Error
        };
    },
    components: { Loading }
}
</script>

<style scoped lang="scss">
.Content_Box {
    width: 700px;
    height: auto;
    background-color: #fff;
    border-radius: 15px;
    margin: auto;
    box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 1rem 2rem;

    .Content_Box_Title {
        font-size: 2rem;
        margin-top: 2rem;
        color: #3E7B31;
        font-weight: 700;
    }

    .Content_Box_Subtitle {
        color: #3E7B31;
        font-size: 1rem;
        margin-top: 1rem;
        font-weight: 300;
    }

    .Btn_Logo_Google {
        margin-bottom: 0;

        &:hover {
            background-color: #fff;
            color: #3E7B31;
        }

        img {
            width: 35px;
            height: 35px;
            margin-right: 1rem;
        }
    }

    .Content_Form {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        form {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 1rem;

            .Form_Field {
                width: calc(50% - 1rem);
                margin-top: 1rem;
            }

            .Btns_Form {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 1.5rem;

                button.btn-primary {
                    margin-top: 1.5rem;
                }

                .Divisor_Btns {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #3E7B31;
                    margin-top: .75rem;
                }
            }


            .Options_Form {
                width: 100%;
                display: flex;
                justify-content: end;
                padding-top: .25rem;
                margin-top: .5rem;

                span {
                    font-size: .75rem;
                    color: #3E7B31;
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .Msg_Error {
                font-size: .85rem;
                color: #922121;
                font-weight: 500;
            }
        }
    }
}
</style>