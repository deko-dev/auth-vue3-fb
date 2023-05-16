<template>
    <div class="Content_Box">
        <h2 class="Content_Box_Title">Recuperar contraseña</h2>
        <p class="Content_Box_Subtitle">Ingrese su correo y recibira un email para resetear su contraseña</p>

        <div class="Content_Form">
            <form @submit="handleSubmit">

                <div class="Form_Field">
                    <span> Correo </span>
                    <input :type="formLogin.email.type" v-model="formLogin.email.value" placeholder="Ingrese su email">
                </div>


                <div class="Btns_Form">
                    <span class="Msg_Error">{{ Msg_Error }}</span>

                    <Loading v-if="isLoading" />
                    <button type="submit" class="btn btn-primary">
                        {{ isLoading ? 'Cargando...' : 'Recuperar contraseña' }}
                    </button>
                    <p class="Divisor_Btns">o</p>
                    <router-link to="/login" class="btn btn-secundary">Iniciar sesión</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import Loading from '../components/Loading.vue';
import { sendPasswordResetEmail } from 'firebase/auth';
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
            }
        });
        const handleSubmit = (event) => {
            event.preventDefault();
            const { email: { value: emailUser } } = formLogin;
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

            if( !error ) {
                recoverPass( emailUser );
            }
        };

        const recoverPass = async (email) => {
            isLoading.value = true;
            try {
                await sendPasswordResetEmail(auth, email )
                setTimeout(() => {
                    isLoading.value = false;
                    router.push('/login');
                }, 1500);
            } catch (error) {
                console.error('Ha ocurrido un error', { ...error })
                isLoading.value = false;
            }
        }

        return {
            formLogin,
            handleSubmit,
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

            .Msg_Error {
                font-size: .85rem;
                color: #922121;
                font-weight: 500;
            }
        }
    }
}</style>