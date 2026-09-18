const randomNickname = [
  '몽글 다람쥐',
  '말랑 젤리곰',
  '방글 팬더',
  '동동 오리',
  '폭신 수달',
  '콩콩 토끼',
  '살랑 여우',
  '몰랑 고양이',
  '두근 아기펭귄',
  '반짝 주사위',
];

export function randomGenerateNickname() {
  const randomNumber = Math.floor(Math.random() * randomNickname.length);

  return randomNickname[randomNumber];
}
