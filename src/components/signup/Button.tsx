
export default function Button({label}:{label: string}){
    return(
        <div className="mt-6">
            <button type="button" className= "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-violet-900 dark:hover:bg-violet-700 focus:outline-none dark:focus:ring-violet-800">
                {label}
            </button>
        </div>
    )
}