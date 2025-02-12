<script setup>
import { computed } from 'vue';
const route = useRoute();

const layout = computed(() => {
  return route.fullPath === '/' || route.fullPath === '/resetPw' ? 'login-user-layout' : route.fullPath === '/mng/login' ? 'login-admin-layout': route.fullPath.includes('/mng/') ? 'admin':'user';
})
</script>

<template>
    <NuxtLayout :name="layout">
       <NuxtPage />
    </NuxtLayout>
</template>
