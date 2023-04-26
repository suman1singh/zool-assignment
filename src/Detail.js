import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./App.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Detail() {
  const [recordid, setRecordid] = useState({});
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const recordId = location.state.id;

  async function getDataid() {
    const options = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com/coins`,
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "50",
        offset: "0",
      },
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "8a945daf82msh1ec52076ebf31bbp115fe8jsn2222a4273d25",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    setRecordid(response.data);
    setRender(true);
  }

  useEffect(() => {
    getDataid();
  }, []);

  function gotoList() {
    navigate("/");
  }

  return (
    <div className="main">
      <h1>Details</h1>
      {render && (
        <Table bordered>
          <tbody>
            <tr>
              <td>
                <p>
                  Symbol:
                  <br /> {recordid.data.coins[recordId].symbol}{" "}
                </p>
              </td>
              <td>
                <p>
                  Name: <br />
                  {recordid.data.coins[recordId].name}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                Price (USD):
                <br /> {recordid.data.coins[recordId].price}
              </td>
              <td>
                Change (%): <br />
                {recordid.data.coins[recordId].change < 0 ? (
                  <div>
                    {" "}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmu-EeABS5TkUKIt25tbT1CiYct2aYFDXamw&usqp=CAU"
                      alt="down"
                      width="35"
                      height="35"
                    />
                    <span style={{ color: "red" }}>
                      {recordid.data.coins[recordId].change}
                    </span>
                  </div>
                ) : (
                  <div>
                    <img
                      src="https://www.pngkey.com/png/detail/379-3790415_arrows-green-triangle-logo-with-m.png"
                      alt="down"
                      width="15"
                      height="15"
                      className="img"
                    />
                    <span style={{ color: "green" }}>
                      {recordid.data.coins[recordId].change}
                    </span>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                Market Cap (USD): <br />{" "}
                {recordid.data.coins[recordId].marketCap}
              </td>
              <td>
                Rank: <br /> {recordid.data.coins[recordId].rank}
              </td>
            </tr>
            <tr>
              <td>24 Hour Volume: {recordid.data.coins[recordId].vol}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      )}
      <button
        type="button"
        className="btn"
        style={{ background: "green", color: "white" }}
        onClick={() => gotoList()}
      >
        Back to List
      </button>
    </div>
  );
}
