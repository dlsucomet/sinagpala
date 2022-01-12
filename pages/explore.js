import dynamic from "next/dynamic"

export default function Explore(){
    const Map = dynamic(() => import("../components/Map"), {
        loading: () => "Loading...",
        ssr: false
    });

    return (
        <Map />
    )

}