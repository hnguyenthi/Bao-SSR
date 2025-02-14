<script setup>
import {

  STATUS_PURCHASE,
  STATUS_REFLECTION,
  STATUS_APPROVE,
  APPROVE_STATUS,
  REFLECTION_STATUS,
  USER_STATUS
} from "~/utils/constraints.js";
import { formatPrice, formatDateYYYYMMDD, formatDateCustom, userClass, flectionClass, approveClass } from "~/utils";

import { computed, watch, ref, reactive, useTemplateRef } from "vue";
import userDetail from "~/assets/mockData/user-detail.json";

const breadcrumbs = [
  { title: "ユーザー管理", link: "/mng/users" },
  { title: "ユーザー詳細", link: "" },
];
const isShowListSpot = ref(false);
const selectedSpot = ref([]);
const spotAdded = ref([]);
const isShowListPlan = ref(false);
const selectedPlan = ref([]);
const planAdded = ref([]);
const isShowListCoupon = ref(false);
const selectedCoupon = ref([]);
const couponAdded = ref([]);
const input = useTemplateRef("input");
const userInfor = ref(userDetail);

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
const handleAddHouse = () => {
  userInfor.value.listHouse.push({
    name: "",
    house: "",
  });
};
const handleDeleteHouse = (index) => {
  userInfor.value.listHouse.splice(index, 1);
};

const planHeaders = [
  { title: "プラン名", field: "name", sort: false, width: "220px" },
  { title: "申込日", field: "name", sort: false, width: "220px" },
  { title: "期間", field: "name", sort: false, width: "220px" },
];

const handleRemovePlan = (data) => {
  planAdded.value = planAdded.value.filter((item) => item.pid !== data.pid);
};

const totalPrice = computed(() => {
  return [...userDetail.spotAdded.value, ...planAdded.value].reduce(
    (acc, cur) => acc + cur.quality * cur.unit_price,
    0
  );
});
const tax = computed(() => {
  return totalPrice.value * 0.1;
});

const preventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const handleDrop = (e) => {
  e.preventDefault();

  const files = e.dataTransfer.files;

  if (files.length) {
    input.files = files;
    // upload file
  }
};
const expanded = ref(true);
</script>
<template>
  <div>
    <AdminBreadcrumb :breadcrumbs="breadcrumbs" />
    <div class="admin-box">
      <div class="detail-user__content">
        <div class="grid grid-cols-3 gap-x-28">
          <div>
            <AdminTextInput label="ログインID" />
          </div>
          <div>
            <div>
              <p for="" class="pb-2 text-[18px] font-normal text-dark">
                ステータス
              </p>
            </div>
            <div class="w-[100px]">
              <Status
                :options="USER_STATUS"
                :classFn="userClass"
                v-model="userDetail.listFields.status"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-28">
          <div>
            <AdminTextInput label="姓" />
          </div>
          <div>
            <AdminTextInput label="名" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-28">
          <div>
            <AdminTextInput label="性（フリガナ）" />
          </div>
          <div>
            <AdminTextInput label="名（フリガナ）" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-28">
          <div>
            <AdminTextInput label="電話番号" />
          </div>
          <div>
            <AdminTextInput label="女性" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-28">
          <div>
            <AdminTextInput label="契約プラン" />
          </div>
          <div>
            <div>
              <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
                <div>
                  <p for="" class="pb-1 text-[18px] font-normal text-dark">
                    登録日
                  </p>
                </div>
              </label>
              <AdminDatePicker
                classes="h-[38px]"
                label="登録日"
                class="rounded-sm border-[1px] border-solid border-[#ccc]"
              />
            </div>
          </div>
          <div>
            <div>
              <label class="text-gray-700 mb-[5px] block text-h6 font-bold">
                <div>
                  <p for="" class="pb-1 text-[18px] font-normal text-dark">
                    解約日
                  </p>
                </div>
              </label>
              <AdminDatePicker
                classes="h-[38px]"
                label="解約日"
                class="rounded-sm border-[1px] border-solid border-[#ccc]"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-28">
          <div>
            <AdminTextInput label="年代" />
          </div>
          <div>
            <AdminTextInput label="StripeID" />
          </div>
        </div>
        <!-- 棟 -->
        <div>
          <div class="relative font-inter antialiased">
            <div
              class="relative flex flex-col justify-center overflow-hidden shadow-md px-3 py-1"
            >
              <div class="w-full">
                <div class="divide-y divide-slate-200">
                  <div class="">
                    <div
                      id="faqs-title-01"
                      @click="expanded = !expanded"
                      :aria-expanded="expanded"
                      aria-controls="faqs-text-01"
                      class="flex justify-between gap-x-6 flex items-center justify-start"
                    >
                      <div
                        class="pb-[10px] pt-[10px] text-[18px] font-normal text-dark mr-3"
                      >
                        棟
                      </div>
                      <button
                        @click.stop="handleAddHouse"
                        type="button"
                        class="btn btn-outline-primary btn-sm w-fit"
                      >
                        + 追加
                      </button>
                    </div>
                    <div
                      id="faqs-text-01"
                      role="region"
                      aria-labelledby="faqs-title-01"
                      class="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
                      :class="
                        expanded
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      "
                    >
                      <div class="overflow-hidden mt-[1rem] px-10">
                        <!-- 棟持っている -->
                        <div>
                          <div
                            class="grid grid-cols-11 gap-x-20"
                            v-for="(item, index) in userInfor.listHouse"
                            :key="index"
                          >
                            <div class="col-span-3">
                              <AdminTextInput
                                label="名前"
                                v-model="item.name"
                              />
                            </div>
                            <div class="col-span-3" v-if="item?.blog_id">
                              <AdminTextInput
                                label="物件管理ID"
                                v-model="item.blog_id"
                              />
                            </div>
                            <div class="col-span-3">
                              <AdminTextInput
                                label="戸数"
                                v-model="item.house"
                              />
                            </div>
                            <div
                              class="flex items-center justify-start pt-[8px] gap-x-3"
                            >
                              <button
                                v-if="item?.blog_id"
                                class="btn btn-outline-primary btn-sm btn-fit"
                              >
                                <font-awesome-icon icon="file" />
                              </button>
                              <button
                              @click="handleDeleteHouse(index)"
                                class="btn btn-outline-primary btn-sm btn-fit"
                              >
                                <font-awesome-icon icon="trash" />
                              </button>
                              <button
                                v-if="item?.blog_id"
                                class="btn btn-outline-primary btn-sm btn-fit"
                              >
                                <font-awesome-icon icon="e" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- メモ -->
        <div class="pt-6">
            <Textarea placeholder="メモ" rows="2" label="管理者メモ" classes="" />
        </div>
      </div>
    </div>
    <div class="admin-box">
      <!-- plan -->
      <div>
        <PageTitle title="プラン履歴" />
        <!-- table -->
        <div>
          <AdminTable
            :headers="planHeaders"
            :data="[]"
            emptyText="プランの変更履歴がありません"
          />
        </div>
      </div>
      <!--掲示板  -->
      <div>
        <PageTitle title="掲示板" collapse>
          <template #body>
            <div>
              <div class="mb-2 text-h2 underline">投稿一覧</div>
              <AdminTable
                :headers="planHeaders"
                :data="[]"
                emptyText="プランの変更履歴がありません"
              />
              <div class="mb-2 text-h2 underline">投稿</div>
              <Textarea
                placeholder="投稿"
                rows="4"
                classes="rounded-sm !border-[#ccc] !focus:border-primary focus-visible:border-primary"
              />
              <div class="mt-3 flex justify-end">
                <button
                  class="btn btn-outline-primary btn-sm w-[110px]"
                  type="button"
                >
                  投稿
                </button>
              </div>
            </div>
          </template>
        </PageTitle>
      </div>
      <!-- WEB シート -->
      <div>
        <PageTitle title="Webシート" collapse>
          <template #body>
            <div>
              <!-- サブスクリプション -->
              <div class="admin-box relative">
                <div class="mb-2 text-h2 underline">Webシート一覧</div>
                <div class="px-[40px]">
                  <AdminTable
                    checkbox=""
                    :headers="[
                      {
                        title: '収支年月',
                        field: 'pid',
                        sort: false,
                        width: '90px',
                      },
                      {
                        title: '棟',
                        field: 'pname',
                        sort: false,
                        width: '170px',
                      },
                      {
                        title: '更新日時',
                        field: 'quality',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '入力担当',
                        field: 'totalPrice',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: 'ステータス',
                        field: 'status',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '承認者',
                        field: 'totalPrice',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '承認日',
                        field: 'status',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '承認',
                        field: 'status',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '差戻',
                        field: 'totalPrice',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '削除',
                        field: 'status',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: 'COPY',
                        field: 'status',
                        sort: false,
                        width: '100px',
                      },
                    ]"
                    :data="planAdded"
                  >
                    <template #quality="{ data }">
                      <div>
                        <input
                          type="number"
                          class="w-full border-x-0 border-b-[1px] border-t-0 border-solid border-blue-100 text-right"
                          v-model="data.quality"
                        />
                      </div>
                    </template>
                    <template #totalPrice="{ data }">
                      <div class="text-right">
                        {{ formatPrice(data.quality * data.unit_price) }}
                      </div>
                    </template>
                    <template #action="{ data }">
                      <div class="ml-2 flex justify-center">
                        <img
                          @click="handleRemovePlan(data)"
                          class="cursor-pointer"
                          src="~/assets/images/admin/delete.png"
                          alt=""
                        />
                      </div>
                    </template>
                  </AdminTable>
                  <div class="py-2">
                    <p class="py-1">
                      WebES対象年月と支出の対象年月が1ヶ月以上6ヶ月未満で異なる場合、<strong
                        class="text-[#ffce3d]"
                        >黄色</strong
                      >で表示されます。
                    </p>
                    <p class="py-1">
                      WebES対象年月と支出の対象年月が6ヶ月以上異なる場合、<strong
                        class="text-[#ff9f9f]"
                        >赤色</strong
                      >で表示されます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </PageTitle>
      </div>

      <!-- オプション履歴 -->
      <div>
        <PageTitle title="オプション履歴" collapse>
          <template #body>
            <div>
              <div class="admin-box relative">
                <div class="mb-2 text-h2 underline">スマサテ履歴一覧</div>
                <div class="px-[40px]">
                  <AdminTable
                    :headers="[
                      {
                        title: '申込日時',
                        field: 'update_date',
                        sort: true,
                        width: '100px',
                      },
                      {
                        title: '申込種別',
                        field: 'yymm',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: 'ステータス',
                        field: 'status',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '管理者メモ',
                        field: 'mng_memo',
                        sort: false,
                        width: '180px',
                      },
                    ]"
                    :data="userDetail.sumasate"
                  >
                    <template #update_date="{ data }">
                      <div>
                        {{ formatDateYYYYMMDD(data.entry_date) }}
                      </div>
                    </template>
                    <template #yymm="{ data }">
                      <div>
                        {{ data.yymm }}
                      </div>
                    </template>
                    <template #status="{ data }">
                      <div class="">
                        <div class="flex w-full items-center justify-center">
                          <div
                            :class="{
                              'status-entry-settled': data.status === 1,
                              'status-report-creating': data.status === 2,
                              'status-report-delivered': data.status === 3,
                            }"
                            class="flex h-[35px] w-[140px] items-center justify-center rounded-full text-white"
                          >
                            {{
                              STATUS_PURCHASE[`1`].find(
                                (i) => i.value === data.status
                              )?.label
                            }}
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #mng_memo="{ data }">
                      <div class="ml-2 flex justify-center">
                        {{ data.mng_memo }}
                      </div>
                    </template>
                  </AdminTable>
                </div>
              </div>
              <div class="admin-box relative">
                <div class="mb-2 text-h2 underline">Gamadas履歴一覧</div>
                <div class="px-[40px]">
                  <AdminTable
                    :headers="[
                      {
                        title: '申込日時',
                        field: 'update_date',
                        sort: true,
                        width: '100px',
                      },
                      {
                        title: 'ステータス',
                        field: 'status',
                        sort: false,
                        width: '100px',
                      },
                      {
                        title: '管理者メモ',
                        field: 'mng_memo',
                        sort: false,
                        width: '180px',
                      },
                    ]"
                    :data="userDetail.gamaDas"
                  >
                    <template #update_date="{ data }">
                      <div>
                        {{ formatDateYYYYMMDD(data.entry_date) }}
                      </div>
                    </template>
                    <template #status="{ data }">
                      <div class="">
                        <div class="flex w-full items-center justify-center">
                          <div
                            :class="{
                              'status-passed-customers': data.status === 1,
                              'status-CBIT-Matched': data.status === 2,
                              'status-GoldKey-Matched': data.status === 3,
                              'status-Purchased': data.status === 4,
                            }"
                            class="flex h-[35px] w-[140px] items-center justify-center rounded-full text-white"
                          >
                            {{
                              STATUS_PURCHASE[`2`].find(
                                (i) => i.value === data.status
                              )?.label
                            }}
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #mng_memo="{ data }">
                      <div class="ml-2 flex justify-center">
                        {{ data.mng_memo }}
                      </div>
                    </template>
                  </AdminTable>
                </div>
              </div>
            </div>
          </template>
        </PageTitle>
      </div>
      <!-- fax -->
      <div>
        <PageTitle title="FAX用収支報告書添付">
          <template #body>
            <div class="mx-5">
              <p class="my-2">
                収支報告書を選択または、ドラッグ＆ドロップし、添付ボタンを押して下さい。
              </p>
              <p class="my-2">
                対応形式は「pdf、Excel（xls、xlsx）、画像データ（jpg、png）、圧縮ファイル（zip）」となっております。
              </p>
              <p class="my-2 text-red">
                ※一度にアップロード可能なファイル数は20個までです。
              </p>
              <CheckBox
                label="スマサテレポートをアップロードする"
                class="my-2"
              />
              <div>
                <div
                  class="fileupload mx-3 my-3 border-[1px] border-solid border-[#ccc] p-3"
                >
                  <div
                    @dragenter="preventDefaults"
                    @dragover="preventDefaults"
                    @dragleave="preventDefaults"
                    @drop="handleDrop"
                    id="dropzone"
                    class="rounded-sm border-2 border-dashed border-[#ccc] p-5 text-center text-h1 text-[#ccc]"
                  >
                    （ファイルをここにドロップ）
                    <input
                      multiple
                      type="file"
                      ref="input"
                      class="upload-input hidden"
                    />
                  </div>
                </div>
                <div class="mx-3 mt-3 flex items-center justify-between">
                  <button
                    @click="
                      () => {
                        input.click();
                      }
                    "
                    type="button"
                    class="btn btn-outline-primary btn-sm w-fit"
                  >
                    ファイルの選択する
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm w-fit"
                  >
                    添付する
                  </button>
                </div>
              </div>
            </div>
          </template>
        </PageTitle>
      </div>
      <!-- 収支報告書　管理 -->
      <div>
        <PageTitle title="収支報告書　管理">
          <template #body>
            <AdminTable
              checkbox=""
              :headers="[
                {
                  title: '登録日時',
                  field: 'upldate',
                  sort: true,
                  width: '90px',
                },
                {
                  title: 'ES作成担当者',
                  field: 'bldgname',
                  sort: true,
                  width: '180px',
                },
                {
                  title: 'ES作成期限',
                  field: 'upldate_day',
                  sort: true,
                  width: '120px',
                },
                {
                  title: 'データ反映期限',
                  field: 'upldate_day',
                  sort: true,
                  width: '160px',
                },

                {
                  title: '報告書年月',
                  field: 'yymm',
                  sort: true,
                  width: '140px',
                },
                {
                  title: '棟',
                  field: 'filename',
                  sort: true,
                  width: '190px',
                },

                {
                  title: 'ファイル名',
                  field: 'file_download',
                  sort: true,
                  width: '190px',
                },

                {
                  title: '反映状況',
                  field: 'flection_status',
                  sort: true,
                  width: '150px',
                },

                {
                  title: '担当者',
                  field: '',
                  sort: true,
                  width: '150px',
                },
                {
                  title: '承認ステータス',
                  field: 'approve_status',
                  sort: true,
                  width: '190px',
                },

                {
                  title: '承認者',
                  field: '',
                  sort: true,
                  width: '150px',
                },
                {
                  title: '承認',
                  field: '',
                  sort: true,
                  width: '90px',
                },
                {
                  title: '差戻',
                  field: '差戻',
                  sort: true,
                  width: '90px',
                },

                {
                  title: '削除',
                  field: '削除',
                  sort: true,
                  width: '90px',
                },
              ]"
              :data="userDetail.attachment"
            >
              <template #update="{ data }">
                <div class="h-full">
                  <p class="text-center">
                    {{ formatDateCustom(data.update) }}
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
              <template #update_day="{ data }">
                <div class="h-full">
                  <p class="text-center">
                    {{ formatDateYYYYMMDD(data.update) }}
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
              <template #user_name="{ data }">
                <div class="cursor-pointer text-primary hover:underline">
                  <p class="text-center">{{ data.sei }} {{ data.mei }}</p>
                </div>
              </template>
              <template #flection_status="{ data }">
                <div class="h-full">
                  <Status
                    :options="REFLECTION_STATUS"
                    :classFn="flectionClass"
                    :value="data.status"
                  ></Status>
                </div>
              </template>
              <template #approve_status="{ data }">
                <div class="h-full">
                  <Status
                    :options="APPROVE_STATUS"
                    :classFn="approveClass"
                    :value="data.status"
                  ></Status>
                </div>
              </template>
            </AdminTable>
            <div>
              <p class="text-red">
                ※承認依頼を行う場合、収支報告書にチェックを入れてください。
              </p>
              <p class="text-red">
                また、棟名・報告書年月を設定後「保存」ボタンを押下してから承認依頼を行ってください。
              </p>
            </div>
          </template>
        </PageTitle>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
th,
td {
  border: 1px solid theme("colors.gray");
}
td {
  padding: 3px 10px;
}
th {
  font-size: 1.1em;
}
.user-item {
  background-color: #1e4290;
  color: theme("colors.white");
  padding: 10px 10px;
  text-align: center;
  font-size: 14px;
}

.detail-user__content {
  input {
    border: none;
    border-bottom: 1px solid #1e4290;
    padding: 0.2em 0.4em;
  }
}
</style>
