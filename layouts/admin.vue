<script setup>
import { ref } from "vue";
const sidebar = ref(true);
const router = useRouter();
const route = useRoute();
const handleTop = () => {
  router.push("/mng/dashboard");
};
const handleLogout = () => {
  router.push("/mng/login");
};
const menu = [
   {
    title: "ダッシュボード",
    icon: `fa-solid fa-chart-simple`,
    link: "/mng/dashboard",
  },
  {
    title: "ユーザ管理",
    icon: `fa-solid fa-users`,
    link: "/mng/users",
  },
  {
    title: "お知らせ管理",
    icon: "fa-solid fa-bell",
    link: "/mng/news",
  },
  {
    title: "収支報告書",
    icon: "fa-solid fa-file",
    link: "/mng/report",
  },
  {
    title: "メール一斉送信",
    icon: "fa-solid fa-envelope",
    link: "/mng/mails",
  },
  {
    title: "オプション購入履歴",
    icon: "fa-solid fa-map-marker-alt",
    link: "/mng/purchases",
  },
];
</script>
<template>
  <div>
    <div
      v-if="route.fullPath !== '/mng/login'"
      class="main-header !z-[1039] navbar navbar-expand navbar-white navbar-light fixed top-0 flex justify-between bg-dark py-0 !fixed !top-0"
      :class="{
        '!ml-0 !w-screen': !sidebar,
      }"
    >
      <div class="flex justify-between items-center w-full">
        <div class="nav-item">
          <div
            class="nav-link"
            data-widget="pushmenu"
            role="button"
            @click="sidebar = !sidebar"
          >
            <font-awesome-icon icon="fa-solid fa-bars" class="text-white" />
          </div>
        </div>
        <div
          class="flex h-[47px] items-center justify-end gap-2 px-3 text-[18px]"
        >
          <div>出茂 太郎</div>
          <div
            class="cursor-pointer hover:underline hover:underline-offset-4"
            @click="handleLogout"
          >
            | ログアウト
          </div>
        </div>
      </div>
    </div>
    <Transition name="slide">
      <div v-if="sidebar" class="sidebar-panel">
        <aside
          v-if="route.fullPath !== '/mng/login'"
          class="main-sidebar sidebar-dark-primary elevation-4 !fixed"
        >
          <!-- Brand Logo -->
          <div @click="handleTop" class="cursor-pointer">
            <div class="admin-logo">
              <img
                src="~/assets/images/admin/bao-logo-white.png"
                alt=""
                class="h-[36px] w-[108px]"
              />
            </div>
          </div>
          <!-- Sidebar -->
          <div class="sidebar h-100vh px-0">
            <!-- Sidebar user panel (optional) -->
            <div class="mb-3 mt-3 pb-3">
              <div class="info flex justify-around text-white">
                <div>出茂 太郎</div>
                <div
                  class="cursor-pointer hover:underline hover:underline-offset-4"
                  @click="handleLogout"
                >
                  | ログアウト
                </div>
              </div>
            </div>
            <!-- Sidebar Menu -->
            <nav class="mt-2">
              <ul
                class="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li class="nav-item" v-for="item in menu" :key="item.title">
                  <NuxtLink :to="item.link">
                    <div
                      class="flex items-center justify-start gap-x-3 px-3 py-3 text-white hover:bg-[#aaa] hover:opacity-70"
                      :class="{
                        'bg-[#1e4290] text-white':
                          item.link && route.fullPath.includes(item.link),
                      }"
                    >
                      <font-awesome-icon :icon="item.icon" />

                      <p>{{ item.title }}</p>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </Transition>

    <div class="flex items-center justify-center admin-content">
      <main
        class="content-wrapper bg-white mb-10 w-full px-[20px] pb-[10px] pt-[10px]"
        :class="{
          '!ml-0': route.fullPath.includes('/mng/login'),
          'mt-[48px]': !route.fullPath.includes('/mng/login'),

          'w-full ml-0': !sidebar,
        }"
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
  background-color: #343a40;
  box-sizing: border-box;
  padding: 5px 10px;
  border-bottom: 2px solid #fff;
}
.nav-sidebar {
  .nav-link {
    i {
      padding-right: 10px;
    }
    &:hover {
      color: theme("colors.dark");
    }
  }
}

.link-active {
  background-color: #1e4290;
  color: #fff;
  opacity: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 0ms ease-in 0s;
}
.main-header {
  margin-left: 250px;
  width: calc(100% - 250px);
  transition: margin-left 0.3s, width 0.3s;
}
.main-sidebar {
  z-index: 10 !important;
}
</style>
