function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  return value;
}

export const SITE_URL = required('SITE_URL', process.env.SITE_URL);
