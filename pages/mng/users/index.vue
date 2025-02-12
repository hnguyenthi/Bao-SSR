<script setup>
import {
  STATUS_USER,
  STATUS_USER_TITLE,
  USER_STATUS,
} from "~/utils/constraints.js";
import { ref, watch } from "vue";
import { formatDateYYYYMMDD, userClass } from "~/utils";
import userAdmin from "~/assets/mockData/user-admin.json";

const form = ref({
  resignDate: "",
  status: "",
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
      width: "150px",
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
watch(
  () => form.value,
  (value) => {
    getData();
  },
  { deep: true }
);
const handleFilter = () => {
  console.log("handleFilter");
};
</script>

<template>
  <div>
    <h3 class="pb-[15px] text-h2 font-normal text-dark mr-3">ユーザー管理</h3>
    <div class="admin-box">
      <div class="admin-user__statement-list">
        <!-- <div class="row gap-x-8">
          <div class="form-group">
            <label for="" class="pb-1">開始日:</label>
            <div
              class="input-group date"
              id="reservationdate"
              data-target-input="nearest"
            >
              <AdminDatePicker
                :isIcon="false"
                class="rounded-sm border-[1px] border-solid border-[#ccc]"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="" class="pb-1">終了日:</label>
            <div
              class="input-group date"
              id="reservationdate"
              data-target-input="nearest"
            >
              <AdminDatePicker
                :isIcon="false"
                class="rounded-sm border-[1px] border-solid border-[#ccc]"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="" class="pb-1">ユーザー名:</label>
            <div
              class="input-group date"
              id="reservationdate"
              data-target-input="nearest"
            >
              <input
                required
                type="text"
                class="bg-white focus:border-primary h-[38px] w-[170px] rounded-sm text-[14px] border-[1px] border-solid border-[#ccc] px-[10px] py-[6px]"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-11 gap-3">
          <div class="col-span-3">
            <SelectMulti
              title="登録日"
              :options="userAdmin.optionRegisteredTime"
              v-model="form.resignDate"
              value="regdate"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-between">
                  <div class="w-full text-center">
                    {{ data.regdate }}
                  </div>
                  <div
                    class="item-total w-[45px] rounded-sm bg-[#3276b180] text-center text-[12px]"
                  >
                    {{ data.total }}
                  </div>
                </div>
              </template>
            </SelectMulti>
          </div>
          <div class="col-span-3">
            <SelectMulti
              title="解約日"
              :options="userAdmin.optionCandateTime"
              v-model="form.contractDate"
              value="candate"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-between">
                  <div class="w-full text-center">
                    {{ data.candate }}
                  </div>
                  <div
                    class="item-total w-[45px] rounded-sm bg-[#3276b180] text-center text-[12px]"
                  >
                    {{ data.total }}
                  </div>
                </div>
              </template>
            </SelectMulti>
          </div>
          <div class="col-span-3">
            <SelectMulti
              title="ステータス"
              :options="userAdmin.optionStatus"
              value="status"
              v-model="form.status"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-end">
                  <div class="flex w-full items-center justify-center">
                    <div
                      :class="{
                        'status-new': data.status === STATUS_USER.NEW,
                        'status-waiting-reports':
                          data.status === STATUS_USER.WAITING_REPORT,
                        'status-calculating':
                          data.status === STATUS_USER.CALCULATING,
                        'status-stripe-processing':
                          data.status === STATUS_USER.STRIPE_PROCESSING,
                        'status-waiting-payment':
                          data.status === STATUS_USER.WAITING_PAYMENT,
                        'status-data-reflecting':
                          data.status === STATUS_USER.DATA_REFRESHING,
                        'status-use': data.status === STATUS_USER.USE,
                        'status-cancel-application':
                          data.status === STATUS_USER.CANCEL_APPLICATION,
                        'status-cancel-processing':
                          data.status === STATUS_USER.CANCEL_PROCESSING,
                        'status-cancel': data.status === STATUS_USER.CANCEL,
                        'status-stop': data.status === STATUS_USER.STOP,
                        'status-error': data.status === STATUS_USER.ERROR,
                      }"
                      class="flex h-[30px] w-[130px] items-center justify-center rounded-full text-white"
                    >
                      <div
                        class="m-1 w-full rounded-full text-center font-semibold"
                      >
                        {{ STATUS_USER_TITLE[data.status] }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="item-total w-[45px] rounded-sm bg-[#3276b180] text-center text-[12px]"
                  >
                    {{ data.total }}
                  </div>
                </div>
              </template>
            </SelectMulti>
          </div>
          <div class="col-span-2 flex items-end justify-center pb-10">
            <button class="btn btn-outline-primary w-[170px]">保存</button>
          </div>
        </div> -->
        <div>
          <div class="flex gap-x-3">
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
              <template #content>
                <AdminDropdown
                  :options="USER_STATUS"
                  fieldValue="value"
                  fieldLabel="label"
                  v-model="form.status"
                />
                <!-- <AdminDatePicker
                  :isIcon="false"
                  v-model="form.status"
                  class="rounded-sm border-[1px] border-solid border-[#ccc]"
                /> -->
              </template>
            </SearchItem>
          </div>
          <AdminTable :headers="dataTable.headers" :data="items">
            <template #loginid="{ data }">
              <NuxtLink :to="`/mng/users/${data.id}`">
                <div class="h-full">
                  <p
                    class="cursor-pointer text-left text-primary hover:underline"
                  >
                    {{ data.loginid }}
                  </p>
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
