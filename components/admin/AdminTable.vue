<script setup>
import { ref, watch } from "vue";
const emit = defineEmits([
  "update:paging",
  "selectedAll",
  "selectedItem",
  "update:selected",
]);

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  headers: {
    type: Array,
    default: [],
  },
  footers: {
    type: Array,
    default: [],
  },
  checkbox: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Array,
    default: [],
  },
  emptyText: {
    type: String,
    default: "データがありません",
  },
  showEmptyText: {
    type: Boolean,
    default: true,
  },
  isPaging: {
    type: Boolean,
    default: true,
  },
  isFilter: {
    type: Boolean,
    default: true,
  },
  classes: {
    type: String,
    default: "",
  },
  perItems: {
    type: Array,
    default: [10, 25, 50, 100],
  },
});

const paging = ref({
  perPage: 20,
  page: 1,
  search: "",
  totalPage: Math.ceil(props.data.length / 10),
});
const sort = ref({
  sort_dir: "",
  sort_field: "",
});
const items = ref([]);
const pageChecked = ref([]);
const getData = () => {
  // 検索
  let temps = (items.value = props.data.filter((i) => {
    return Object.values(i).some((element) => {
      return (element + "").includes(paging.value.search);
    });
  }));
  if (sort.value.sort_field) {
    temps = temps.sort((a, b) => {
      if (sort.value.sort_dir === "asc") {
        return a[sort.value.sort_field] > b[sort.value.sort_field] ? 1 : -1;
      } else {
        return a[sort.value.sort_field] < b[sort.value.sort_field] ? 1 : -1;
      }
    });
  }
  paging.value.total = temps.length;
  //全てページ数を計算
  paging.value.totalPage = Math.ceil(temps.length / paging.value.perPage);
  //    paging
  items.value = temps.slice(
    (paging.value.page - 1) * paging.value.perPage,
    paging.value.page < paging.value.totalPage
      ? paging.value.page * paging.value.perPage
      : props.data.length
  );
};
getData();
const handlePre = () => {
  if (paging.value.page > 1) {
      paging.value.page -= 1;
    console.log(paging.value.page);
    getData();
  }
};
const handleNext = () => {
  if (paging.value.page < paging.value.totalPage) {
    paging.value.page += 1;
    getData();
  }
};
// const handleChangePage = (item) => {
//   if (item === paging.value.page) return;
//   if (paging.value.page <= paging.value.totalPage && paging.value.page >= 1) {
//     paging.value.page = item;
//   }
// };

const handleSort = (field, isSort) => {
  if (!isSort) return;
  if (sort.value.sort_field !== field) {
    sort.value.sort_field = field;
  }
  sort.value.sort_dir = sort.value.sort_dir === "asc" ? "desc" : "asc";
};

// const makePagingShow = (arr) => {
//   return arr.filter((item) => {
//     return item > 1 && item < paging.value.totalPage;
//   });
// };

// const showPage = ref(makePagingShow([...Array(6).keys()].slice(1)));
// watch(
//   () => paging.value.page,
//   (newValue, oldValue) => {
//     if (
//       paging.value.page > 4 &&
//       paging.value.page < paging.value.totalPage - 2
//     ) {
//       const max =
//         newValue > oldValue ? paging.value.page + 3 : paging.value.page + 1;
//       const min =
//         newValue > oldValue ? paging.value.page - 1 : paging.value.page - 3;
//       showPage.value = makePagingShow([...Array(max).keys()].slice(min));
//     } else if (paging.value.page <= 4) {
//       showPage.value = makePagingShow([...Array(6).keys()].slice(2));
//     } else if (paging.value.page >= paging.value.totalPage - 2) {
//       showPage.value = makePagingShow(
//         [...Array(paging.value.totalPage).keys()].slice(
//           paging.value.totalPage - 4
//         )
//       );
//     }
//     getData();
//   }
// );
// watch(
//   () => paging.value.totalPage,
//   () => {
//     showPage.value = [...Array(6).keys()].slice(2).filter((item) => {
//       return item > 1 && item < paging.value.totalPage;
//     });
//     getData();
//   }
// );
watch(
  () => paging.value.search,
  () => {
    paging.value.page = 1;
    getData();
  }
);
watch(
  () => paging.value.perPage,
  () => {
    paging.value.page = 1;
    paging.value.totalPage = Math.ceil(
      props.data.length / paging.value.perPage
    );
    getData();
  }
);
watch(
  () => sort.value,
  () => {
    getData();
  },
  { deep: true }
);
watch(
  () => props.data,
  () => {
    getData();
  }
);
const handleSelectAll = (e) => {
  if (e.target.checked) {
    const afterRemoveDuplicate = [...props.selected, ...items.value].reduce(
      (arr, item) => {
        const removed = arr.filter((i) => i.id !== item.id);
        return [...removed, item];
      },
      []
    );

    emit("update:selected", afterRemoveDuplicate);
    pageChecked.value.push(paging.value.page);
  } else {
    const listId = items.value.map((x) => x.id);
    emit("selectedAll", []);
    emit("update:selected", [
      ...props.selected.filter((i) => !listId.includes(i.id)),
    ]);
    pageChecked.value = pageChecked.value.filter(
      (i) => i !== paging.value.page
    );
  }
};
const handleSelectedItem = (item, $event) => {
  if ($event.target.checked) {
    emit("update:selected", [...props.selected, item]);
  } else {
    emit(
      "update:selected",
      props.selected.filter((i) => i.id !== item.id)
    );
  }
};
const timer = ref(null);
const handleSearch = (e) => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    paging.value.search = e.target.value;
  }, 500);
};
watch(
  () => props.selected,
  (newValue, oldValue) => {
    const listUserId = newValue.map((x) => x.id);
    if (items.value.every((item) => listUserId.includes(item.id))) {
      pageChecked.value.push(paging.value.page);
    } else {
      pageChecked.value = pageChecked.value.filter(
        (i) => i !== paging.value.page
      );
    }
  },
  { deep: true }
);
</script>
<template>
  <div class="container-table overflow-x-auto pt-1">
    <div class="">
      <table id="example2" class="table-hover table" :class="classes">
        <thead>
          <tr>
            <th style="--width: 20px" class="header-item" v-if="checkbox">
              <div class="">
                <div class="flex justify-center items-center">
                  <input
                    @input="handleSelectAll"
                    class=""
                    type="checkbox"
                    :checked="pageChecked.includes(paging.page)"
                  />
                </div>
              </div>
            </th>

            <th
              :style="`--width: ${header.width ? header.width : 'undefined'}`"
              class="header-item"
              v-for="(header, index) in headers"
              @click="handleSort(header.field, header.sort)"
              :key="index + header"
            >
              <div
                class="flex h-full items-center justify-start text-[12px]"
                :class="{
                  sorting_asc:
                    sort.sort_dir === 'asc' && sort.sort_field === header.field,
                  sorting_desc:
                    sort.sort_dir === 'desc' &&
                    sort.sort_field === header.field,
                  sorting: header.sort,
                }"
              >
                {{ header.title }}
                <!-- <font-awesome-icon icon="angles-up-down" /> -->
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="items.length > 0">
          <tr
            class="rows bg-white"
            v-for="(item, index) in items"
            :key="`body-table-${index}-${item}`"
          >
            <td
              class="item-table px-8 py-10"
              style="--width: 20px"
              v-if="checkbox"
            >
              <div>
                <div class="flex justify-center">
                  <input
                    @input="handleSelectedItem(item, $event)"
                    class=""
                    type="checkbox"
                    :checked="
                      selected.filter((i) => i.id == item.id).length > 0
                    "
                  />
                </div>
              </div>
            </td>
            <td
              :style="`--width: ${header.width ? header.width : 'undefined'}`"
              class="item-table"
              v-for="(header, index) in headers"
              :key="header.field + index"
            >
              <div v-if="header.field === 'checkbox'">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                </div>
              </div>
              <div v-else class="width-inherit">
                <div v-if="$slots[`${header.field}`]" class="w-full">
                  <slot :name="`${header.field}`" :data="item"></slot>
                </div>
                <div v-else class="text-[14px]">
                  {{ item[`${header.field}`] }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <td
            v-if="showEmptyText"
            colspan="12"
            class="item-table px-8 py-10 text-center"
          >
            {{ emptyText }}
          </td>
        </tbody>
        <tfoot class="pt-3">
          <slot name="footer"></slot>
        </tfoot>
      </table>
    </div>
    <div
      v-if="data.length > 0 && isPaging"
      class="flex items-center justify-between"
    >
      <div>
        {{ paging.total }} 件中
        {{ (paging?.page - 1) * paging?.perPage + 1 }} から
        {{
          paging.page < paging.totalPage
            ? paging?.page * paging?.perPage
            : paging.total
        }}
        まで表示
      </div>
      <div>
        <div
          class="paging flex content-center justify-center gap-x-[7px] md:gap-x-[10px]"
        >
          <button
            :disabled="paging.page === 1"
            class="btn btn-outline-primary btn-sm"
            @click="handlePre"
          >
            前
          </button>
          <!-- <div
            class="flex content-center justify-center gap-x-[7px] md:gap-x-[10px]"
          >
           <div
              v-if="data.length > 0"
              @click="handleChangePage(1)"
              class="paging-button"
              :class="{
                'paging-button__active': 1 == paging.page,
              }"
            >
              <p>1</p>
            </div>
            <div v-if="showPage[0] - 1 > 1" class="paging-button">
              <p>...</p>
            </div>
            <div
              @click="handleChangePage(item)"
              class="paging-button"
              :class="{
                'paging-button__active': item == paging.page,
              }"
              v-for="item in showPage"
              :key="`paging-${item}`"
            >
              {{ item }}
            </div>
            <div
              v-if="showPage[showPage.length - 1] + 1 < paging.totalPage"
              class="paging-button"
            >
              <p>...</p>
            </div>
            <div
              v-if="paging.totalPage > 1"
              @click="handleChangePage(paging.totalPage)"
              class="paging-button"
              :class="{
                'paging-button__active': paging.totalPage === paging.page,
              }"
            >
              <p>{{ paging.totalPage }}</p>
            </div>
          </div> -->

          <button class="btn btn-outline-primary btn-sm" @click="handleNext">
            次
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@use "sass:math";
td {
  div {
    color: #353a44;
  }
}
thead {
  tr {
    background-color: #fff;
    color: #212529;
    padding: 10px 10px;
    text-align: center;
    vertical-align: middle !important;
  }

  th {
    width: var(--width) !important;
    border-bottom: 1px solid #dee2e6 !important;
    text-align: left;
    vertical-align: middle !important;
    padding: 8px 10px !important;
  }
}
tfoot {
  th {
    background-color: #fff;
    color: #212529;
    padding: 8px 10px;
    text-align: center;
    border: 1px solid #dee2e6 !important;
    vertical-align: middle !important;
  }
  td {
    border: 2px solid #dee2e6 !important;
  }
}

.header-item {
  width: var(--width) !important;
}

.item-table {
  width: var(--width);
  border-bottom: 1px solid #dee2e6 !important;
  padding: 3px 8px !important;
  vertical-align: middle !important;
}

.paging-button {
  min-width: 33px;
  // height: 32px;
  padding: 4px 2px;
  border: 1px solid #bfbfbf;
  justify-items: center;
  align-content: center;
  font-weight: bold;
  background-color: #fff;
  color: #1e4290;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
}

.paging-button__active {
  background-color: #1e4290;
  color: white;
}

.sorting {
  cursor: pointer;
  position: relative;

  &::after {
    font-size: 16px;
    position: absolute;
    right: 0.3em;
    content: "↓";
    opacity: 0.3;
    top: 50%;
    transform: translateY(-50%);
  }
}

.sorting {
  &::before {
    font-size: 16px;
    position: absolute;
    right: 0.8em;
    content: "↑";
    opacity: 0.3;
    top: 50%;
    transform: translateY(-50%);
  }
}

.sorting_asc {
  &::after {
    font-size: 16px;
    position: absolute;
    right: 0.3em;
    top: 50%;
    transform: translateY(-50%);
    content: "↓";
  }

  &::before {
    font-size: 16px;

    opacity: 1;
    position: absolute;
    right: 0.8em;
    content: "↑";
    top: 50%;
    transform: translateY(-50%);
  }
}

.sorting_desc {
  &::after {
    font-size: 16px;

    opacity: 1;
    position: absolute;
    right: 0.3em;
    content: "↓";
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    font-size: 16px;

    position: absolute;
    right: 0.8em;
    content: "↑";
    top: 50%;
    transform: translateY(-50%);
  }
}
.item_width {
  width: inherit;
}
</style>
<style lang="scss" scoped>
.header-item:not(:last-child) {
  padding-right: 18px !important;
}
tr {
  td:not(:last-child) {
    padding-right: 18px !important;
  }
}
.width-inherit {
    width: inherit;
}
</style>
