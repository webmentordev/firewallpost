<template>
    <section class="max-w-6xl w-full m-auto py-12 px-4">
        <h1 class="text-5xl mb-3">{{ post.title }}</h1>
        <div class="flex flex-col mb-6">
            <time :datetime="post.created" itemprop="datePublished" class="mb-1 inline-block"><strong>Posted at:</strong> {{ post.created }}</time>
            <time :datetime="post.updated" itemprop="dateUpdated" class="inline-block" v-if="post.created != post.updated"><strong>Updated:</strong> {{ post.updated }}</time>
        </div>
        <nuxt-img quality="50" :src="post.image" :title="post.title" :alt="post.title" class="mb-12 rounded-lg shadow-xl w-full" />
        <main class="body mb-12" v-html="post.body" itemscope :itemtype="slug">
        </main>
        <h2 class="mb-5 text-4xl font-bold">Our recommendations</h2>
        <div class="grid grid-cols-3 gap-6" v-if="posts.length">
            <div v-for="post in posts" :key="post.id">
                <NuxtLink :to='`/post/${post.slug}`'>
                    <nuxt-img quality="10" :src="post.image" :alt='`${post.title} Image`' class="mb-2 rounded-md" />
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
    const slug = useRoute().params.slug;

    const post = ref(null);
    const posts = ref([]);
    const record = await pb.collection('posts').getFirstListItem(`slug="${slug}"`);
    if(record){
        post.value = {
            ...record,
            image: api+'/api/files/posts/'+record.id+'/'+record.image
        }
        useSeoMeta({
            title: post.value.title,
            ogTitle: post.value.title,
            description: post.value.seo,
            ogDescription: post.value.seo,
            ogImage: post.value.image,
            twitterCard: 'summary_large_image',
        })
    }else{
        throw createError({
            statusCode: 404,
            statusMessage: 'post not found!',
            fatel: true
        });
    }

    onMounted(async () => {
        const result = await pb.collection('posts').getList(1, 3, { sort: "@random" });
        posts.value = result.items.map((item) => {
            return {
                ...item,
                image: api+'/api/files/posts/'+item.id+'/'+item.image
            }
        });
    })
</script>