<template>

    <div class="Card_Product">
        <div class="Image_Product" :style="`background-image: url(${product.image});`"></div>
        <h3 class="Title_Product">{{ product.title }}</h3>
        <h3 class="Price_Product">${{ product.price }}</h3>
        <h3 class="Category_Product">{{ product.category }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            requerid: true
        }
    },
    setup(){

    }
}
</script>

<style scope lang="scss">
    .Card_Product {
        width: 230px;
        background-color: #fff;
        border: 1px solid #c4c5c4;
        // box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.1);
        height: 350px;
        overflow: hidden;
        padding: 0 1rem;

        .Image_Product {
            width: 100%;
            height: 200px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            margin-bottom: 1rem;
        }

        .Title_Product {
            font-size: .85rem;
            color: #3E7B31;
            font-weight: 700;
            margin-bottom: 1rem;
            height: 60px;
        }
        
        .Price_Product {
            font-size: 1rem;
            color: #264f1d;
            font-weight: 700;  
            text-align: right;  
        }

        .Category_Product {
            font-size: .65rem;
            color: #264f1d;
            font-weight: 700;  
            text-align: left;  
            padding: .25rem;
            background-color: #c4c5c4;
            border-radius: 100px;
            max-width: 100px;
            text-align: center;
            margin-top: .75rem;
        }
    }


</style>