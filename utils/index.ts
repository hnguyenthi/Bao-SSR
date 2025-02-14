import dayjs from "dayjs";
import { gsap } from "gsap";
import {
  REFLECTION_STATUS,
  USER_STATUS,
  APPROVE_STATUS,
  STATUS_PURCHASE,
} from "./constraints";
export const formatPrice = (value: any) => {
  if (isNaN(value) || value === "") return "";
  return `￥${(value + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}`;
};
export const formatNumber = (value: any) => {
  if (isNaN(value) || value === "") return "";
  return `${(value + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}`;
};
export const formatDateYYYYMMDD = (value: string) => {
  if (!value) return "";
  return dayjs(value).format("YYYY/MM/DD");
};

export const formatDateCustom = (value: any, format: string) => {
  console.log(value);
  if (!value) return "";
  if (!format) {
    format = "YYYY/MM/DD hh:mm:ss";
  }
  return dayjs(value).format(format);
};

export const animation = (value: string) => {
  if (!value) return "";
  const items = document.querySelectorAll(value);

  gsap.from(items, {
    textContent: 0,
    duration: 1,
    ease: "power1.in",
    snap: { textContent: 1 },
    stagger: {
      each: 0.1,
      onUpdate: function () {
        this.targets()[0].innerHTML = formatNumber(
          Math.ceil(this.targets()[0].textContent)
        );
      },
    },
  });
};

export const userClass = (value: number) => {
  var className = "";
  switch (value) {
    case USER_STATUS[0].value:
      className = "status-new";
      break;
    case USER_STATUS[1].value:
      className = "status-use";
      break;
    case USER_STATUS[2].value:
      className = "status-cancel";
      break;
    case USER_STATUS[3].value:
      className = "status-stop";
      break;
    case USER_STATUS[4].value:
      className = "status-error";
      break;
    case USER_STATUS[5].value:
      className = "status-waiting-reports";
      break;
    case USER_STATUS[6].value:
      className = "status-calculating";
      break;
    case USER_STATUS[7].value:
      className = "status-stripe-processing";
      break;
    case USER_STATUS[8].value:
      className = "status-waiting-payment";
      break;
    case USER_STATUS[9].value:
      className = "status-data-reflecting";
      break;
    case USER_STATUS[10].value:
      className = "status-cancel-application";
      break;
    case USER_STATUS[11].value:
      className = "status-cancel-processing";
      break;
    default:
  }
  return className;
};
export const flectionClass = (value: number) => {
  let classStatus = "";
  switch (value) {
    case REFLECTION_STATUS[0].value:
      classStatus = "refl-status-not-reflect";
      break;
    case REFLECTION_STATUS[1].value:
      classStatus = "refl-status-reflecting";
      break;
    case REFLECTION_STATUS[2].value:
      classStatus = "refl-status-reflected";
      break;
    case REFLECTION_STATUS[3].value:
      classStatus = "refl-status-error";
      break;

    case REFLECTION_STATUS[4].value:
      classStatus = "refl-status-notSubject";
      break;
    default:
      break;
  }
  return classStatus;
};

export const approveClass = (value: number) => {
  let classStatus = "";
  switch (value) {
    case APPROVE_STATUS[0].value:
      classStatus = "refl-status-not-reflect";
      break;
    case APPROVE_STATUS[1].value:
      classStatus = "approve-status-pending";
      break;
    case APPROVE_STATUS[2].value:
      classStatus = "refl-status-reflected";
      break;
    case APPROVE_STATUS[3].value:
      classStatus = "approve-status-pending";
      break;

    case APPROVE_STATUS[4].value:
      classStatus = "refl-status-reflected";
      break;
    default:
      break;
  }
  return classStatus;
};

export const statusClass = (arr: Array<string>) => {
  const option_id = parseInt(arr[0]) as keyof typeof STATUS_PURCHASE;
  const status = parseInt(arr[1]);
  if (STATUS_PURCHASE[option_id].length === 3 && status === 1)
    return "status-entry-settled";
  if (STATUS_PURCHASE[option_id].length === 3 && status === 2)
    return "status-report-creating";

  if (STATUS_PURCHASE[option_id].length === 3 && status === 3)
    return "status-report-delivered";

  if (STATUS_PURCHASE[option_id].length === 4 && status === 1)
    return "status-passed-customers";

  if (STATUS_PURCHASE[option_id].length === 4 && status === 2)
    return "status-CBIT-Matched";

  if (STATUS_PURCHASE[option_id].length === 4 && status === 3)
    return "status-GoldKey-Matched";

  if (STATUS_PURCHASE[option_id].length === 4 && status === 4)
    return "status-Purchased";
};
