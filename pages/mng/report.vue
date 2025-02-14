<script setup>
import {
  STATUS_REFLECTION,
  REFLECTION_STATUS,
  STATUS_APPROVE,
  APPROVE_STATUS,
} from "~/utils/constraints.js";
import { ref, reactive, watch } from "vue";
import report from "~/assets/mockData/attachment.json";
import {
  flectionClass,
  approveClass,
  formatDateYYYYMMDD,
  formatDateCustom,
} from "~/utils";

const form = reactive({
  resignDate: "",
  flectionStatus: null,
  approveStatus: 1,
  deadlineDate: "",
  resultDate: "",
  creator: "",
  userName: "",
});
const reports = ref(report);
// const options = [
//   {
//     value: "2019/04/09",
//     total: 1,
//   },
//   {
//     value: "2019/06/19",
//     total: 2,
//   },
//   {
//     value: "2019/04/29",
//     total: 3,
//   },
//   {
//     value: "2018/04/09",
//     total: 1,
//   },
//   {
//     value: "2018/06/19",
//     total: 2,
//   },
//   {
//     value: "2018/04/29",
//     total: 3,
//   },
//   {
//     value: "2017/04/09",
//     total: 1,
//   },
//   {
//     value: "2017/06/19",
//     total: 2,
//   },
//   {
//     value: "2017/04/29",
//     total: 3,
//   },
//   {
//     value: "2020/04/09",
//     total: 1,
//   },
//   {
//     value: "2020/06/19",
//     total: 2,
//   },
//   {
//     value: "2020/04/29",
//     total: 3,
//   },
// ];
// const optionApprove = [
//   {
//     label: STATUS_APPROVE_TITLE[STATUS_APPROVE.UN_APPROVED],
//     status: STATUS_APPROVE.UN_APPROVED,
//     total: 34,
//   },
//   {
//     label: STATUS_APPROVE_TITLE[STATUS_APPROVE.DOC_AWAIT_APPROVE],
//     status: STATUS_APPROVE.DOC_AWAIT_APPROVE,
//     total: 34,
//   },
//   {
//     label: STATUS_APPROVE_TITLE[STATUS_APPROVE.DOC_APPROVED],
//     status: STATUS_APPROVE.DOC_APPROVED,
//     total: 2,
//   },
//   {
//     label: STATUS_APPROVE_TITLE[STATUS_APPROVE.ES_AWAIT_APPROVE],
//     status: STATUS_APPROVE.ES_AWAIT_APPROVE,
//     total: 9,
//   },
//   {
//     label: STATUS_APPROVE_TITLE[STATUS_APPROVE.ES_APPROVED],
//     status: STATUS_APPROVE.ES_APPROVED,
//     total: 41,
//   },
// ];
// const flectionStatus = [
//   {
//     label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.NOT_REFLECTED],
//     status: STATUS_REFLECTION.NOT_REFLECTED,
//     total: 34,
//   },
//   {
//     label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.REFLECTING],
//     status: STATUS_REFLECTION.REFLECTING,
//     total: 34,
//   },
//   {
//     label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.REFLECTED],
//     status: STATUS_REFLECTION.REFLECTED,
//     total: 2,
//   },
//   {
//     label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.ERROR],
//     status: STATUS_REFLECTION.ERROR,
//     total: 9,
//   },
//   {
//     label: STATUS_REFLECTION_TITLE[STATUS_REFLECTION.NOT_SUBJECT],
//     status: STATUS_REFLECTION.NOT_SUBJECT,
//     total: 41,
//   },
// ];
const paging = ref({
  itemPerPage: 25,
  totalPage: Math.ceil(report.length / 25),
  currentPage: 1,
});

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
      width: "130px",
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
const handleFilter = () => {
  console.log("handleFilter");
};
</script>

<template>
  <div>
    <!-- <Breadcrumb :breadcrumbs="breadcrumbs" /> -->
    <h3 class="pb-[15px] text-h2 font-normal text-dark mr-3">
      収支報告書　一覧
    </h3>
    <div class="admin-box">
      <div class="admin-user__statement-list">
        <!-- table -->
        <div class="flex gap-x-3 pb-2">
          <SearchItem
            title="登録日"
            :value="form.resignDate"
            :callback="handleFilter"
          >
            <template #content>
              <RangeDate
                v-model="form.resignDate"
                classes="border-[1px] border-solid border-[#ccc] rounded-sm"
              />
            </template>
          </SearchItem>
          <SearchItem
            title="ES作成期限"
            :value="form.deadlineDate"
            :callback="handleFilter"
          >
            <template #content>
              <RangeDate
                v-model="form.deadlineDate"
                classes=" border-[1px] border-solid border-[#ccc] rounded-sm"
              />
            </template>
          </SearchItem>
          <SearchItem
            title="データ反映期限"
            :value="form.resultDate"
            :callback="handleFilter"
          >
            <template #content>
              <RangeDate
                v-model="form.resultDate"
                classes="border-[1px] border-solid border-[#ccc] rounded-sm"
              />
            </template>
          </SearchItem>
          <SearchItem
            title="ES作成担当者"
            :value="form.creator"
            :callback="handleFilter"
          >
            <template #content>
              <input
                v-model="form.creator"
                class="form-control bg-white rounded-sm !border-end-1 mr-[2px] text-[14px] !h-[30px]"
              />
            </template>
          </SearchItem>
          <SearchItem
            title="ユーザー名"
            :value="form.userName"
            :callback="handleFilter"
          >
            <template #content>
              <input
                v-model="form.userName"
                class="form-control bg-white rounded-sm !border-end-1 mr-[2px] text-[14px] !h-[30px]"
              />
            </template>
          </SearchItem>
          <SearchItem
            title="反映状況"
            :value="form.flectionStatus"
            :callback="handleFilter"
          >
            <template #value>
              <span
                class="text-[14px] rounded-[5px] px-[5px]"
                :class="flectionClass(form.flectionStatus)"
              >
                {{
                  REFLECTION_STATUS.find(
                    (item) => item.value == form.flectionStatus
                  )?.label
                }}
                <font-awesome-icon
                  class="scale-[0.8] pl-1"
                  @click.stop="
                    () => {
                      form.flectionStatus = null;
                      handleFilter();
                    }
                  "
                  icon="circle-xmark"
                />
              </span>
            </template>
            <template #content>
              <AdminDropdown
                :options="REFLECTION_STATUS"
                fieldValue="value"
                fieldLabel="label"
                v-model="form.flectionStatus"
              />
            </template>
          </SearchItem>
          <SearchItem
            title="承認状況"
            :value="form.approveStatus"
            :callback="handleFilter"
          >
            <template #value>
              <span
                class="text-[14px] rounded-[5px] px-[5px]"
                :class="approveClass(form.approveStatus)"
              >
                {{
                  APPROVE_STATUS.find(
                    (item) => item.value == form.approveStatus
                  )?.label
                }}
                <font-awesome-icon
                  class="scale-[0.8] pl-1"
                  @click.stop="
                    () => {
                      form.approveStatus = null;
                      handleFilter();
                    }
                  "
                  icon="circle-xmark"
                />
              </span>
            </template>
            <template #content>
              <AdminDropdown
                :options="APPROVE_STATUS"
                fieldValue="value"
                fieldLabel="label"
                v-model="form.approveStatus"
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
                <div class="relative group items-center">
                  <p class="text-center text-one-line ">
                    {{ data.filename.slice(0, data.filename.lastIndexOf(".")) }}
                     <Tooltip
                    :content="
                      data.filename.slice(0, data.filename.lastIndexOf(`.`))
                    "
                  />
                  </p>
                 
                </div>
              </div>
            </template>
            <template #yymm="{ data }">
              <div class="h-full">
                <p class="text-center">
                  {{ formatDateCustom(data.yymm, "YYYY/MM") || "未設定" }}
                </p>
              </div>
            </template>
            <template #file_download="{ data }">
              <div
                class="relative items-center group cursor-pointer text-primary hover:underline"
              >
                <p class="text-center text-one-line">
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
                   <Tooltip
                    :content="
                      data.filename
                      .slice(0, data.filename.lastIndexOf(`.`))
                      .concat(
                        `報告書`,
                        data.filename.slice(
                          data.filename.lastIndexOf(`.`),
                          data.filename.length
                        )
                      )
                    "
                  />
                </p>
              </div>
            </template>
            <template #name="{ data }">
              <div class="cursor-pointer text-blue-100 hover:underline">
                <p class="text-center text-one-line">
                  {{ data.name }}
                </p>
              </div>
            </template>
            <template #flection_status="{ data }">
              <div class="h-full">
                <Status
                  class="w-[80px]"
                  :options="REFLECTION_STATUS"
                  :classFn="flectionClass"
                  :value="data.status"
                ></Status>
              </div>
            </template>
            <template #approve_status="{ data }">
              <div class="h-full">
                <Status
                  class="w-[100px]"
                  :options="APPROVE_STATUS"
                  :classFn="approveClass"
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
