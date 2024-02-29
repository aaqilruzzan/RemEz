const SelectTopic = () => {
  return (
    <div class="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
      <header class="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8"></header>
      <main class="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div class="max-w-lg">
          <p class="text-base font-semibold leading-8 text-cyan-600">
            No Topic Selected
          </p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Select a topic from the above dropdown to view progress
          </h1>

          <div class="mt-10">
            <a href="#" class="text-sm font-semibold leading-7 text-teal-600">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </main>

      <div class="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <img
          src="https://images.newscientist.com/wp-content/uploads/2020/02/25113425/fnb1ej_web.jpg"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SelectTopic;
