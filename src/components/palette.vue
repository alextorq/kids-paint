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
            <div class="add__color">
                <button class="btn">
                    add additional color
                </button>
                <input type="color" @change="addNewColor" v-model="additionalColor">
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
          return {
              additionalColor: '#ff0000'
          }
        },
        name: "palette",
        methods: {
            chooseColor(color) {
                this.$emit('chooseColor', color)
            },
            addNewColor() {
                this.$emit('addNewColor', this.additionalColor);
            }
        },
        props: ['colors']
    }
</script>
