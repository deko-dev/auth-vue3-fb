<template>
    <div class="Main_Content">
        <div class="Main_Content_Header">
            <HeaderComponent />
        </div>

        <div class="Main_Content_Products">
            <Loading v-if="isLoading" />

            <div class="Products_Cards" v-else>
                <CardProduct v-for="product in products" :key="product.id" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import Loading from '../components/Loading.vue';
import CardProduct from '../components/CardProduct.vue';
import HeaderComponent from '../components/Header.vue';

export default {
    setup() {
        const products = reactive([]);
        const isLoading = ref(false);

        onMounted(async () => {
            isLoading.value = true;
            try {
                const responseProductsList = await fetch('https://fakestoreapi.com/products')
                const productsList = await responseProductsList.json();
                console.log(productsList);
                products.push(...productsList);
                console.log(products);
                setTimeout(() => {
                    isLoading.value = false;
                }, 1000);
            } catch (error) {
                console.error('Ha ocurrido un error', { ...error });
            }
        });

        return {
            Loading,
            products,
            isLoading,
            HeaderComponent
        }
    },
    components: { Loading, CardProduct, HeaderComponent }
}

</script>

<style lang="scss">
.Main_Content_Products {
    width: 100%;
    min-height: 100vh;
    background-color: #f8fff6;

    .Products_Cards {
        width: 70%;
        margin: 0 auto;
        padding: 4rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 1.5rem;
    }
}
</style>