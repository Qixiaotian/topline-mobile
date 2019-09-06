import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// 获取相对时间的方法
export const fmtDate = (value) => {
  return dayjs().to(dayjs(value))
}
