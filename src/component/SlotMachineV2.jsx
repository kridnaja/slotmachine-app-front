import React, { useState, useEffect, useRef } from "react";
import Box_Main from "../assets/images/UI/Box_Main.svg";
import Box_Top from "../assets/images/UI/Box_Top.svg";
import Logo_Image from "../assets/images/logo/Logo.svg";
import Logo_Eva from "../assets/images/logo/Group.svg";

import axios from "axios";

const SlotMachine = () => {
  const [slotSpin] = useState(new Audio("src/assets/slotSpin1.mp3"));
  const [slotFinish] = useState(new Audio("src/assets/finishAllSpin2.wav"));

  const [spinFinishSingleNumber] = useState(
    new Audio("src/assets/finishSingleSpin2.wav")
  );

  const [startSpin] = useState(new Audio("src/assets/startSpin2.mp3"));

  const [gameStart] = useState(new Audio(`src/assets/gameStart.wav`));
  const [yeah] = useState(new Audio(`src/assets/yeah.mp3`));

  const [spinButton] = useState(new Audio(`src/assets/spinButton.mp3`));

  const [afterFinish] = useState(new Audio("src/assets/afterFinish.mp3"));

  const [uffa] = useState(new Audio("src/assets/uffa.mp3"));

  const [button1] = useState(new Audio("src/assets/button1.mp3"));

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

  const [allFinishNumbers, setAllFinishNumbers] = useState([]);

  const [isSpinFinish, setIsSpinFinish] = useState(false);

  const [allItems, setAllItems] = useState([]);

  const [count, setCount] = useState(null);
  console.log(count);

  const [isGif, setIsGif] = useState(false);

  useEffect(() => {
    axios.get("http://192.168.1.162:5001/read").then((res) => {
      const listNumber = [];
      const findUserThatStillNull = res.data.filter(
        (data) => data.user === null
      );

      const findItemThatUserStillNull = res.data.filter(
        (data) => data.user === null
      );
      if (findItemThatUserStillNull) {
        setAllItems(findItemThatUserStillNull);
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
        axios.post("http://192.168.1.162:5001/create", input);
        setAllNumbers(res.data);
      }
    });
  }, [item]);

  useEffect(() => {
    console.log("created to database");
    axios.post("http://192.168.1.162:5001/create", input);
  }, [count]);

  useEffect(() => {
    if (isSpin1) {
      const interval1 = setInterval(() => {
        setRandomNumber1(Math.random() * 9);
      }, 100);
      return () => clearInterval(interval1);
    }
  }, [isSpin1]);

  useEffect(() => {
    if (isSpin2) {
      const interval2 = setInterval(() => {
        setRandomNumber2(Math.random() * 9);
      }, 100);
      return () => clearInterval(interval2);
    }
  }, [isSpin2]);

  useEffect(() => {
    if (isSpin3) {
      const interval3 = setInterval(() => {
        setRandomNumber3(Math.random() * 9);
      }, 100);
      return () => clearInterval(interval3);
    }
  }, [isSpin3]);

  const spin = () => {
    setIsStart2(false);

    setItem((prevItem) => (prevItem === null ? 0 : prevItem + 1));

    setIsSpin1(true);
    setIsSpin2(true);
    setIsSpin3(true);

    slotSpin.play();

    const timeouts = [];

    timeouts.push(
      setTimeout(() => {
        setIsSpin1(false);
        spinFinishSingleNumber.play();
      }, 5000)
    );

    timeouts.push(
      setTimeout(() => {
        spinFinishSingleNumber.play();

        setIsSpin2(false);
      }, 10000)
    );

    timeouts.push(
      setTimeout(() => {
        spinFinishSingleNumber.play();
        setIsSpin3(false);
      }, 15000)
    );

    timeouts.push(
      setTimeout(() => {
        setIsSpinFinish(true);
        slotFinish.play();
      }, 16000)
    );

    timeouts.push(
      setTimeout(() => {
        setIsSpinFinish(false);
      }, 17000)
    );

    timeouts.push(
      setTimeout(() => {
        afterFinish.play();
      }, 19500)
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (loading && count < 115) {
        spin();
        console.log("spin triggered");
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [count]);

  const run = () => {
    spinButton.play();
    setTimeout(() => {
      startSpin.play();
      setLoading(true);
      setCount(count + 1);
      setIsStart1(true);
    }, [1000]);
    console.log("run");

    setTimeout(() => {
      yeah.play();
      setIsGif(true);
    }, 9500);
    setTimeout(() => {
      setIsStart1(false);

      setIsStart2(true);
      gameStart.play();
    }, [18000]);
  };

  const [isStart1, setIsStart1] = useState(false);
  const [isStart2, setIsStart2] = useState(false);

  const handleReset = () => {
    console.log("reset");
    axios.get("http://localhost:5001/reset");
  };

  useEffect(() => {
    const handleResetButton = (event) => {
      if (event.key === "r") {
        handleReset();

      }
    };
    window.addEventListener("keydown", handleResetButton);

    return () => {
      window.removeEventListener("keydown", handleResetButton);
    };
  }, []);

  useEffect(() => {
    const handleToBoss = (event) => {
      if (event.key === "t") {
        window.location = '/gameExtraPage'
      }
    };

    return () => {
      window.removeEventListener("keydown", handleToBoss);
    };
  }, []);


  useEffect(() => {
    const handleStop = (event) => {
      if (event.key === "s") {
        setCount(count - 1);
        setLoading(false);
      }
    };
    window.addEventListener("keydown", handleStop);

    return () => {
      window.removeEventListener("keydown", handleStop);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (allItems[0]?.item.slice(0, 2) == "ss") {
        uffa.play();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  const handleJackpotSpin = () => {
    

    if (!localStorage.getItem("isSpin")) {
      localStorage.setItem("isSpin", true);
      run();

      return;
    }
    button1.play()

    setTimeout(()=>{
      gameStart.play()
    },500)

    if (localStorage.getItem("isSpin")) {
      setTimeout(() => {
        spin();
      }, 3000);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        // handleJackpotSpin();
        run()

      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
 


  return (
    <div className="flex overflow-hidden  bg-gradient-to-r  from-[#FF688C] via-[#FF8CA5] to-[#FF5C6F]  shadow-xl w-screen h-screen">
        <img
          className="absolute w-screen h-screen left-0"
          src={`src/assets/gif.gif`}
          alt=""
        />
      <div className="w-[100%] h-[200px]  object-scale-down flex flex-col pt-[70px]  items-center gap-10 z-10">
        <img className="w-[10%] " src={Logo_Eva} alt="" />
        <img className="w-[20%]" src={Logo_Image} alt="" />
      </div>
      <div className="  text-6xl p-2 flex flex-col items-center  w-full h-[30%]  top-[25%] left-0 absolute  gap-[30px]    ">
        <div
          className={` bg-[#F5E37E] border-[20px] w-[60%] h-[200px] transition-all duration-1000 ease-in-out shadow-inner transform  ${
            isStart1 && "motion-preset-stretch "
          }  px-[12rem] py-[2rem]  flex items-center justify-center rounded-lg shadow-md  `}
        >
          <div className="w-full flex items-center justify-center shadow-innerxl  rounded-md">
            <div
              className={`${
                isStart2 && "motion-preset-oscillate "
              } font-dePixelHalbfett motion-preset-shake text-[#FF688C] py-10 text-[5rem] drop-shadow-md uppercase`}
            >
              {/* {allNumbers[item]?.item
                ? allNumbers[item]?.item
                : count > 120
                ? "THANK YOU ~"
                : "ARE YOU READY?"} */}
              {/* {
                  count > 119 ? 'Thankyou ~' : loading ? allItems[0]?.item : 'ARE YOU READY?'
                } */}
              {/* {
                  allItems[0] ? allItems[0]?.item : count > 120 ? 'Thankyou ~' : 'ARE YOU READY?'
                } */}
              {allItems[0] ? allItems[0]?.item : "???"}
            </div>
          </div>
        </div>

        <div
          className={`flex gap-[50px] justify-center ${
            isSpinFinish && "motion-preset-confetti "
          } ${isStart2 && "motion-preset-blink "}`}
        >
          <div className=" w-[300px]  h-[300px] border-[20px] rounded-md border-white ">
            {isSpin1 && (
              <div className="bg-white font-dePixelBreit text-[200px] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out  transform ">
                {randomNumber1.toFixed(10).slice(2, 3)}
              </div>
            )}
            {!isSpin1 && (
              <div
                className={`${
                  isSpin1 == false && "motion-preset-focus "
                } bg-white font-dePixelBreit text-[200px] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out  transform `}
              >
                {input.user.length == 1
                  ? 0
                  : input.user.slice(0, 1)
                  ? input.user.slice(0, 1)
                  : 0}
              </div>
            )}
          </div>
          <div className="w-[300px]  h-[300px]  border-[20px] rounded-md border-white ">
            {isSpin2 && (
              <div className="bg-white font-dePixelBreit text-[200px] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center p-10 transition-all duration-1000 ease-in-out transform ">
                {randomNumber2.toFixed(10).slice(2, 3)}
              </div>
            )}
            {!isSpin2 && (
              <div
                className={`${
                  isSpin2 == false && "motion-preset-focus "
                } bg-white font-dePixelBreit text-[200px] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out transform `}
              >
                {input.user.length == 2
                  ? 0
                  : input.user.slice(1, 2)
                  ? input.user.slice(1, 2)
                  : 0}
              </div>
            )}
          </div>
          <div className="w-[300px]  h-[300px]  border-[20px] rounded-md border-white">
            {isSpin3 && (
              <div className="bg-white font-dePixelBreit text-[200px] shadow-inner shadow-black text-center flex w-full h-full items-center justify-center p-10 transition-all duration-1000 ease-in-out  transform ">
                {randomNumber3.toFixed(10).slice(2, 3)}
              </div>
            )}
            {!isSpin3 && (
              <div
                className={`${
                  isSpin3 == false && "motion-preset-focus "
                } bg-white font-dePixelBreit text-[200px] shadow-inner shadow-black  text-center flex w-full h-full items-center justify-center transition-all duration-1000 ease-in-out  transform `}
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
        <div className="hidden  flex-col gap-5  absolute right-3 bg-red-white z-10">
          {count < 115 && (
            <button
              onClick={run}
              className={`bg-[#F5E37E]  text-[#FF688C] w-[200px] h-[100px] text-[30px]  bottom-[10%] font-dePixelHalbfett  rounded-md  drop-shadow-lg shadow-md`}
            >
              SPIN !
            </button>
          )}
          {count > 114 && (
            <button
              onClick={handleJackpotSpin}
              className={`bg-[#F5E37E] animate-pulse text-[#FF688C] w-[200px] h-[100px] text-[20px]  p-[1.5rem] bottom-[10%] font-dePixelHalbfett   rounded-md px-[2rem] drop-shadow-lg shadow-md`}
            >
              JACKPOT!
            </button>
          )}
          <button
            onClick={() => {
              setCount(count - 1);
              setLoading(false);
            }}
            className={`bg-[#F5E37E] text-[#FF688C] w-[200px] h-[100px] text-[30px]  bottom-[10%] font-dePixelHalbfett  rounded-md px-[2rem] drop-shadow-lg shadow-md`}
          >
            STOP
          </button>

          <button
            onClick={handleReset}
            className="bg-[#F5E37E] text-[#FF688C] w-[200px] h-[100px] text-[30px] bottom-[10%] font-dePixelHalbfett rounded-md px-[2rem] drop-shadow-lg shadow-md"
          >
            {" "}
            RESET
          </button>
          <button
            onClick={() => {
              window.location = "/gameExtraPage";
            }}
            className="bg-[#F5E37E] text-[#FF688C] w-[200px] h-[100px] text-[15px]  bottom-[10%] font-dePixelHalbfett rounded-md px-[2rem] drop-shadow-lg shadow-md"
          >
            {" "}
            BOSS PAGE
          </button>
        </div>

        <div className="w-full pl-20 pt-20 h-full flex flex-wrap gap-3  ">
          {allFinishNumbers.map((data, index) => {
            return (
              <div
                className="flex flex-col text-[30px] w-[200px] items-center uppercase justify-center gap-3 p-1 motion-preset-expand border-[3px]  bg-[#F5E37E] shadow-inner rounded-md border-whiterounded-lg"
                key={index}
              >
                <div
                  className={`font-dePixelHalbfett text-[#FF688C]  text-center w-full ${
                    data.item.slice(0, 2) === "ss" &&
                    "animation-delay-1000 animate-pulse"
                  }`}
                >
                  {data.item}
                </div>
                <div className="bg-black h-[2px] w-full"></div>
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
};

export default SlotMachine;
