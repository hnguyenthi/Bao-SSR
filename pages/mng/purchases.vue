<script setup>
import { STATUS_PURCHASE } from "~/utils/constraints.js";
import { ref, reactive, watch } from "vue";
import purchases from "~/assets/mockData/purchases.json";

const data = ref(purchases.data);
const optionsRegisterTime = ref(purchases.optionsRegisterTime);
const optionsStatus = ref(purchases.optionsStatus);
const optionServices = ref(purchases.optionServices);
const services = ref(purchases.services);
const form = ref({
  optionsRegisterTime: [],
  optionsStatus: [],
  optionServices: [],
});
const dataTable = ref({
  headers: [
    {
      title: "申込日時",
      field: "entry_date",
      sort: true,
      width: "120px",
    },
    {
      title: "オプション",
      field: "option_id",
      sort: true,
      width: "120px",
    },
    {
      title: "名前",
      field: "name",
      sort: true,
      width: "130px",
    },
    {
      title: "メールアドレス",
      field: "mail",
      sort: true,
      width: "130px",
    },
    {
      title: "ログインID",
      field: "loginid",
      sort: true,
      width: "120px",
    },
    {
      title: "ステータス",
      field: "status",
      sort: true,
      width: "145px",
    },
    {
      title: "管理者メモ",
      field: "mng_memo",
      sort: true,
    },
  ],
  data: data,
});
const items = ref(data);
const getData = () => {
  items.value = data.value.filter((item) => {
    let isRegister = true;
    let isServices = true;
    let isStatus = true;

    if (form.value.optionsRegisterTime.length > 0) {
      isRegister = form.value.optionsRegisterTime.includes(item.entry_month);
    }
    if (form.value.optionServices.length > 0) {
      isServices = form.value.optionServices.includes(item.option_id);
    }
    if (form.value.optionsStatus.length > 0) {
      isStatus = form.value.optionsStatus.includes(
        `${item.option_id}-${item.status}`
      );
    }
    return isStatus && isRegister && isServices;
  });
};
watch(
  () => form.value,
  (value) => {
    getData();
  },
  { deep: true }
);
</script>

<template>
  <div>
    <!-- <Breadcrumb :breadcrumbs="breadcrumbs" /> -->
    <PageTitle title="オプション購入履歴　一覧" />

    <div class="admin-box">
      <div class="admin-user__statement-list">
        <div class="grid grid-cols-11 gap-3">
          <div class="col-span-3">
            <!-- <SelectMulti
              title="申込年月"
              :options="optionsRegisterTime"
              value="entry_month"
              v-model="form.optionsRegisterTime"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-between">
                  <div class="w-full text-center">
                    {{ data.entry_month }}
                  </div>
                  <div
                    class="item-total w-[45px] rounded-sm bg-[#3276b180] text-center text-[12px]"
                  >
                    {{ data.total }}
                  </div>
                </div>
              </template>
            </SelectMulti> -->
            <AdminSelectMulti
              title="申込年月"
              :options="optionsRegisterTime"
              value="entry_month"
              v-model="form.optionsRegisterTime"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-between w-full">
                  <div class="w-full text-center">
                    {{ data.entry_month }}
                  </div>
                  <div
                    class="item-total w-[45px] rounded-sm bg-[#3276b180] text-center text-[12px]"
                  >
                    {{ data.total }}
                  </div>
                </div>
              </template>
              <template #tag="{ data }">
                <div
                  class="min-w-[100px] flex items-center justify-between px-2 active"
                >
                  <div class="w-full text-left">
                    {{ data.entry_month }}
                  </div>
                  <div
                    class="item-total w-[35px] rounded-sm bg-white text-center text-[12px]"
                  >
                    {{ data.total }}
                  </div>
                </div>
              </template>
            </AdminSelectMulti>
          </div>
          <div class="col-span-3">
            <SelectMulti
              title="オプション種類"
              :options="optionServices"
              value="option_id"
              v-model="form.optionServices"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-between">
                  <div class="w-full text-center">
                    {{ data.option_display_name }}
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
              :options="optionsStatus"
              value="value"
              v-model="form.optionsStatus"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-end">
                  <div class="flex w-full items-center justify-center">
                    <div
                      :class="{
                        'status-entry-settled':
                          STATUS_PURCHASE[data.option_id].length === 3 &&
                          data.status == 1,
                        'status-report-creating':
                          STATUS_PURCHASE[data.option_id].length == 3 &&
                          data.status == 2,
                        'status-report-delivered':
                          STATUS_PURCHASE[data.option_id].length == 3 &&
                          data.status == 3,

                        'status-passed-customers':
                          STATUS_PURCHASE[data.option_id].length == 4 &&
                          data.status === 1,
                        'status-CBIT-Matched':
                          STATUS_PURCHASE[data.option_id].length === 4 &&
                          data.status === 2,
                        'status-GoldKey-Matched':
                          STATUS_PURCHASE[data.option_id].length === 4 &&
                          data.status === 3,
                        'status-Purchased':
                          STATUS_PURCHASE[data.option_id].length === 4 &&
                          data.status === 4,
                      }"
                      class="flex h-[35px] w-[130px] items-center justify-center rounded-full text-white"
                    >
                      {{
                        STATUS_PURCHASE[data.option_id].find(
                          (i) => i.value === data.status
                        )?.label
                      }}
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
            <div class="w-full pl-10">
              <button class="btn btn-block btn-outline-primary">
                オプションcsv
              </button>
              <button class="btn btn-block btn-outline-primary">
                csvダウンロード
              </button>
              <button class="btn btn-block btn-outline-primary">
                Excelダウンロード
              </button>
              <button class="btn btn-block btn-outline-primary">保存</button>
            </div>
          </div>
        </div>
        <div>
          <AdminTable :headers="dataTable.headers" :data="items">
            <template #option_id="{ data }">
              <div class="h-full">
                <NuxtLink
                  to="/mng/optionDetail"
                  class="text-center text-primary hover:underline"
                >
                  {{
                    services.find((i) => i.option_id === data.option_id)
                      ?.option_display_name
                  }}
                </NuxtLink>
              </div>
            </template>
            <template #loginid="{ data }">
              <Link :href="`/admin/users/${data.id}`">
                <div class="h-full">
                  <p
                    class="text-lft cursor-pointer text-primary hover:underline"
                  >
                    {{ data.loginid }}
                  </p>
                </div>
              </Link>
            </template>
            <template #status="{ data }">
              <div class="">
                <div class="flex w-full items-center justify-center">
                  <div
                    :class="{
                      'status-entry-settled':
                        STATUS_PURCHASE[data.option_id].length === 3 &&
                        data.status == 1,
                      'status-report-creating':
                        STATUS_PURCHASE[data.option_id].length == 3 &&
                        data.status == 2,
                      'status-report-delivered':
                        STATUS_PURCHASE[data.option_id].length == 3 &&
                        data.status == 3,

                      'status-passed-customers':
                        STATUS_PURCHASE[data.option_id].length == 4 &&
                        data.status === 1,
                      'status-CBIT-Matched':
                        STATUS_PURCHASE[data.option_id].length === 4 &&
                        data.status === 2,
                      'status-GoldKey-Matched':
                        STATUS_PURCHASE[data.option_id].length === 4 &&
                        data.status === 3,
                      'status-Purchased':
                        STATUS_PURCHASE[data.option_id].length === 4 &&
                        data.status === 4,
                    }"
                    class="flex h-[35px] w-[140px] items-center justify-center rounded-full text-white"
                  >
                    {{
                      STATUS_PURCHASE[data.option_id].find(
                        (i) => i.value === data.status
                      )?.label
                    }}
                  </div>
                </div>
              </div>
            </template>
            <template #changed_plan="{ data }">
              <div class="h-full">
                <p class="text-center">
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
        <div class="flex justify-end pt-10">
          <button class="btn btn-outline-primary w-[170px]">保存</button>
        </div>
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
.status-passed-customers {
  color: #fff;
  background-color: #4a92ce;
}

.status-entry-settled,
.status-report-creating,
.status-CBIT-Matched,
.status-GoldKey-Matched {
  color: rgb(197, 137, 26) !important;
  background-color: #fcee27;
}

.status-report-delivered,
.status-Purchased {
  background-color: #41ad41;
  color: #fff;
}

// .status-passed-customers,
// .status-Purchased {

// 	padding: 1px 48px !important;
// }

// .status-CBIT-Matched {
// 	padding: 1px 28px !important;
// }

// .status-GoldKey-Matched,
// .status-entry-settled,
// .status-report-creating,
// .status-report-delivered {
// 	padding: 1px 16px !important;
// }
</style>
