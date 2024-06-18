import { Link } from "react-router-dom";

const Unauthorized = ()=>{
    return(
        <section className="bg-white dark:bg-gray-900 h-screen">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-4xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500">You are not authorized.</h1>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, you are not authorized to view this page. You'll find lots to explore on the home page.</p>
                    <Link to="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
                </div>   
            </div>
        </section>
    );
};
export default Unauthorized;