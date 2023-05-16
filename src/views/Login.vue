<template>
    <div class="Content_Box">
        <h2 class="Content_Box_Title">Iniciar Sesión</h2>
        <p class="Content_Box_Subtitle">Ingrese su correo y contraseña</p>

        <div class="Content_Form">
            <form @submit="handleSubmit">

                <div class="Form_Field">
                    <span> Correo </span>
                    <input :type="formLogin.email.type" v-model="formLogin.email.value" placeholder="Ingrese su email">
                </div>
                
                <div class="Form_Field">
                    <span> Contraseña </span>
                    <input :type="formLogin.password.type" v-model="formLogin.password.value"
                        placeholder="Ingrese su contraseña">
                </div>
                <div class="Options_Form">
                    <span @click="handleShowPass" class="Btn_ShowPass">Mostrar contraseña</span>
                    <router-link to="/recover_pass" class="Btn_ShowPass">Olvidó su contraseña?</router-link>
                </div>



                <div class="Btns_Form">
                    <span class="Msg_Error">{{ Msg_Error }}</span>

                    <Loading v-if="isLoading" />
                    <button type="submit" class="btn btn-primary">
                        {{ isLoading ? 'Cargando...' : 'Iniciar sesion' }}
                    </button>
                    <p class="Divisor_Btns">o</p>
                    <router-link to="/register" class="btn btn-secundary">Registrarme</router-link>

                    <button type="button" class="Btn_Logo_Google btn btn-secundary" @click="loginWithGoogle">
                        <img :src="logoGoogle" alt="Logo de Google">
                        Usa Google!!
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import LogoGoogle from '../assets/img/icon_google.png'
import Loading from '../components/Loading.vue';
import { signInWithEmailAndPassword, GoogleAuthProvider,  signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const isLoading = ref(false);
        const Msg_Error = ref("");
        const router = useRouter();
        const formLogin = reactive({
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
            const { email: { value: emailUser }, password: { value: passwordUser } } = formLogin;
            let error = false;
            isLoading.value = true;

            if (!emailUser) {
                Msg_Error.value = "Debe escribir su correo";
                error = true;
                isLoading.value = false;
                return;
            }
            else {
                isLoading.value = false;
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailValid = regex.test(emailUser);
                Msg_Error.value = !emailValid ? "Debe escribir un correo valido" : "";
                if (!emailValid) {
                    return;
                }
            }
            if (!passwordUser) {
                Msg_Error.value = "Debe escribir su contraseña";
                isLoading.value = false;
                error = true;
                return;
            }

            if( !error ) {
                loginWithEmailPassword( emailUser, passwordUser );
            }
        };
        
        const loginWithEmailPassword = async(email, password) => {
            isLoading.value = true;
            try {
                const responseLoginEmailPass = await signInWithEmailAndPassword(auth, email, password);
                console.log( responseLoginEmailPass );
                if( responseLoginEmailPass ) {
                    router.push('/')
                    isLoading.value = false;
                }
            } catch (error) {
                console.error('Ha ocurrido un error en el login', {...error});
                const { code } = error;
                if( code === 'auth/user-not-found' ){
                    Msg_Error.value = 'Usuario no existe!!!'
                }
                if( code === 'auth/wrong-password' ){
                    Msg_Error.value = 'Contraseña incorrecta por favor verifque!!!'
                }
                if( code === 'auth/too-many-requests' ){
                    Msg_Error.value = 'Usuario bloqueado, por favor restablezca la contraseña!!!'
                }

                isLoading.value = false;
            }
        }

        const loginWithGoogle = async () => {
            isLoading.value = true;
            try {
                const providerGoogle = new GoogleAuthProvider();
                const responseSignWithPopUp = await signInWithPopup(auth, providerGoogle);
                if( responseSignWithPopUp ) {
                    isLoading.value = false;
                    router.push( '/' );
                }
                isLoading.value = false;
            } catch (error) {
                console.error("Ha ocurrido un error en el registro", error);
                isLoading.value = false;
            }
        }

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
            loginWithGoogle,
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
    width: 400px;
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
            margin-top: 1rem;
            .Form_Field {
                margin-top: 1rem;
            }

            .Btns_Form {
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
                justify-content: space-between;
                padding-top: .25rem;
                margin-top: .5rem;

                span, a {
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
                text-align: center;
            }
        }
    }
}</style>