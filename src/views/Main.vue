<template>
    <div class="Main_Content">
        <div class="Main_Content_Header">
            <HeaderComponent />
        </div>

        <div class="Main_Content_Desc">
            <h2 class="title">Bienvenido!! usa responsablemente la pagina</h2>
            <p class="desc">En esta prueba técnica, puse a prueba mis habilidades creando WebApps sencillas usando Vue 3 y
                adaptándolo a su uso más reciente. Utilicé peticiones Fetch, así como un sistema de autenticación corto y
                sencillo con Firebase, utilizando como métodos el correo electrónico y la contraseña, o también con una
                cuenta de Google.</p>
            <div class="Content_Redes">
                <ul>
                    <li>
                        <a href="https://github.com/deko-dev" target="_blank">
                            <img :src="IconGitHub" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/%F0%9F%90%BCdeyser-orozco-yepes-553311142/" target="_blank">
                            <img :src="IconLinkedIn" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="https://wa.link/2k0lqc" target="_blank">
                            <img :src="IconWhatsApp" alt="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue';
import IconGitHub from '../assets/img/icon_github.png'
import IconLinkedIn from '../assets/img/icon_linkedin.png'
import IconWhatsApp from '../assets/img/icon_whatsapp.png'

export default {
    setup() {

        return {
            IconGitHub,
            IconLinkedIn,
            IconWhatsApp
        }
    },
    components: { HeaderComponent }

}
</script>

<style scoped lang="scss">
.Main_Content_Desc {
    width: 70%;
    height: auto;
    margin: 0 auto;
    text-align: center;
    padding-top: 8rem;

    h2.title {
        font-size: 36px;
        color: #3E7B31;
    }

    p.desc {
        font-size: 16px;
        color: #3E7B31;
        font-weight: 400;
        width: 70%;
        margin: 0 auto;
        margin-top: 4rem;
    }

    .Content_Redes {
        width: 150px;
        margin: 0 auto;
        margin-top: 4rem;

        ul {
            margin-left: auto;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            li {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                a {
                    img {
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 520px){
    .Main_Content_Desc {
    width: 95%;
    padding-top: 4rem;

    h2.title {
        font-size: 34px;
    }

    p.desc {
        width: 100%;
        margin-top: 2rem;
    }
}
}
</style>