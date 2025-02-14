<script setup>
import { vOnClickOutside } from "@vueuse/components";

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
import Swal from "sweetalert2";

const form = reactive({
  resignDate: "",
  flectionStatus: [],
  approveStatus: [],
  deadlineDate: "",
  resultDate: "",
  creator: "",
  userName: "",
});
const reports = ref(report);
const changeStatus = ref(false);
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
const delFilterApproveStatus = (status) => {
  form.value.approveStatus = form.value.approveStatus.filter(
    (item) => item !== status
  );
};
const delFilterFlectionStatus = (status) => {
  form.value.flectionStatus = form.value.flectionStatus.filter(
    (item) => item !== status
  );
};
const deleteFile = () => {
  if (selected.value.length === 0) return;
  let options = {
    title: `${selected.value.length}件のファイルを削除しますか？`,
    // text: "外部のサイトに移動しますがよろしいですか？",
    icon: "info",
    iconColor: "#c9dae1",
    showCancelButton: true,
    confirmButtonColor: "#7cd1f9",
    cancelButtonColor: "#efefef",
    confirmButtonText: "はい",
    cancelButtonText: "いいえ",
    reverseButtons: true,
  };
  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
      //  delete
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // cancel
    }
  });
};
const handleChangeStatus = (status) => {
  console.log("handleChangeStatus", status);
};
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
        <div class="flex items-center justify-between">
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
                  v-for="item in form.flectionStatus.slice(0, 3)"
                  :key="item"
                  class="text-[14px] rounded-[5px] px-[5px] mx-[1px]"
                  :class="flectionClass(item)"
                >
                  {{ REFLECTION_STATUS.find((i) => i.value == item)?.label }}
                  <font-awesome-icon
                    class="scale-[0.8] pl-1"
                    @click.stop="delFilterFlectionStatus(item)"
                    icon="circle-xmark"
                  />
                </span>
                <span
                  class="text-[14px] font-semibold text-primary"
                  v-if="form.flectionStatus.length > 3"
                  >他{{ form.flectionStatus.length - 3 }}件</span
                >
              </template>
              <template #content>
                <div class="max-h-[220px] overflow-y-auto">
                  <AdminGroupCheckbox
                    :options="REFLECTION_STATUS"
                    fieldValue="value"
                    fieldLabel="label"
                    v-model="form.flectionStatus"
                  />
                </div>
              </template>
            </SearchItem>
            <SearchItem
              title="承認状況"
              :value="form.approveStatus"
              :callback="handleFilter"
            >
              <template #value>
                <span
                  v-for="item in form.approveStatus.slice(0, 3)"
                  :key="item"
                  class="text-[14px] rounded-[5px] px-[5px] mx-[1px]"
                  :class="approveClass(item)"
                >
                  {{ APPROVE_STATUS.find((i) => i.value == item)?.label }}
                  <font-awesome-icon
                    class="scale-[0.8] pl-1"
                    @click.stop="delFilterApproveStatus(item)"
                    icon="circle-xmark"
                  />
                </span>
                <span
                  class="text-[14px] font-semibold text-primary"
                  v-if="form.approveStatus.length > 3"
                  >他{{ form.approveStatus.length - 3 }}件</span
                >
              </template>
              <template #content>
                <div class="max-h-[220px] overflow-y-auto">
                  <AdminGroupCheckbox
                    :options="APPROVE_STATUS"
                    fieldValue="value"
                    fieldLabel="label"
                    v-model="form.approveStatus"
                  />
                </div>
              </template>
            </SearchItem>
          </div>
          <div>
            <div class="flex gap-x-3">
              <button class="btn btn-outline-primary btn-sm shadow-md">
                DL
              </button>
              <button
                class="btn btn-outline-primary btn-sm shadow-md"
                @click="deleteFile"
              >
                削除
                <font-awesome-icon icon="trash" />
              </button>
              <div class="relative" v-on-click-outside="() => (changeStatus = false)">
                <button class="btn btn-outline-primary btn-sm shadow-md" @click="changeStatus = !changeStatus">
                  ステータス変更
                  <font-awesome-icon icon="chevron-down" />
                </button>
                <div class="absolute top-[30px] right-0 bg-white shadow-md z-[100] w-[133px]" v-if="changeStatus" >
                  <div
                    :class="flectionClass(item.value)"
                    v-for="(item, index) in REFLECTION_STATUS"
                    :key="index + item.value"
                    @click="handleChangeStatus(item.value)"
                    class="text-center cursor-pointer"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <AdminTable
            checkbox
            :headers="dataTable.headers"
            :data="dataTable.data.slice(1, 100)"
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
              <div class="relative group items-center">
                <p class="text-center text-one-line cursor-pointer">
                  {{ data.bldgname || "未設定" }}
                </p>
                <Tooltip v-if="data.bldgname" :content="data.bldgname" />
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
                  <p class="text-center text-one-line cursor-pointer">
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
                class="relative items-center group text-primary hover:underline"
              >
                <p class="text-center text-one-line cursor-pointer">
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
              <div class="w-[80px]">
                <Status
                  :options="REFLECTION_STATUS"
                  :classFn="flectionClass"
                  :value="data.status"
                ></Status>
              </div>
            </template>
            <template #approve_status="{ data }">
              <div class="w-[100px]">
                <Status
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
