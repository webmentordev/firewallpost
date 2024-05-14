<template>
    <section class="max-w-6xl w-full m-auto py-12 px-4">
        <h1 class="text-4xl mb-6">Welcome to Firewall Posts</h1>
        <div class="grid grid-cols-3 gap-6" v-if="posts.length">
            <div v-for="post in posts" :key="post.id">
                <NuxtLink :to='`/post/${post.slug}`'>
                    <nuxt-img quality="20" :src="post.image" :alt='`${post.title} Image`' class="mb-2 rounded-md" />
                    <div class="p-1">
                        <h3 class="text-lg mb-2">{{ post.title }}</h3>
                        <p class="mb-3">{{ post.description }}</p>
                        <span class="w-full bg-black text-white font-semibold p-3 inline-block text-center rounded-md">Read Post</span>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <p v-else>
            {{ posts.length == 0 ? 'No posts found!' : 'Loading...' }}
        </p>
    </section>
</template>

<script setup>
    import PocketBase from 'pocketbase';
    const api = useRuntimeConfig().public.api;
    const pb = new PocketBase(api);
    

    const posts = ref([]);
    const data = await pb.collection('posts').getFullList({
        sort: '-created'
    });
    posts.value = data.map((item) => {
        return {
            ...item,
            image: api+'/api/files/posts/'+item.id+'/'+item.image
        }
    });
</script>