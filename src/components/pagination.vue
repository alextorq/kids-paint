<template>
    <div class="pagination-wrapper">
        <div class="prev">Prev</div>
        <div class="next">Next</div>
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
        props: ['pages']
    }
</script>