const RESOURCES = [
  {
    id: 'megacredits',
    name: '메가크레딧',
    amount: 42,
    production: 7,
  },
  {
    id: 'steel',
    name: '강철',
    amount: 8,
    production: 2,
  },
  {
    id: 'titanium',
    name: '티타늄',
    amount: 5,
    production: 1,
  },
  {
    id: 'plants',
    name: '식물',
    amount: 6,
    production: 3,
  },
  {
    id: 'energy',
    name: '에너지',
    amount: 2,
    production: 4,
  },
  {
    id: 'heat',
    name: '열',
    amount: 14,
    production: 5,
  },
];

export default function TerraformingMarsPage() {
  return (
    <main className='min-h-dvh bg-white text-[#24140b]'>
      <div className='mx-auto min-h-dvh w-full max-w-[430px] bg-[#efe6d6] p-4 shadow-2xl landscape:max-w-[720px]'>
        <section className='grid grid-cols-2 gap-3 landscape:grid-cols-3'>
          {RESOURCES.map((resource) => (
            <article
              key={resource.id}
              className='rounded-lg border border-black/10 bg-white p-4 shadow-sm landscape:p-3'
            >
              <h1 className='mb-4 text-xl font-bold landscape:mb-3 landscape:text-lg'>
                {resource.name}
              </h1>

              <div className='mb-4 landscape:mb-3'>
                <p className='mb-2 text-sm font-bold text-[#7a6555]'>
                  현재 보유량
                </p>
                <div className='flex items-center justify-between gap-2'>
                  <button className='h-11 w-11 rounded-lg bg-[#e4d6c3] text-2xl font-bold'>
                    -
                  </button>
                  <strong className='text-4xl font-black leading-none landscape:text-3xl'>
                    {resource.amount}
                  </strong>
                  <button className='h-11 w-11 rounded-lg bg-[#e4d6c3] text-2xl font-bold'>
                    +
                  </button>
                </div>
              </div>

              <div>
                <p className='mb-2 text-sm font-bold text-[#7a6555]'>생산량</p>
                <div className='flex items-center justify-between gap-2'>
                  <button className='h-10 w-10 rounded-lg bg-[#f0e6d8] text-xl font-bold'>
                    -
                  </button>
                  <strong className='text-3xl font-black leading-none landscape:text-2xl'>
                    {resource.production >= 0 ? '+' : ''}
                    {resource.production}
                  </strong>
                  <button className='h-10 w-10 rounded-lg bg-[#f0e6d8] text-xl font-bold'>
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
