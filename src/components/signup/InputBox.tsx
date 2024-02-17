
export default function InputBox({label, placeholder}:
    {label : string, placeholder : string}){
       
       return <div>
                <div className="font-medium text-lg ">
                    {label}
                </div>
                <input className="mb-4 w-full py-2 px-2 rounded-md bg-zinc-600" 
                placeholder={placeholder}></input>
        </div>
    }