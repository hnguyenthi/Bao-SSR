<script setup>
const router = useRouter();
const breadcrumbs = [
  { title: "オプション購入履歴", link: "/mng/purchases" },
  { title: "オプション申込詳細 確認", link: "" },
];
const form = ref([
  {
    title: "申込日時",
    value: "2024/12/12 18:16:58",
  },
  {
    title: "購入者氏名",
    value: "出茂太郎",
  },
  {
    title: "購入者ログインID",
    value: "cbitdemo",
  },
  {
    title: "製品名",
    value: "プチ宅unit（アナログキー）",
  },
  {
    title: "ご希望のプランを選択してください",
    value: "②現調・見積",
  },
  {
    title: "電話番号",
    value: "123456789",
  },
  {
    title: "メールアドレス",
    value: "test@gmail.com",
  },
  {
    title: "検討希望物件住所",
    value: "希望",
  },
]);
</script>
<template>
  <div>
    <AdminBreadcrumb :breadcrumbs="breadcrumbs" />
    <PageTitle title="申込内容" />
    <div class="admin-box">
      <div
        v-for="item in form"
        :key="item.title"
        class="relative border-2 border-solid border-[#bdbdbd] rounded-[8px] px-14 py-6 mb-5" 
      >
        <div class="absolute -top-1/2 translate-y-1/2 left-[15px] bg-white px-3 text-[22px]">
          {{ item.title }}
        </div>
        <div class="text-[20px]">{{ item.value }}</div>
      </div>
    </div>
    <div class="flex justify-end">
        <button class="btn btn-outline-primary w-fit px-3" @click="router.push('/mng/purchases')">
            <span>
                {{ `<< 一覧に戻る` }}
            </span>
        </button>
    </div>
  </div>
</template>