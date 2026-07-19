export default function JoinRoomForm() {
  return (
    <form>
      <p className='mb-5 text-xl font-bold text-card-ink'>방 참가하기</p>

      <label className='mb-5 block'>
        <span className='mb-2 block text-sm font-bold text-card-ink'>
          방 코드
        </span>
        <input
          className='h-13 w-full rounded-lg border border-chip-border bg-white px-4 text-center text-lg font-bold uppercase tracking-[0.2em] text-card-ink outline-none transition placeholder:tracking-normal placeholder:text-card-muted focus:border-[#2d1508] focus:ring-2 focus:ring-[#2d1508]/15'
          inputMode='text'
          maxLength={4}
          name='roomCode'
          placeholder='A3K7'
          type='text'
        />
      </label>

      <label className='mb-6 block'>
        <span className='mb-2 block text-sm font-bold text-card-ink'>
          닉네임
        </span>
        <input
          className='h-13 w-full rounded-lg border border-chip-border bg-white px-4 text-base text-card-ink outline-none transition placeholder:text-card-muted focus:border-[#2d1508] focus:ring-2 focus:ring-[#2d1508]/15'
          maxLength={12}
          name='nickname'
          placeholder='이름'
          type='text'
        />
      </label>

      <button
        type='button'
        className='flex h-13 w-full items-center justify-center rounded-lg bg-[#2f8f5b] px-5 text-base font-bold text-white shadow-md transition hover:bg-[#237348] focus-visible:ring-2 focus-visible:ring-[#2f8f5b]/30'
      >
        참가하기
      </button>
    </form>
  );
}
