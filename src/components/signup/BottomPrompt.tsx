import Link from "next/link"

export default function BottomPrompt({label,buttonText} : {
    label: string, buttonText : string
}){
    return <div className="flex justify-center">
        {label}
        <button className="ml-2">
            {buttonText}
        </button>
    </div>
}