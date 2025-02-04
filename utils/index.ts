import dayjs from 'dayjs';
import { gsap } from 'gsap';

export const formatPrice = (value: any) => {
    if (isNaN(value) || value === '') return '';
    return `￥${(value + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
};
export const formatNumber = (value: any) => {
    if (isNaN(value) || value === '') return '';
    return `${(value + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
};
export const formatDateYYYYMMDD = (value:string) => {
    if (!value) return '';
    return dayjs(value).format('YYYY/MM/DD');
};

export const formatDateCustom = (value: string, format:string) => {
    if (!value) return '';
    if (!format) {
        format = 'YYYY/MM/DD hh:mm:ss';
    }
    return dayjs(value).format(format);
};

export const animation = (value: string) => {
    if (!value) return '';
    const items = document.querySelectorAll(value);

    gsap.from(items, {
        textContent: 0,
        duration: 1,
        ease: 'power1.in',
        snap: { textContent: 1 },
        stagger: {
            each: 0.1,
            onUpdate: function () {
                this.targets()[0].innerHTML = formatNumber(
                    Math.ceil(this.targets()[0].textContent),
                );
            },
        },
    });
};

// export const debounce = (fn:, delay) => {
//   let timeout
//   return (...args) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }

//     timeout = setTimeout(() => {
//       fn(...args)
//     }, delay)
//   }
// }