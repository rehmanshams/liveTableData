import { useEffect, useState } from "react";
import "./App.css";
import { Reorder } from "framer-motion";

function App() {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setFetchData();
      console.log("Table Updated");
    }, 500);
    return () => clearInterval(interval);
  }, [getData]);
  // const setFetchData = async () => {
  //   const data = await fetch(
  //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  //   );
  //   const getFetchData = await data.json();
  //   const sortData = getFetchData.sort(
  //     (e, b) => b.price_change_percentage_24h - e.price_change_percentage_24h
  //   );
  //   setGetData(sortData);
  // };
  const setFetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const getFetchData = await response.json();
      if (
        !Array.isArray(getFetchData) ||
        !getFetchData.every((item) => "price_change_percentage_24h" in item)
      ) {
        throw new Error("Invalid data format");
      }
      const sortData = getFetchData.sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
      setGetData(sortData);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Live Table Data
          </h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <Reorder.Group values={getData} onReorder={setGetData}>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="w-full bg-gray-100">
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name Symbol Image
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Market
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Volume
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Price Change
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Percantage
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Up / Down
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getData && getData.length && getData.length != 0 ? (
                    getData?.map((item) => (
                      <Reorder.Item
                        as="tr"
                        key={item.price_change_percentage_24h}
                        value={item.price_change_percentage_24h}
                      >
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={item.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item.name}
                              </p>
                              <p className="text-gray-600 whitespace-no-wrap">
                                {item.symbol}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold">
                            ${item.current_price}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">
                            USD
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold">
                            {item.market_cap}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold">
                            {item.total_volume}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold">
                            {item.price_change_24h}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold">
                            % {item.price_change_percentage_24h}
                          </p>
                        </td>
                        {item.price_change_percentage_24h > 0 ? (
                          <td className="px-5 py-[26px] border-b border-gray-200 text-sm flex justify-start items-center">
                            <p className="text-white font-extrabold whitespace-no-wrap bg-green-400 py-2 px-6 rounded-full">
                              Going Up
                            </p>
                          </td>
                        ) : (
                          <td className="px-5 py-[26px] border-b border-gray-200  text-sm flex justify-start items-center">
                            <p className="text-white font-extrabold whitespace-no-wrap bg-red-400 py-2 px-6 rounded-full">
                              Going Down
                            </p>
                          </td>
                        )}
                      </Reorder.Item>
                    ))
                  ) : (
                    <tr>
                      <td colspan="8" className="text-center p-4">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Reorder.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
