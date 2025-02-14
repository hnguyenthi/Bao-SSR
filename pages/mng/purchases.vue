<script setup>
import { STATUS_PURCHASE } from "~/utils/constraints.js";
import { ref, reactive, watch } from "vue";
import purchases from "~/assets/mockData/purchases.json";
import { statusClass } from "~/utils";

const data = ref(purchases.data);
const optionsRegisterTime = ref(purchases.optionsRegisterTime);
const optionsStatus = ref(purchases.optionsStatus);
const optionServices = ref(purchases.optionServices);
const services = ref(purchases.services);
const form = ref({
  optionsRegisterTime: "",
  optionsStatus: [],
  optionServices: [],
});
const dataTable = ref({
  headers: [
    {
      title: "申込日時",
      field: "entry_date",
      sort: true,
      width: "180px",
    },
    {
      title: "オプション",
      field: "option_id",
      sort: true,
      width: "160px",
    },
    {
      title: "名前",
      field: "name",
      sort: true,
      width: "180px",
    },
    {
      title: "メールアドレス",
      field: "mail",
      sort: true,
      width: "240px",
    },
    {
      title: "ログインID",
      field: "loginid",
      sort: true,
      width: "240px",
    },
    {
      title: "ステータス",
      field: "status",
      sort: true,
      width: "190px",
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
// watch(
//   () => form.value,
//   (value) => {
//     getData();
//   },
//   { deep: true }
// );
const callBackService = (item) => {
  form.value.optionServices = form.value.optionServices.filter(
    (i) => i !== item
  );
};
const callBackStatus = (item) => {
  form.value.optionsStatus = form.value.optionsStatus.filter((i) => i !== item);
};
const handleFilter = (value) => {};
</script>

<template>
  <div>
    <!-- <Breadcrumb :breadcrumbs="breadcrumbs" /> -->
    <h3 class="pb-[15px] text-h2 font-normal text-dark mr-3">
      オプション購入履歴　一覧"
    </h3>
    <div class="admin-box">
      <div class="admin-user__statement-list">
        <div>
          <div class="flex items-center justify-between">
            <div class="flex gap-x-3 pb-2">
              <SearchItem
                title="申込年月"
                :value="form.optionsRegisterTime"
                :callback="handleFilter"
              >
                <template #content>
                  <AdminDatePicker
                    monthPicker
                    :isIcon="false"
                    v-model="form.optionsRegisterTime"
                    class="rounded-sm border-[1px] border-solid border-[#ccc]"
                  />
                </template>
              </SearchItem>
              <SearchItem
                title="オプション種類"
                :value="form.optionServices"
                :callback="handleFilter"
              >
                <template #value>
                  <span
                    class=""
                    v-for="item in form.optionServices.slice(0, 3)"
                    :key="item"
                  >
                    <Tag
                      :text="
                        optionServices.find((i) => i.option_id == item)
                          ?.option_display_name
                      "
                      :close="
                        () => {
                          callBackService(item);
                        }
                      "
                    />
                  </span>
                  <span
                    class="text-[14px] font-semibold text-primary"
                    v-if="form.optionServices.length > 3"
                    >他{{ form.optionServices.length - 3 }}件</span
                  >
                </template>
                <template #content>
                  <div class="max-h-[220px] overflow-y-auto">
                    <AdminGroupCheckbox
                      v-model="form.optionServices"
                      :options="optionServices"
                      fieldValue="option_id"
                      fieldLabel="option_display_name"
                    />
                  </div>
                </template>
              </SearchItem>
              <SearchItem
                title="ステータス"
                :value="form.optionsStatus"
                :callback="handleFilter"
              >
                <template #value>
                  <span
                    v-for="item in form.optionsStatus.slice(0, 3)"
                    :key="item"
                    class="text-[14px] rounded-[5px] px-[5px] mx-[1px]"
                    :class="statusClass(item.split(`-`))"
                  >
                    {{
                      STATUS_PURCHASE[item.split(`-`)[0]]?.find(
                        (i) => i.value == item.split(`-`)[1]
                      )?.label
                    }}
                    <font-awesome-icon
                      class="scale-[0.8] pl-1"
                      @click.stop="callBackStatus(item)"
                      icon="circle-xmark"
                    />
                  </span>
                  <span
                    class="text-[14px] font-semibold text-primary"
                    v-if="form.optionsStatus.length > 3"
                    >他{{ form.optionsStatus.length - 3 }}件</span
                  >
                </template>
                <template #content>
                  <div class="max-h-[220px] overflow-y-auto">
                    <AdminGroupCheckbox
                      :options="optionsStatus"
                      fieldValue="value"
                      fieldLabel="option_display_name"
                      v-model="form.optionsStatus"
                    >
                      <template #label="{ data }">
                        {{
                          STATUS_PURCHASE[data.option_id]?.find(
                            (i) => i.value == data.status
                          )?.label
                        }}
                      </template>
                    </AdminGroupCheckbox>
                  </div>
                </template>
              </SearchItem>
              <!-- <SearchItem
                title="ステータス"
                :value="
                  STATUS_PURCHASE[form.optionsStatus.split(`-`)[0]]?.find(
                    (i) => i.value == form.optionsStatus.split(`-`)[1]
                  )?.label
                "
                :callback="handleFilter"
              >
                <template #value>
                  <span
                    class="text-[14px] rounded-[5px] px-[5px]"
                    :class="statusClass(form.optionsStatus.split(`-`))"
                  >
                    {{
                      STATUS_PURCHASE[form.optionsStatus.split(`-`)[0]]?.find(
                        (i) => i.value == form.optionsStatus.split(`-`)[1]
                      )?.label
                    }}
                    <font-awesome-icon
                      class="scale-[0.8] pl-1"
                      @click.stop="
                        () => {
                          form.optionsStatus = '';
                          handleFilter();
                        }
                      "
                      icon="circle-xmark"
                    />
                  </span>
                </template>
                <template #content>
                  <AdminDropdown
                    :options="optionsStatus"
                    fieldValue="value"
                    fieldLabel="option_display_name"
                    v-model="form.optionsStatus"
                  >
                    <template #option="{ data }">
                      <div class="h-full">
                        <p class="text-center">
                          {{
                            STATUS_PURCHASE[data.option_id]?.find(
                              (i) => i.value == data.status
                            )?.label
                          }}
                        </p>
                      </div>
                    </template>
                    <template #active>
                      <div class="h-full">
                        {{
                          STATUS_PURCHASE[
                            form.optionsStatus.split(`-`)[0]
                          ]?.find(
                            (i) => i.value == form.optionsStatus.split(`-`)[1]
                          )?.label
                        }}
                      </div>
                    </template>
                  </AdminDropdown>
                </template>
              </SearchItem> -->
            </div>
            <div class="flex gap-x-3">
              <button class="btn btn-outline-primary btn-sm shadow-md">
                オプションcsv
              </button>
              <button class="btn btn-outline-primary btn-sm shadow-md">
                csvダウンロード
                <font-awesome-icon class="pl-1" icon="file-arrow-down" />
              </button>
              <button class="btn btn-outline-primary btn-sm shadow-md">
                Excelダウンロード
                <font-awesome-icon class="pl-1" icon="file-arrow-down" />
              </button>
            </div>
          </div>
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
                <div class="flex w-full items-center justify-start">
                  <div
                    :class="
                      statusClass([`${data.option_id}`, `${data.status}`])
                    "
                    class="flex py-[2px] px-3 items-center justify-center rounded-full"
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
</style>
