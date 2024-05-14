<template>
    <nav class="w-full top-0 left-0 sticky border-b border-gray-200 bg-white">
        <div class="max-w-6xl m-auto flex items-center justify-between py-2 px-4">
            <NuxtLink to="/">
                <img src="/logo.png" alt="Firewall post logo" width="40">
            </NuxtLink>
            <ul class="font-semibold">
                <NuxtLink class="px-6" to="/">Home</NuxtLink>
                <NuxtLink class="px-6" to="/contact">Contact</NuxtLink>
                <NuxtLink class="px-6" to="/converter">Converter</NuxtLink>
            </ul>
        </div>
    </nav>
</template>