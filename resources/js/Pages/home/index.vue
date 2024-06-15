<template >
    <div>
        test {{name}}
    </div>
</template>


<script setup>
import { Link } from '@inertiajs/vue3';
const props = defineProps(["name"])
console.log(props.name);
</script>
<style lang="">
    
</style>