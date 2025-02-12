<script setup>
import { ref, useTemplateRef, watch } from "vue";
import Swal from "sweetalert2";
import { formatDateYYYYMMDD } from "~/utils";
import users from "~/assets/mockData/userNew.json";
const emitter = useEmitter();
const router = useRouter();
const breadcrumbs = [
  // { title: 'トップ', link: '/admin/top' },
  { title: "お知らせ管理", link: "/mng/news" },
  {
    title: "お知らせ編集",
    link: "/mng/news/edit",
  },
];
const headers = [
  {
    title: "ID",
    field: "id",
    sort: true,
    width: "50px",
  },
  {
    title: "氏名",
    field: "name",
    sort: true,
    width: "250px",
  },
  {
    title: "ログインID",
    field: "loginid",
    sort: true,
    width: "190px",
  },
];
const input = useTemplateRef("input");
const selected = ref([]);
const userAdded = ref([]);

const isShowListUsers = ref(false);

const handleAdd = () => {
  userAdded.value = selected.value;
};
const handleRemoveUser = (user) => {
  userAdded.value = userAdded.value.filter((u) => u.id !== user.id);
  selected.value = selected.value.filter((u) => u.id !== user.id);
};
const handleDelete = () => {
  let options = {
    title: "このお知らせを削除してもよろしいですか？",
    icon: "info",
    iconColor: "#c9dae1",
    showCancelButton: true,
    confirmButtonColor: "#7cd1f9",
    cancelButtonColor: "#ccc",
    confirmButtonText: "削除",
    cancelButtonText: "取消",
    reverseButtons: true,
  };
  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      localStorage?.removeItem("newData");
    }
  });
};
const data = ref(
  false
    ? JSON.parse(localStorage?.getItem("newData"))
    : {
        title: "（未設定）",
        active: 0,
        category: 0,
        regdate: formatDateYYYYMMDD(new Date().toISOString()),
        startdt: formatDateYYYYMMDD(new Date().toISOString()),
        enddt: formatDateYYYYMMDD(new Date().toISOString()),
        contents: "",
        public: 1,
      }
);
watch(
  data.value,
  (value) => {
    console.log(value);
  },
  { deep: true }
);
const handleConfirm = () => {
  localStorage?.setItem(
    "newData",
    JSON.stringify({ ...data.value, type: "create" })
  );
  router.push("/mng/news/confirm");
};
const handlePreview = () => {
    const chanel = new BroadcastChannel('preview-new');
    window.open('/news?mode=preview', '_blank');
    setTimeout(() => {
    chanel.postMessage(JSON.stringify(data.value)); 
    }, 100);
    clearTimeout();
}

</script>
<template>
  <div class="mb-14">
    <AdminBreadcrumb :breadcrumbs="breadcrumbs" />
    <div class="admin-box">
      <div class="form-news">
        <!-- form -->
        <div class="pb-4">
          <button type="button" class="btn btn-outline-primary flex">
            <div
              class="flex items-center justify-center gap-x-1"
              @click="handlePreview"
            >
              <span>プレビュー</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon scale-150"
                style="
                  width: 1em;
                  height: 1em;
                  vertical-align: middle;
                  fill: currentColor;
                  overflow: hidden;
                "
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path
                  d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"
                />
                <path
                  d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z"
                />
              </svg>
            </div>
          </button>
        </div>
        <div class="grid grid-cols-1 gap-x-20 gap-y-2">
          <div class="col-span-1">
            <AdminTextInput label="タイトル"  v-model="data.title"/>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-x-20 gap-y-2">
          <div class="">
            <AdminDropdown
              label="状態"
              :options="[{ value: '公開' }, { value: '未公開' }]"
              v-model="data.active"
            />
          </div>
          <div>
            <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
              <div>
                <p for="" class="pb-1 text-[18px] font-normal text-dark">
                  登録日
                </p>
              </div>
            </label>
            <AdminDatePicker
              v-model="data.regdate"
              class="rounded-sm border-[1px] border-solid border-[#ccc]"
              label="登録日"
            />
          </div>

          <div>
            <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
              <div>
                <p for="" class="pb-1 text-[18px] font-normal text-dark">
                  公開開始日
                </p>
              </div>
            </label>
            <AdminDatePicker
              v-model="data.startdt"
              class="rounded-sm border-[1px] border-solid border-[#ccc]"
              label="登録日"
            />
          </div>
          <div>
            <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
              <div>
                <p for="" class="pb-1 text-[18px] font-normal text-dark">
                  公開終了日
                </p>
              </div>
            </label>
            <AdminDatePicker
              v-model="data.enddt"
              class="rounded-sm border-[1px] border-solid border-[#ccc]"
              label="登録日"
            />
          </div>
        </div>
        <div class="pt-3">
          <Editor label="内容" v-model="data.contents" />
        </div>
        <div class="pt-3" v-if="data.attachfiles && data.attachfiles.length">
          <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
            <div>
              <p for="" class="text-[18px] font-normal text-dark">
                添付済ファイル
              </p>
            </div>
          </label>
          <div>
            <!-- リスト ファイル-->
          </div>
        </div>
        <div class="pt-3">
          <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
            <div>
              <p for="" class="text-[18px] font-normal text-dark">
                添付済ファイル追加
              </p>
            </div>
          </label>
          <AdminUploadFile />
          <div>
            <!-- リスト ファイル-->
          </div>
        </div>
        <div class="mt-3">
          <div class="flex gap-x-10">
            <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
              <div>
                <p for="" class="text-[18px] font-normal text-dark">カテゴリ</p>
              </div>
            </label>
            <div class="!border-1 !border-solid !border-[#ccc]">
              <select name="category" v-model="data.category" class="category">
                <option value="0" selected="">通常</option>
                <option value="1">イベント</option>
                <option value="2">アップデート</option>
              </select>
            </div>
          </div>
          <div class="relative flex justify-start items-start mt-3 gap-x-10">
            <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
              <div>
                <p for="" class="text-[18px] font-normal text-dark">
                  公開対象ユーザー
                </p>
              </div>
            </label>
            <div class="">
              <div class="px-3 gap-x-6 flex items-start justify-start">
                <div class="flex items-center justify-start gap-x-3">
                  <input
                    type="radio"
                    name="allusers"
                    :value="1"
                    v-model="data.public"
                  />
                  <div>全ユーザー</div>
                </div>
                <div class="flex h-[30px] items-center justify-start">
                  <div class="flex items-center justify-start gap-x-3">
                    <input
                      type="radio"
                      name="allusers"
                      :value="0"
                      v-model="data.public"
                    />
                    <div class="">個別選択</div>
                  </div>
                  <button
                    class="ml-3 btn btn-inline btn-outline-primary btn-sm"
                    id="adduser"
                    @click="
                      () => {
                        isShowListUsers = !isShowListUsers;
                      }
                    "
                    v-show="data.public === 0"
                  >
                    追加
                  </button>
                </div>
                <div>
                  <div>
                    <ul>
                      <li v-for="user in userAdded" :key="user.id" class="pb-1">
                        <div class="flex items-center justify-start gap-x-2">
                          <button
                            @click="handleRemoveUser(user)"
                            class="ml-3 btn btn-outline-primary btn-sm"
                          >
                            削除
                          </button>
                          <div>{{ user.name }}[{{ user.loginid }}]</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <ListPopup
                    v-model:show="isShowListUsers"
                    :handleAdd="handleAdd"
                    title="ユーザ選択"
                  >
                    <AdminTable
                      v-model:selected="selected"
                      checkbox=""
                      :headers="headers"
                      :data="users"
                    />
                  </ListPopup>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- button -->
        <div class="flex items-center justify-between gap-x-4 pt-3">
          <button
            @click="handleDelete"
            class="btn btn-inline btn-outline-primary btn-sm"
          >
            削除する
          </button>
          <button
            @click="handleConfirm"
            class="ml-3 btn btn-inline btn-outline-primary btn-sm"
          >
            確認する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.new-item {
  background-color: theme("colors.primary");
  color: theme("colors.white");
  padding: 10px 10px;
  text-align: center;
  font-size: 14px;
}

.form-news {
  input[type="text"] {
    border: none;
    height: 28px;
    font-size: 16px;
  }
}

td,
tr {
  border: 1px solid #000;
}
.category {
  border: 1px solid #ccc;
  border-radius: theme("borderRadius.sm");
  &:focus,
  &:focus-visible {
    border: 1px solid #ccc !important;
  }
}
</style>
