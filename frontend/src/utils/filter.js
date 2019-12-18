export function formatDate(date, pattern='YYYY/MM/DD HH:mm:ss') {
    let format = pattern
    let d = new Date(date)

    const reg = {
        'M+': d.getMonth() + 1,
        'D+': d.getDate(),
        'H+': d.getHours(),
        'm+': d.getMinutes(),
        's+': d.getSeconds()
    }

    if (/(Y+)/i.test(format)) {
        format = format.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length))
    }

    for (let k in reg) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? reg[k] : `00${reg[k]}`.substr(`${reg[k]}`.length)
            )
        }
    }

    return format
}