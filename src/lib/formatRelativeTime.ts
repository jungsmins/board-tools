export default function formatRelativeTime(createdAt: string): string {
  const createTime = new Date(createdAt);
  const nowTime = Date.now();
  const relativeTime = nowTime - createTime.getTime();

  const second = relativeTime / 1000;
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  if (day >= 7) {
    const year = createTime.getFullYear();
    const month = createTime.getMonth() + 1;
    const date = createTime.getDate();

    return `${year}-${month}-${date}`;
  }

  if (day > 0) {
    return `${day}일 전`;
  }

  if (hour > 0) {
    return `${hour}시간 전`;
  }

  if (minute > 0) {
    return `${minute}분 전`;
  }

  return '방금 전';
}
