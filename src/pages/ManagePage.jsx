import React, { useEffect, useState } from "react";
import Logo_Image from "../assets/images/logo/Logo.svg";
import Logo_Eva from "../assets/images/logo/Group.svg";
import Logo from "../assets/images/logo/Group 11.svg";
import axios from "axios";

function ManagePage() {
  const [trigger, setTrigger] = useState(false)
  const [arr, setArr] = useState([]);


  const fetchData = () => {
    console.log("first")
    axios
      .get("http://192.168.1.162:5001/readManagePage")
      .then((res) => setArr(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 10000);
    fetchData(); // Initial fetch
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="bg-gradient-to-r font-dePixelHalbfett from-[#FFC039] via-[#FAEEAC] to-[#FFFADB] shadow-xl w-screen h-screen flex flex-col">
      {/* Logo Section */}
      <div className="w-full h-[20%] flex justify-center items-center">
        <img src={Logo} alt="Logo" className="object-scale-down" />
      </div>

      {/* Table Section */}
      <div className="flex  justify-evenly px-[2rem]">
        {[0, 20, 40, 60, 80, 100].map((start, tableIndex) => {
          const end = start + 20; // Define range for each table
          const filteredData = arr.filter(data => data.user > start && data.user <= end); // Filter data for this table
          return (
            <div className="overflow-y-auto h-full w-[16%] uppercase -gray-300 rounded-md" key={tableIndex}>
              <table className="w-full -collapse">
                <thead className="bg-[#FF688C] text-white sticky top-0 z-10 pb-5">
                  <tr>
                    <th className="px-6 py-4 text-[1.25rem] text-center">User</th>
                    <th className="px-6 py-4 text-[1.25rem] text-center">Item</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data, index) => {
                    const isLastRow = index === filteredData.length - 1; // Last row in this filtered dataset
                    return (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} ${isLastRow ? "motion-preset-slide-right motion-duration-1000" : ""
                          }`}
                      >
                        <td className="px-6 py-4 text-[1.5rem] text-center -gray-300">
                          {data.user}
                        </td>
                        <td className="px-6 py-4 text-[1.5rem] text-center -gray-300">
                          {data.item}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}


      </div>
    </div>
  );
}

export default ManagePage;
