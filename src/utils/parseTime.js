

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    return format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
}

export function remainingTime(time) {
    const now = new Date();
    const targetTime = new Date(time);

    if (targetTime > now) {
        const timeDifference = targetTime - now;
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    } else {
        return 0;
    }
}