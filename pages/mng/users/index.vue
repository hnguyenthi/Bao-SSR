<script setup>
import { USER_STATUS } from "~/utils/constraints.js";
import { ref, watch } from "vue";
import { formatDateYYYYMMDD, userClass } from "~/utils";
import userAdmin from "~/assets/mockData/user-admin.json";

const form = ref({
  resignDate: "",
  status: [],
  contractDate: "",
  startDate: "",
  endDate: "",
  username: "",
});

const dataTable = {
  headers: [
    {
      title: "登録日",
      field: "regdate",
      sort: true,
      width: "140px",
    },
    {
      title: "解約日",
      field: "candate",
      sort: true,
      width: "140px",
    },
    {
      title: "ログインID",
      field: "loginid",
      sort: true,
      width: "200px",
    },
    {
      title: "名前",
      field: "name",
      sort: true,
      width: "150px",
    },
    {
      title: "未反映収支報告書",
      field: "reportcnt",
      sort: true,
      width: "170px",
    },
    {
      title: "ステータス",
      field: "status",
      sort: true,
      width: "130px",
    },
    {
      title: "プラン",
      field: "changed_plan",
      sort: true,
      width: "140px",
    },
    {
      title: "管理者メモ",
      field: "mng_memo",
      sort: true,
    },
  ],
};
const items = ref(userAdmin.data);
const getData = () => {
  items.value = userAdmin.data.filter((item) => {
    let isResignDate = true;
    let isContractDate = true;
    let isStatus = true;

    if (form.value.resignDate.length > 0) {
      isResignDate = form.value.resignDate.includes(item.regdate);
    }
    if (form.value.contractDate.length > 0) {
      isContractDate = form.value.contractDate.includes(item.candate);
    }
    if (form.value.status.length > 0) {
      isStatus = form.value.status.includes(item.status);
    }
    return isStatus && isResignDate && isContractDate;
  });
};
// watch(
//   () => form.value,
//   (value) => {
//     getData();
//   },
//   { deep: true }
// );
const delFilterStatus = (status) => {
  form.value.status = form.value.status.filter((item) => item !== status);
};
const handleFilter = () => {
  console.log("handleFilter");
};
</script>

<template>
  <div>
    <h3 class="pb-[15px] text-h2 font-normal text-dark mr-3">ユーザー管理</h3>
    <div class="admin-box">
      <div class="admin-user__statement-list">
        <div>
          <div class="flex gap-x-3 pb-2">
            <SearchItem
              title="開始日"
              :value="form.startDate"
              :callback="handleFilter"
            >
              <template #content>
                <AdminDatePicker
                  :isIcon="false"
                  v-model="form.startDate"
                  class="rounded-sm border-[1px] border-solid border-[#ccc]"
                />
              </template>
            </SearchItem>
            <SearchItem
              title="終了日"
              :value="form.endDate"
              :callback="handleFilter"
            >
              <template #content>
                <AdminDatePicker
                  :isIcon="false"
                  v-model="form.endDate"
                  class="rounded-sm border-[1px] border-solid border-[#ccc]"
                />
              </template>
            </SearchItem>
            <SearchItem
              title="ユーザー名"
              :value="form.username"
              :callback="handleFilter"
            >
              <template #content>
                <input
                  v-model="form.username"
                  class="form-control bg-white rounded-sm !border-end-1 mr-[2px] text-[14px] !h-[30px]"
                />
              </template>
            </SearchItem>
            <SearchItem
              title="登録日"
              :value="form.resignDate"
              :callback="handleFilter"
            >
              <template #content>
                <AdminDatePicker
                  :isIcon="false"
                  v-model="form.resignDate"
                  class="rounded-sm border-[1px] border-solid border-[#ccc]"
                />
              </template>
            </SearchItem>
            <SearchItem
              title="解約日"
              :value="form.candate"
              :callback="handleFilter"
            >
              <template #content>
                <AdminDatePicker
                  :isIcon="false"
                  v-model="form.candate"
                  class="rounded-sm border-[1px] border-solid border-[#ccc]"
                />
              </template>
            </SearchItem>
            <SearchItem
              title="ステータス"
              :value="form.status"
              :callback="handleFilter"
            >
              <template #value>
                <span
                  v-for="item in form.status.slice(0, 3)"
                  :key="item"
                  class="text-[14px] rounded-[5px] px-[5px] mx-[1px]"
                  :class="userClass(item)"
                >
                  {{ USER_STATUS.find((i) => i.value == item)?.label }}
                  <font-awesome-icon
                    class="scale-[0.8] pl-1"
                    @click.stop="delFilterStatus(item)"
                    icon="circle-xmark"
                  />
                </span>
                <span
                  class="text-[14px] font-semibold text-primary"
                  v-if="form.status.length > 3"
                  >他{{ form.status.length - 3 }}件</span
                >
              </template>
              <template #content>
                <div class="max-h-[220px] overflow-y-auto">
                  <AdminGroupCheckbox
                    :options="USER_STATUS"
                    fieldValue="value"
                    fieldLabel="label"
                    v-model="form.status"
                  />
                </div>
              </template>
            </SearchItem>
          </div>
          <AdminTable :headers="dataTable.headers" :data="items">
            <template #loginid="{ data }">
              <NuxtLink :to="`/mng/users/edit?id=${data.id}`">
                <div class="h-full relative group">
                  <p
                    class="cursor-pointer text-left text-primary hover:underline"
                  >
                    {{ data.loginid }}
                  </p>
                  <Tooltip :content="data.loginid" />
                </div>
              </NuxtLink>
            </template>
            <template #reportcnt="{ data }">
              <div class="h-full">
                <p class="text-center">{{ data.reportcnt }}件</p>
              </div>
            </template>
            <template #status="{ data }">
              <div class="">
                <div class="flex w-full items-center justify-start">
                  <div
                    :class="userClass(data.status)"
                    class="flex py-[2px] w-[80px] items-center justify-start rounded-[5px] text-white"
                  >
                    <P class="w-full text-center font-normal text-[14px]">
                      {{
                        USER_STATUS.find((v) => v.value === data.status)?.label
                      }}
                    </P>
                  </div>
                </div>
              </div>
            </template>
            <template #changed_plan="{ data }">
              <div class="h-full">
                <p class="text-left">
                  {{ data.changed_plan ? "" : "フリー" }}
                </p>
              </div>
            </template>
            <template #mng_memo>
              <div>
                <div class="max-w-[100px]">メモ</div>
              </div>
            </template>
          </AdminTable>
        </div>
        <!-- footer -->
        <!-- <div class="flex justify-end pt-10">
          <button class="btn btn-outline-primary w-[170px]">保存</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.active {
  .item-total {
    color: theme("colors.white");
  }
}
</style>
