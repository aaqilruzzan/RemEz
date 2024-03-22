import { Link } from "react-router-dom";

function NoPdf() {
  return (
    <section class="bg-white ">
      <div class="py-5 px-2 mx-auto max-w-screen-xl lg:py-8 lg:px-3">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1 class="mb-8 text-7xl tracking-tight font-extrabold lg:text-8xl text-primary-600 dark:text-primary-500">
            No PDF Found
          </h1>
          <p class="mb-8 text-3xl tracking-tight font-bold text-blue-900 md:text-4xl ">
            We need your input to generate your quiz :)
          </p>
          <p class="mb-4 text-xl font-light text-blue-900">
            You can upload your pdf from the home page.{" "}
          </p>
          <Link
            to={"/"}
            class="inline-flex text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:focus:ring-primary-900 my-2"
          >
            Back to Homepage&nbsp;&nbsp;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NoPdf;
