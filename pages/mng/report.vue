<script setup>
import {
  STATUS_REFLECTION,
  STATUS_REFLECTION_TITLE,
  STATUS_APPROVE,
  STATUS_APPROVE_TITLE,
} from "~/utils/constraints.js";
import { ref, reactive, watch } from "vue";
import report from "~/assets/mockData/attachment.json";
import { formatDateYYYYMMDD, formatDateCustom } from "~/utils";

const form = reactive({
  resignDate: [],
  flectionStatus: [],
  approveStatus: [],
});
const reports = ref(report);
const options = [
  {
    value: "2019/04/09",
    total: 1,
  },
  {
    value: "2019/06/19",
    total: 2,
  },
  {
    value: "2019/04/29",
    total: 3,
  },
  {
    value: "2018/04/09",
    total: 1,
  },
  {
    value: "2018/06/19",
    total: 2,
  },
  {
    value: "2018/04/29",
    total: 3,
  },
  {
    value: "2017/04/09",
    total: 1,
  },
  {
    value: "2017/06/19",
    total: 2,
  },
  {
    value: "2017/04/29",
    total: 3,
  },
  {
    value: "2020/04/09",
    total: 1,
  },
  {
    value: "2020/06/19",
    total: 2,
  },
  {
    value: "2020/04/29",
    total: 3,
  },
];
const optionApprove = [
  {
    label: STATUS_APPROVE_TITLE[STATUS_APPROVE.UN_APPROVED],
    status: STATUS_APPROVE.UN_APPROVED,
    total: 34,
  },
  {
    label: STATUS_APPROVE_TITLE[STATUS_APPROVE.DOC_AWAIT_APPROVE],
    status: STATUS_APPROVE.DOC_AWAIT_APPROVE,
    total: 34,
  },
  {
    label: STATUS_APPROVE_TITLE[STATUS_APPROVE.DOC_APPROVED],
    status: STATUS_APPROVE.DOC_APPROVED,
    total: 2,
  },
  {
    label: STATUS_APPROVE_TITLE[STATUS_APPROVE.ES_AWAIT_APPROVE],
    status: STATUS_APPROVE.ES_AWAIT_APPROVE,
    total: 9,
  },
  {
    label: STATUS_APPROVE_TITLE[STATUS_APPROVE.ES_APPROVED],
    status: STATUS_APPROVE.ES_APPROVED,
    total: 41,
  },
];
const flectionStatus = [
  {
    label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.NOT_REFLECTED],
    status: STATUS_REFLECTION.NOT_REFLECTED,
    total: 34,
  },
  {
    label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.REFLECTING],
    status: STATUS_REFLECTION.REFLECTING,
    total: 34,
  },
  {
    label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.REFLECTED],
    status: STATUS_REFLECTION.REFLECTED,
    total: 2,
  },
  {
    label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.ERROR],
    status: STATUS_REFLECTION.ERROR,
    total: 9,
  },
  {
    label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.NOT_SUBJECT],
    status: STATUS_REFLECTION.NOT_SUBJECT,
    total: 41,
  },
];
const paging = ref({
  itemPerPage: 25,
  totalPage: Math.ceil(report.length / 25),
  currentPage: 1,
});
const classesFlection = (value) => {
  let classStatus = "";
  switch (value) {
    case STATUS_REFLECTION.NOT_REFLECTED:
      classStatus = "refl-status-not-reflect";
      break;
    case STATUS_REFLECTION.REFLECTING:
      classStatus = "refl-status-reflecting";
      break;
    case STATUS_REFLECTION.REFLECTED:
      classStatus = "refl-status-reflected";
      break;
    case STATUS_REFLECTION.ERROR:
      classStatus = "refl-status-error";
      break;

    case STATUS_REFLECTION.NOT_SUBJECT:
      classStatus = "refl-status-notSubject";
      break;
    default:
      break;
  }
  return classStatus;
};
const classesApprove = (value) => {
  let classStatus = "";
  switch (value) {
    case STATUS_APPROVE.UN_APPROVED:
      classStatus = "refl-status-not-reflect";
      break;
    case STATUS_APPROVE.DOC_AWAIT_APPROVE:
      classStatus = "approve-status-pending";
      break;
    case STATUS_APPROVE.DOC_APPROVED:
      classStatus = "refl-status-reflected";
      break;
    case STATUS_APPROVE.ES_AWAIT_APPROVE:
      classStatus = "approve-status-pending";
      break;

    case STATUS_APPROVE.ES_APPROVED:
      classStatus = "refl-status-reflected";
      break;
    default:
      break;
  }
  return classStatus;
};
const dataTable = {
  headers: [
    {
      title: "登録日時",
      field: "upldate",
      sort: true,
      width: "90px",
    },
    {
      title: "ES作成担当者",
      field: "bldgname",
      sort: true,
      width: "100px",
    },
    {
      title: "ES作成期限",
      field: "upldate_day",
      sort: true,
      width: "90px",
    },
    {
      title: "データ反映期限",
      field: "update_day",
      sort: true,
      width: "90px",
    },
    {
      title: "棟",
      field: "filename",
      sort: true,
      width: "180px",
    },
    {
      title: "報告書年月",
      field: "yymm",
      sort: true,
      width: "105px",
    },
    {
      title: "ファイル名",
      field: "file_download",
      sort: true,
      width: "190px",
    },
    {
      title: "ユーザー名",
      field: "user_name",
      sort: true,
      width: "130px",
    },
    {
      title: "反映状況",
      field: "flection_status",
      sort: true,
      width: "150px",
    },
    {
      title: "承認状況",
      field: "approve_status",
      sort: true,
      width: "150px",
    },
    {
      title: "管理者メモ",
      field: "memo",
      sort: true,
    },
  ],
  data: report,
};
const selected = ref([]);
</script>

<template>
  <div>
    <!-- <Breadcrumb :breadcrumbs="breadcrumbs" /> -->
    <PageTitle title="収支報告書　一覧" />
    <div class="admin-box">
      <div class="admin-user__statement-list">
        <div class="row gap-x-8">
          <div class="form-group">
            <label for="" class="pb-1">登録日:</label>
            <div
              class="input-group date flex items-center"
              id="reservationdate"
              data-target-input="nearest"
            >
              <AdminDatePicker
                :isIcon="false"
                class="w-[110px] border-[1px] border-solid border-[#ccc] rounded-sm"
              />
              ～
              <AdminDatePicker
                :isIcon="false"
                class="w-[110px] border-[1px] border-solid border-[#ccc] rounded-sm"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="" class="pb-1">ES作成期限:</label>
            <div
              class="input-group date flex items-center"
              id="reservationdate"
              data-target-input="nearest"
            >
              <AdminDatePicker
                :isIcon="false"
                class="w-[110px] border-[1px] border-solid border-[#ccc] rounded-sm"
              />
              ～
              <AdminDatePicker
                :isIcon="false"
                class="w-[110px] border-[1px] border-solid border-[#ccc] rounded-sm"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="" class="pb-1">データ反映期限:</label>
            <div
              class="input-group date flex items-center"
              id="reservationdate"
              data-target-input="nearest"
            >
              <AdminDatePicker
                :isIcon="false"
                class="w-[110px] border-[1px] border-solid border-[#ccc] rounded-sm"
              />
              ～
              <AdminDatePicker
                :isIcon="false"
                class="w-[110px] border-[1px] border-solid border-[#ccc] rounded-sm"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="" class="pb-1">ES作成担当者:</label>
            <div
              class="input-group date"
              id="reservationdate"
              data-target-input="nearest"
            >
              <input
                required
                type="text"
                class="h-[38px] w-[120px] rounded-sm text-[14px] border-[1px] border-solid border-[#ccc]"
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
                class="px-2 h-[38px] w-[120px] rounded-sm text-[14px] border-[1px] border-solid border-[#ccc]"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-11 gap-3">
          <div class="col-span-3">
            <SelectMulti
              title="登録日"
              :options="options"
              v-model="form.resignDate"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-between">
                  <div class="w-full text-center">
                    {{ data.value }}
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
              title="反映状況"
              :options="flectionStatus"
              v-model="form.flectionStatus"
              value="status"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-end">
                  <div class="flex w-full items-center justify-center">
                    <div
                      :class="classesFlection(data.status)"
                      class="flex h-[35px] w-[100px] items-center justify-center rounded-full p-1 text-white"
                    >
                      <div
                        class="w-full rounded-full border-[1px] border-dashed border-white text-center font-semibold"
                      >
                        {{ data.label }}
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
          <div class="col-span-3">
            <SelectMulti
              title="承認状況"
              :options="optionApprove"
              value="status"
              v-model="form.approveStatus"
            >
              <template #item="{ data }">
                <div class="flex items-center justify-end">
                  <div class="flex w-full items-center justify-center">
                    <div
                      :class="classesApprove(data.status)"
                      class="flex h-[35px] w-[100px] items-center justify-center rounded-full text-white"
                    >
                      <div
                        class="m-1 w-full rounded-full border-[1px] border-dashed border-white text-center font-semibold"
                      >
                        {{ data.label }}
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
            <button class="btn btn-block btn-outline-primary">保存</button>
          </div>
        </div>
        <!-- table -->
        <div>
          <SearchItem
            title="登録日"
            :value="form.startDate"
            :callback="handleFilter"
          >
            <template #content>
              <RangeDate
                classes="w-[110px] border-[1px] border-solid border-[#ccc] rounded-sm"
              />
            </template>
          </SearchItem>
        </div>
        <div>
          <AdminTable
            checkbox
            :headers="dataTable.headers"
            :data="dataTable.data"
            v-model:selected="selected"
          >
            <template #upldate="{ data }">
              <div class="h-full">
                <p class="text-center">
                  {{ data.upldate }}
                </p>
              </div>
            </template>
            <template #bldgname="{ data }">
              <div class="h-full">
                <p class="text-center">
                  {{ data.bldgname || "未設定" }}
                </p>
              </div>
            </template>
            <template #upldate_day="{ data }">
              <div class="h-full">
                <p class="text-center">
                  {{ data.upldate_day }}
                </p>
              </div>
            </template>
            <template #filename="{ data }">
              <div class="h-full">
                <p class="text-center">
                  {{ data.filename.slice(0, data.filename.lastIndexOf(".")) }}
                </p>
              </div>
            </template>
            <template #yymm="{ data }">
              <div class="h-full">
                <p class="text-center">
                  {{ data.yymm || "未設定" }}
                </p>
              </div>
            </template>
            <template #file_download="{ data }">
              <div class="cursor-pointer text-primary hover:underline">
                <p class="text-center">
                  {{
                    data.filename
                      .slice(0, data.filename.lastIndexOf("."))
                      .concat(
                        "報告書",
                        data.filename.slice(
                          data.filename.lastIndexOf("."),
                          data.filename.length
                        )
                      )
                  }}
                </p>
              </div>
            </template>
            <template #name="{ data }">
              <div class="cursor-pointer text-blue-100 hover:underline">
                <p class="text-center">
                  {{ data.name }}
                </p>
              </div>
            </template>
            <template #flection_status="{ data }">
              <div class="h-full">
                <Status
                  :statusValue="STATUS_REFLECTION"
                  :statusTitle="STATUS_REFLECTION_TITLE"
                  :classFn="classesFlection"
                  :value="data.status"
                ></Status>
              </div>
            </template>
            <template #approve_status="{ data }">
              <div class="h-full">
                <Status
                  :statusValue="STATUS_APPROVE"
                  :statusTitle="STATUS_APPROVE_TITLE"
                  :classFn="classesApprove"
                  :value="data.status"
                ></Status>
              </div>
            </template>
            <template #memo>
              <div class="h-full">メモ</div>
            </template>
          </AdminTable>
        </div>
        <!-- footer -->
        <div class="flex justify-end pt-10">
          <button class="btn btn-inline btn-outline-primary w-[170px]">
            保存
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-end pb-20 pt-1">
            <button
                @click="
                    () => {
                        router.get('/admin/top');
                    }
                "
                class="btn btn-block rounded-0 border-1 h-[45px] w-[200px] border-[#5c9ee7] text-[1.6em] text-[#5c9ee7] hover:bg-[#5c9ee7] hover:text-white"
            >
                トップに戻る
            </button>
        </div> -->
  </div>
</template>

<style lang="scss">
.active {
  .item-total {
    color: theme("colors.white");
  }
}
</style>
