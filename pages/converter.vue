<template>
    <section class="max-w-6xl w-full m-auto py-12 px-4">
        <h1 class="text-4xl mb-6">Slug converter</h1>
        <div class="mb-3">
            <Input type="text" v-model="text" placeholder="Text here..." class="mb-3" />
            <Button @click="convert" text="Convert" />
        </div>
        {{ slug }}
    </section>
</template>

<script setup>
    const text = ref("");
    const slug = ref("");

    function convert(){
        let string = text.value.toLowerCase();
        slug.value = string.replaceAll(' ', '-');
    }
</script>