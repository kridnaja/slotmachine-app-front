import React, { useState, useEffect, useRef } from "react";
import Box_Main from "../assets/images/UI/Box_Main.svg";
import Box_Top from "../assets/images/UI/Box_Top.svg";
import Logo_Image from "../assets/images/logo/Logo.svg"


const SlotMachine = ({ data }) => {
  const initialNumbers = [
    1, 2, 3, 4, 5, 6, 11, 12, 13, 110, 118, 122, 123, 124,
  ]; // Real numbers in the game
  const [numbers, setNumbers] = useState([...initialNumbers]); // Store shuffled number array
  const reelRef = useRef(null);
  const [offset, setOffset] = useState(0); // Current number position
  const [remainingSpins, setRemainingSpins] = useState(0);

  // config slot visible
  const [spinCount, setSpinCount] = useState(1); // Number of spins per press
  const slotHeight = 120; // Height of each slot
  const slotWidth = 350;
  const slotEdge = 30;
  const slotAuraSize = 10;
  const visibleSlots = 3; // Number of visible slot
  const centerSlot = Math.floor(visibleSlots / 2);

  // color aura
  const [auraColors, setAuraColors] = useState();
  const greenAura = "bg-green-aura";
  const goldAura = "bg-gold-aura";
  const whiteAura = "bg-white-aura";
  const blueAura = "bg-blue-aura";
  const purpleAura = "bg-purple-aura";

  // status
  const [spinning, setSpinning] = useState(false);
  const [openAura, setOpenAura] = useState(false);

  const [completeSpin, setCompleteSpin] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  const [bonusPrize, setBonusPrize] = useState(false);

  // animate time
  const multipleSpinGap = 4000;
  const spinDuration = 3000;
  const popupDuration = 5000;
  const completeSpinAnimate = 6000; // not used

  

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startSpin = (remainingSpins) => {
    if (remainingSpins <= 0) return;

    const shuffledNumbers = shuffleArray(initialNumbers);
    setNumbers(shuffledNumbers);

    setSpinning(true);

    const interval = setInterval(() => {
      setOffset((prev) => (prev + slotHeight) % (shuffledNumbers.length * slotHeight));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);

      const randomIndex = Math.floor(Math.random() * numbers.length);

      const targetOffset =
        randomIndex * slotHeight - centerSlot * slotHeight;

      setTimeout(() => {
        setOffset((targetOffset + numbers.length * slotHeight) % (numbers.length * slotHeight));

        const resultIndex = (randomIndex + centerSlot - 1) % shuffledNumbers.length;
        console.log("Result:", shuffledNumbers[resultIndex]); // result number fo spin

        setTimeout(() => {
          startSpin(remainingSpins - 1);
        }, multipleSpinGap);  // Delay multiple spins gap
        setCompleteSpin(true);
      }, 100);
      setCompleteSpin(false);
    }, spinDuration);
  };

  const handleStartSpin = () => {
    startSpin(spinCount);
  };


  return (
    <div className="m-0 p-0 w-screen h-screen text-white flex items-center justify-center flex-col">
      <div className="absolute h-[33%] top-0 flex flex-col justify-center items-center">
        <div className="text-[2rem] font-dePixelBreit drop-shadow-xl">
          Prize Class Text 1
        </div>
        <div className=" text-[6rem] font-dePixelHalbfett drop-shadow-xl">
          120
        </div>

      </div>

      <div className={`
        relative flex justify-center items-center rounded-lg 
        ${completeSpin ? "motion-preset-confetti" : ""} 
        animation-delay-${completeSpinAnimate}
      `}
        style={{
          height: `${(slotHeight * visibleSlots) + slotEdge}px`,
          width: `${slotWidth + slotEdge}px`
        }}
      >
        <div className={`absolute justify-center items-center motion-preset-fade motion-duration-2000 ${openAura ? "flex" : "hidden"}`}>

          <div className="absolute flex justify-center items-center">
            <div className="absolute  overflow-hidden rounded-lg flex"
              style={{
                height: `${(slotHeight * visibleSlots) + slotEdge + slotAuraSize}px`,
                width: `${slotWidth + slotEdge + slotAuraSize}px`
              }}>
              <div
                className={`w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-rotate1 ${auraColors}`}

              ></div>
            </div>

            <div className="absolute overflow-hidden filter blur-lg flex"
              style={{
                height: `${(slotHeight * visibleSlots) + slotEdge}px`,
                width: `${slotWidth + slotEdge}px`
              }}>
              <div
                className={`w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-rotate1 ${auraColors}`}
              ></div>
            </div>
          </div>

          <div className="absolute flex justify-center items-center">
            <div className="absolute  overflow-hidden rounded-lg flex"
              style={{
                height: `${(slotHeight * visibleSlots) + slotEdge + slotAuraSize}px`,
                width: `${slotWidth + slotEdge + slotAuraSize}px`
              }}>
              <div
                className={`w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-rotate2 ${auraColors}`}
              ></div>
            </div>

            <div className="absolute overflow-hidden filter blur-lg flex"
              style={{
                height: `${(slotHeight * visibleSlots) + slotEdge}px`,
                width: `${slotWidth + slotEdge}px`
              }}>
              <div
                className={`w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-rotate2 ${auraColors}`}
              ></div>
            </div>
          </div>
        </div>


        <div className="absolute bg-slot-edge rounded-lg shadow-2xl flex justify-center items-center"
          style={{
            height: `${(slotHeight * visibleSlots) + slotEdge}px`,
            width: `${slotWidth + slotEdge}px`
          }}
        >

          <div
            className="w-machine-width bg-slots-bg shadow-inset-dark flex flex-col justify-center items-center relative overflow-hidden rounded-xs outline outline-1 outline-transparent transform preserve-3d transition-transform ease-out duration-500 origin-bottom rotate-x-[21deg]"
            style={{
              height: `${slotHeight * visibleSlots}px`,
              width: `${slotWidth}px`
            }}
          >
            <div className="absolute w-full h-full flex justify-center items-center">
              <div className="absolute w-full bg-overlay-glass opacity-30"
                style={{ height: `${slotHeight}px` }}></div>

              <div className="absolute left-0 w-[0.5rem] h-full bg-slots-side"></div>
              <div className="absolute right-0 w-[0.5rem] h-full bg-slots-side"></div>
            </div>


            <div className="absolute w-full h-full flex flex-col items-center">
              <div
                ref={reelRef}
                className={`absolute w-full flex flex-col items-center transition-transform ${spinning ? "duration-[80ms]" : "duration-500 ease-out" // Set duration animate spin
                  }`}
                style={{
                  transform: `translateY(-${offset}px)`,
                }}
              >
                {Array(3)
                  .fill(numbers)
                  .flat()
                  .map((number, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center text-pink-100 text-[2.5rem] font-bold w-full font-dePixelBreit drop-shadow-md"
                      style={{ height: `${slotHeight}px` }}
                    >
                      {number}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col mt-4 absolute right-0 z-40">

        <button
          onClick={handleStartSpin}
          className="px-6 py-2 bg-button-spin hover:bg-pink-600 text-white font-bold rounded-lg"
        >
          Spin
        </button>

        <button onClick={() => setOpenAura(!openAura)}>openAura</button>
        <div className=" flex flex-row">
          <button className="mx-[0.25rem]" onClick={() => setAuraColors(greenAura)}>green</button>
          <button className="mx-[0.25rem]" onClick={() => setAuraColors(goldAura)}>gold</button>
          <button className="mx-[0.25rem]" onClick={() => setAuraColors(whiteAura)}>white</button>
          <button className="mx-[0.25rem]" onClick={() => setAuraColors(blueAura)}>blue</button>
          <button className="mx-[0.25rem]" onClick={() => setAuraColors(purpleAura)}>purple</button>
        </div>

        <button onClick={() => setOpenPopup(!openPopup)}>Pop!!</button>
        <button onClick={() => setOpenBox(!openBox)}>Box!!</button>


        <input
          type="number"
          min="1"
          value={spinCount}
          onChange={(e) => setSpinCount(parseInt(e.target.value, 10) || 1)}
          className="px-2 py-1 mb-2 text-black text-center rounded-lg"
        />
      </div>


      <div className={`absolute bottom-0 w-[28rem] h-[20rem] z-50 flex justify-center items-center ${openBox? "flex":"hidden"}`}>
        <img className="absolute bottom-0 w-full " src={Box_Main} alt="" />
        <img className="absolute top-0 w-full " src={Box_Top} alt="" />
      </div>

      <div className="absolute top-[40px] left-[40px]">
        <img src={Logo_Image} alt="" />
      </div>






      <div className={`absolute p-[2rem] bg-red-400 border-[1rem] border-white shadow-2xl flex flex-col justify-center items-center motion-preset-pop z-50  ${openPopup ? "flex" : "hidden"}`}>
        <div className="text-[6rem] font-dePixelHalbfett drop-shadow-xl shadow-black">
          Jackpot
        </div>
        <div className="text-[1rem] font-dePixelHalbfett drop-shadow-lg mt-[0.25rem]">Bonus Round !!</div>
      </div>

    </div>
  );
};

export default SlotMachine;
