import React, { useState, useEffect, useRef } from "react";
import Box_Main from "../assets/images/UI/Box_Main.svg";
import Box_Top from "../assets/images/UI/Box_Top.svg";
import Logo_Image from "../assets/images/logo/Logo.svg";
import Logo_Eva from "../assets/images/logo/Group.svg";

import logo from "../assets/images/logo/Group 11.svg";

import axios from "axios";
function GameExtraPage() {
  const [count, setCount] = useState(null);
  const [slotSpin1] = useState(new Audio(`src/assets/boss/bossSpin7.mp3`));
  const [slotFinish] = useState(new Audio("src/assets/boss/finishSpin1.mp3"));


  const [finishSingleBoss] = useState(
    new Audio("src/assets/boss/finishSingle2.mp3")
  );

  const [startButtonBoss] = useState(
    new Audio("src/assets/boss/buttonBoss2.mp3")
  );

  const [buttonBoss] = useState(new Audio('src/assets/boss/buttonBoss2'))

  const [lastSpin] = useState(new Audio('/assests/boss/lastSpin.mp3'));

  const [afterFinish] = useState(
    new Audio("src/assets/boss/afterFinishAllSpin2.mp3")
  );

  const [bossVibe] = useState(new Audio("src/assets/bossvibe.mp3"));


  const [randomNumber1, setRandomNumber1] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);
  const [randomNumber3, setRandomNumber3] = useState(0);

  const [isSpin1, setIsSpin1] = useState(false);
  const [isSpin2, setIsSpin2] = useState(false);
  const [isSpin3, setIsSpin3] = useState(false);

  const [allNumbers, setAllNumbers] = useState([]);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    id: "",
    item: "",
    user: "",
  });
const [allItems, setAllItems] = useState([]);
  const [allFinishNumbers, setAllFinishNumbers] = useState([]);

  const [isSpinFinish, setIsSpinFinish] = useState(false);

  console.log(loading);
  console.log(count);
  const [vibe, setVibe] = useState(false);
  const [vibeVol, setVibeVol] = useState(1);
  useEffect(() => {
    if (vibe) {
      bossVibe.volume = vibeVol; // Set the volume to 20% of the full volume
      bossVibe.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }

    return () => {
      bossVibe.pause();
      bossVibe.currentTime = 0; // Reset playback
    };
  }, [vibe, vibeVol]);

  const [isJackpot, setIsJackpot] = useState(false);
  useEffect(() => {
    axios.get("http://192.168.1.162:5001/readBoss").then((res) => {
      const listNumber = [];
      const findUserThatStillNull = res.data.filter(
        (data) => data.user === null
      );
      if(findUserThatStillNull){
        setAllItems(findUserThatStillNull)
      }

      const findNumberThatFinish = res.data.filter((data) => data.user);
      setAllFinishNumbers(findNumberThatFinish);
      const findNumberThatNotFinish = res.data.filter((data) => data.isFinish);

      findNumberThatNotFinish.map((data) => {
        if (data.isFinish) {
          listNumber.push(data.isFinish);
        }
      });

      if (findNumberThatNotFinish) {
        if (item !== null) {
          const randomIndex = Math.floor(Math.random() * listNumber.length);

          const targetNumberToDelete = listNumber[randomIndex];

          if (targetNumberToDelete?.length == 1) {
            setInput({
              ...input,
              id: findUserThatStillNull[0].id,
              user: `00` + targetNumberToDelete,
              item: findNumberThatNotFinish[0].item,
            });
          }
          if (targetNumberToDelete?.length == 2) {
            setInput({
              ...input,
              id: findUserThatStillNull[0].id,
              user: `0` + targetNumberToDelete,
              item: findNumberThatNotFinish[0].item,
            });
          }
          if (targetNumberToDelete?.length == 3) {
            setInput({
              ...input,
              id: findUserThatStillNull[0].id,
              user: targetNumberToDelete,
              item: findNumberThatNotFinish[0].item,
            });
          }
        }
        setCount(count + 1);
        if (count === null) {
          setCount(0);
        }
        axios.post("http://192.168.1.162:5001/createBoss", input);
        setAllNumbers(res.data);
      }
    });
  }, [item]);

  useEffect(() => {
    console.log("created to database");
    axios.post("http://192.168.1.162:5001/createBoss", input);
  }, [count]);


    useEffect(() => {
      const handleResetButton = (event) => {
        if (event.key === "r") {
          handleReset();
  
        }
      };
      // Add keydown event listener
      window.addEventListener("keydown", handleResetButton);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("keydown", handleResetButton);
      };
    }, []);

  useEffect(() => {
    if (isSpin1) {
      const interval1 = setInterval(() => {
        setRandomNumber1(Math.random());
      }, 100);
      return () => clearInterval(interval1);
    }
  }, [isSpin1]);

  useEffect(() => {
    if (isSpin2) {
      const interval2 = setInterval(() => {
        setRandomNumber2(Math.random());
      }, 100);
      return () => clearInterval(interval2);
    }
  }, [isSpin2]);

  useEffect(() => {
    if (isSpin3) {
      const interval3 = setInterval(() => {
        setRandomNumber3(Math.random());
      }, 100);
      return () => clearInterval(interval3);
    }
  }, [isSpin3]);

  const spin = () => {
    setIsStart2(false);

    // Use functional update for `setItem` to avoid stale values
    setItem((prevItem) => (prevItem === null ? 0 : prevItem + 1));

    setIsSpin1(true);
    setIsSpin2(true);
    setIsSpin3(true);

    const timeouts = [];

    slotSpin1.play();
    // bossSpin1.play()

    timeouts.push(
      setTimeout(() => {
        finishSingleBoss.play();
        setIsSpin1(false);
      }, 30000)
    );

    timeouts.push(
      setTimeout(() => {
        finishSingleBoss.play();
        setIsSpin2(false);
      }, 40000)
    );

    timeouts.push(
      setTimeout(() => {
        finishSingleBoss.play();
        setIsSpin3(false);
      }, 50000)
    );

    timeouts.push(
      setTimeout(() => {
        // slotFinish.play();
        afterFinish.play();
        setIsSpinFinish(true);
      }, 55000)
    );

    timeouts.push(
      setTimeout(() => {
        setIsSpinFinish(false);
      }, 56000)
    );

    timeouts.push(
      setTimeout(() => {
        // afterFinish.play();
      }, 60000)
    );
    if (isJackpot) {
      setIsJackpot(false);
    }
    // Optional cleanup function to clear timeouts if needed
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (loading && count < 116) {
        spin();
        console.log("spin triggered");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    if (isJackpot) {
      spin();
    }
  }, [count]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (count === 116) {
  //       uffa.play();
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [count]);

  // const run = () => {
  //   spinButton.play();
  //   setTimeout(() => {
  //     setLoading(true);
  //     setCount(count + 1);
  //     setIsStart1(true);
  //   }, [3000]);
  //   console.log("run");

  //   setTimeout(() => {
  //     setIsStart1(false);

  //     setIsStart2(true);
  //     gameStart.play();
  //   }, [6500]);
  // };

  const [isStart1, setIsStart1] = useState(false);
  const [isStart2, setIsStart2] = useState(false);

  const handleReset = () => {
    axios.get("http://192.168.1.162:5001/resetBoss");
  };
  const [coolDown, setCoolDown] = useState(true);

  console.log("coolDown", coolDown);
  const handleJackpotSpin = () => {
   

    console.log("JACKPOT SPIN !!!");
    setIsJackpot(true);
    setCount(count + 1);
    setCoolDown(false);

    setTimeout(() => {
      setCoolDown(true);
    }, 5000);
  };
const [isStartButton, setIsStartButton] = useState(false)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setIsStartButton(true)
        startButtonBoss.play();
        setTimeout(()=>{

          handleJackpotSpin();
          setIsStartButton(false)
        },5000)
      }
    };

    // Add keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex bg-gradient-to-r from-[#FF688C] via-[#FF8CA5] to-[#FF5C6F]  shadow-xl w-screen h-screen">
      <img
        className="absolute w-screen h-screen left-0"
        src={`src/assets/gif2.gif`}
        alt=""
      />
      <div className="w-[100%] h-[200px]   flex flex-col pt-20  items-center gap-10 z-10">
        {/* <img className="w-[10%] " src={Logo_Eva} alt="" />
         <img className="w-[20%]" src={Logo_Image} alt="" /> */}
        <img className="w-[30%]" src={logo} alt="" />
      </div>
      <div className="  text-6xl p-2 flex flex-col items-center  w-full h-[30%]  top-[30%] left-0 absolute  gap-[50px]    ">
        <div
          className={` bg-[#F5E37E]  border-[20px] w-[60%] h-[200px] transition-all duration-1000 ease-in-out shadow-inner transform  ${
            isStart1 && "motion-preset-stretch "
          }  px-[12rem] py-[2rem]  flex items-center justify-center rounded-lg shadow-md  `}
        >
          <div className="w-[100%]   flex items-center justify-center shadow-innerxl  rounded-md">
            <div
              className={`${
                isStart2 && "motion-preset-oscillate "
              } font-dePixelHalbfett motion-preset-shake ${isStartButton && `motion-preset-blink`}  text-[#FF688C]  py-10 text-[5rem] drop-shadow-md uppercase`}
            >
              {allNumbers[item]?.item ? `SPECIAL RANDOM!!` : "SPECIAL GAME!!"}
              {/* {
              loading ? allItems[0]?.item : 'ARE'
              } */}
            </div>
          </div>
        </div>

        <div
          className={`flex gap-[50px] text-red-700 justify-center ${
            isSpinFinish && "motion-preset-confetti "
          } ${isStart2 && "motion-preset-blink "}`}
        >
          <div className=" w-[300px]  h-[300px] border-[20px] rounded-md border-white ">
            {isSpin1 && (
              <div className="bg-white font-dePixelBreit text-[15rem] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out  transform ">
                {randomNumber1.toFixed(10).slice(2, 3)}
              </div>
            )}
            {!isSpin1 && (
              <div
                className={`${
                  isSpin1 == false && "motion-preset-focus "
                } bg-white font-dePixelBreit text-[15rem] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out  transform `}
              >
                {input.user.length == 1
                  ? 0
                  : input.user.slice(0, 1)
                  ? input.user.slice(0, 1)
                  : 0}
              </div>
            )}
          </div>
          <div className="w-[300px]  h-[300px] border-[20px] rounded-md border-white ">
            {isSpin2 && (
              <div className="bg-white font-dePixelBreit text-[15rem] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center p-10 transition-all duration-1000 ease-in-out transform ">
                {randomNumber2.toFixed(10).slice(2, 3)}
              </div>
            )}
            {!isSpin2 && (
              <div
                className={`${
                  isSpin2 == false && "motion-preset-focus "
                } bg-white font-dePixelBreit text-[15rem] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out transform `}
              >
                {input.user.length == 2
                  ? 0
                  : input.user.slice(1, 2)
                  ? input.user.slice(1, 2)
                  : 0}
              </div>
            )}
          </div>
          <div className=" w-[300px]  h-[300px] border-[20px] rounded-md border-white">
            {isSpin3 && (
              <div className="bg-white font-dePixelBreit text-[15rem] shadow-inner shadow-black text-center flex w-full h-full items-center justify-center p-10 transition-all duration-1000 ease-in-out  transform ">
                {randomNumber3.toFixed(10).slice(2, 3)}
              </div>
            )}
            {!isSpin3 && (
              <div
                className={`${
                  isSpin3 == false && "motion-preset-focus "
                } bg-white font-dePixelBreit text-[15rem] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out  transform `}
              >
                {input.user.length == 1
                  ? 0
                  : input.user.slice(2, 3)
                  ? input.user.slice(2, 3)
                  : 0}
              </div>
            )}
          </div>
        </div>
        <div className="hidden  flex-col gap-5  absolute right-3 bg-red-white z-10 text-[20px]">
          {/* {count < 115 && (
             <button
               onClick={run}
               className={`bg-[#F5E37E]  text-[#FF688C] w-[500px] h-[200px]  p-[1.5rem] bottom-[10%] font-dePixelHalbfett text-[5rem]  rounded-md px-[2rem] drop-shadow-lg shadow-md`}
             >
               SPIN !
             </button>
           )} */}
          <button
            onClick={handleJackpotSpin}
            className={`bg-[#F5E37E]  text-[#FF688C] w-[170px] h-[50px]  hover:bg-white hover:text-black  bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md`}
          >
            JACKPOT!
          </button>
          <button
            onClick={() => setLoading(false)}
            className={`bg-[#F5E37E]  text-[#FF688C]  w-[170px] h-[50px] hover:bg-white hover:text-black  bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md`}
          >
            STOP
          </button>

          <button
            onClick={handleReset}
            className="bg-[#F5E37E]  text-[#FF688C]  w-[170px] h-[50px]  hover:bg-white hover:text-black   bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md"
          >
            {" "}
            RESET
          </button>
          <button
            onClick={() => {
              window.location = "/gamePage";
            }}
            className="bg-[#F5E37E]  text-[#FF688C]  w-[170px] h-[50px]  hover:bg-white hover:text-black   bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md"
          >
            {" "}
            MAIN
          </button>
          <button
            onClick={() => setVibe(!vibe)}
            className="bg-[#F5E37E]  text-[#FF688C]  w-[170px] h-[50px]  hover:bg-white hover:text-black   bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md"
          >
            {" "}
            VIBE {vibeVol.toString().slice(0, 3)}
          </button>
          <button
            onClick={() => setVibeVol(vibeVol + 0.1)}
            className="bg-[#F5E37E]  text-[#FF688C]  w-[170px] h-[50px]  hover:bg-white hover:text-black   bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md"
          >
            {" "}
            +
          </button>
          <button
            onClick={() => setVibeVol(vibeVol - 0.1)}
            className="bg-[#F5E37E]  text-[#FF688C]  w-[170px] h-[50px] hover:bg-white hover:text-black   bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md"
          >
            {" "}
            -
          </button>
        </div>

        <div className="w-full h-full flex flex-wrap pl-24 gap-5 text-[30px] px-10">
          {allFinishNumbers.map((data, index) => {
            return (
              <div
                className="flex flex-col items-center uppercase justify-center gap-5 motion-preset-expand border-[20px] bg-[#F5E37E] shadow-inner rounded-lg border-whiterounded-lg   p-5 "
                key={index}
              >
                <div className="font-dePixelHalbfett text-[#FF688C]  text-center w-full ">
                  {data.item}
                </div>
                <div className="bg-black h-[3px] w-full"></div>
                <div className="font-dePixelBreit drop-shadow-md ">
                  {data.user?.length === 1
                    ? "00" + data.user
                    : data.user?.length === 2
                    ? "0" + data.user
                    : data.user?.length === 3
                    ? data.user
                    : data.user}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameExtraPage;
