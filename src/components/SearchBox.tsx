
export default function SearchBox({search, setSearch , onSearch}: 
    {search: string, setSearch: (search: string) => void , onSearch: ()=>void}) {

        const handleKeyPress = (event: React.KeyboardEvent) => {
            if(event.key === "Enter"){
                onSearch()
            }
        }
    
    return(

    <div className="flex max-w-sm my-2">   
        <label  className="sr-only">Search</label>
        <div className=" w-full">         
            <input value={search}
                    onKeyDown={handleKeyPress}
                    onChange={(e)=>setSearch(e.target.value)}
            id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users..." required />
        </div>
        <button onClick={()=> onSearch()}       
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-violet-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-violet-700 dark:hover:bg-violet-900 dark:focus:ring-violet-950">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
        </button>
    </div>

    )
}