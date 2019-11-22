<template>
    <div class="pagination-wrapper">
        <button class="prev btn" @click="fireEvent('prev')">Prev</button>
        <button class="next btn" @click="fireEvent('next')">Next</button>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        data() {
            return {
                currentPage: '',
            }
        },
        methods: {
          fireEvent(eventName) {
              this.$emit(eventName);
          }
        },
        props: ['pages']
    }
</script>