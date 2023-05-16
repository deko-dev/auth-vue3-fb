<template>
    <div class="Header">
        <div class="Header_Opts">
            <ul>
                <li>
                    <router-link to="/">Inicio</router-link>
                </li>
                <li>
                    <router-link to="/productos">Productos</router-link>
                </li>
                <li>
                    <a @click="onSignOut">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { auth } from '../firebaseConfig';

export default {
    name: 'HeaderComponent',
    setup() {
        const router = useRouter();

        const onSignOut = async () => {
            const responseSignOut = await signOut(auth);
            console.log(responseSignOut);
            router.push('/login');
            localStorage.removeItem('tokenFB')
        };

        return {
            onSignOut,
        }
    }
}
</script>

<style scoped lang="scss">
.Header {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.1);
    padding: 0 2.5rem;

    ul {
        margin-left: auto;
        width: 260px;
        display: flex;
        gap: 2rem;
        height: 60px;
        justify-content: space-between;
        align-items: center;

        li {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            a {
                color: #3E7B31;
                transition: all .25s;

                &:hover {
                    color: #264f1d;
                    border-bottom: 2px solid #264f1d;
                }
            }
        }
    }
}

@media screen and (max-width: 520px) {
    .Header {
        ul {
            margin: 0 auto;
            width: 80%;
        }
    }
}
</style>