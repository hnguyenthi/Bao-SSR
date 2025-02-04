<script setup lang="ts">

const route = useRoute();
console.log('route.fullPath', route.fullPath);
const layout = route.fullPath === '/' ? 'login-user-layout' : route.fullPath === '/mng/login' ? 'login-admin-layout': route.fullPath.includes('/mng/') ? 'admin':'user';

</script>

<template>
    <NuxtLayout :name="layout">
       <NuxtPage />
    </NuxtLayout>
</template>
