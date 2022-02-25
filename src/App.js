import "./styles.css";
import { useState, useEffect } from "react";

// sorting table can be easily done with : https://mdbootstrap.com/docs/react/tables/sort/
// But still continued with my logic to improve analyzing.
export default function App() {
  const [data, setData] = useState();
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    // here we can get this array from BE service
    let details = {
      details: [
        { contractName: "zef", contractOwner: "Wasif", contractVal: "5000" },
        { contractName: "xyz", contractOwner: "Ali", contractVal: "2000" },
        { contractName: "def", contractOwner: "Saad", contractVal: "4000" },
        { contractName: "efg", contractOwner: "Asad", contractVal: "3000" }
      ]
    };
    setData(details);
  }, []);

  const handleSearch = (event) => {
    event.target.value == "" && setSearchData("");
    let nameArr = [];
    data.details.map((student, index) => {
      const { contractName, contractOwner, contractVal } = student;
      nameArr.push(contractName);
    });
    console.log(nameArr + " " + "" + event.target.value);
    console.log(
      nameArr.filter((item) =>
        item.toLowerCase().startsWith(event.target.value)
      )
    );
    setSearchData(
      nameArr.filter((item) =>
        item.toLowerCase().startsWith(event.target.value)
      )
    );
  };

  const onSort = (event, sortKey) => {
    const sortData = data.details;
    console.log(event.target, sortKey, "data");
    sortData.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    let sortedData = {
      details: sortData
    };
    setData(sortedData);
  };

  return (
    <div className="App">
      {data && data.details[0] && (
        <div>
          <h1 id="title">Contract Dynamic Table</h1>
          <input type="text" placeholder="search" onChange={handleSearch} />
          <div>{searchData}</div>
          <table id="details">
            <tbody>
              <tr>
                {Object.keys(data.details[0]).map((key, index) => {
                  return (
                    <th onClick={(e) => onSort(e, key)} key={index}>
                      {key.toUpperCase()}
                    </th>
                  );
                })}
              </tr>
              {data.details.map((student, index) => {
                const { contractName, contractOwner, contractVal } = student;
                return (
                  <tr key={contractName}>
                    <td>{contractName}</td>
                    <td>{contractOwner}</td>
                    <td>{contractVal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
