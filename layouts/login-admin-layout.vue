<script setup>

</script>
<template>
    <div>
        <div class="flex items-center justify-center">
            <main
                class=" mb-10 w-full px-[20px] pb-[45px] pt-[20px]"
            >
                <slot />
            </main>
            <div class="fixed bottom-0 z-[1039] w-full">
                <!-- <div class="admin-footer-image"></div> -->
                <div class="bg-dark py-[3px] text-center text-white">
                    2025 CBIT Co.Ltd.
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.admin-footer-image {
    background: url(~/assets/images/admin/footer-manager.png) 0 0;
    background-repeat: repeat;
    background-position: top;
    padding: 40px 20px 0;
    margin: 0 auto;
    text-align: center;
}
.admin-logo {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 5px 10px;
    border-bottom: 3px solid theme('colors.primary');
}
.nav-sidebar {
    .nav-link {
        i {
            padding-right: 10px;
        }
        &:hover {
            color: theme('colors.dark');
        }
    }
}

.link-active {
    background-color: #1e4290;
    color: #fff;
    opacity: 1;
}
.main-header {
    width: calc(100vw - 250px);
}
</style>
