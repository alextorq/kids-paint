<template>
    <div class="palette-wrapper">
        <div class="text-center text-bold title">
            choose color
        </div>
        <div class="palette__list">
            <div class="palette__item" v-for="(color, index) in colors"
                 @click="chooseColor(color)"
                 :key="index + color" :style="{backgroundColor: color}">

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "palette",
        methods: {
            chooseColor(color) {
                this.$emit('chooseColor', color)
            }
        },
        props: ['colors']
    }
</script>
