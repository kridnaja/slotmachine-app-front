import React, { useContext } from "react";
import SlotMachineV1 from "../component/SlotMachineV1";
import SlotMachineV2 from "../component/SlotMachineV2";

function GamePage() {
    return (
        <div className="flex justify-center items-center flex-col w-screen h-screen bg-[#F7EFCE] overflow-hidden">
            {/* <SlotMachineV1 /> */}
            <SlotMachineV2 />
            {/* <input type="number" className='bg-red-200' value={numberLimit}
        // onChange={(e) => setNumberLimit(e.target.value)} /> */}

        </div>
    )
}

export default GamePage