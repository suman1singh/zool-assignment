import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";
import "./App.css";

export default function Main() {
  const [record, setRecord] = useState([]);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  async function getData() {
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
    setRecord(response.data);
    setRender(true);
  }

  useEffect(() => {
    getData();
  }, []);

  function gotoDetails(id) {
    navigate(`/detail/${id}`, { state: { id: id } });
  }

  return (
    <Fragment>
      <div className="main">
        <h4>Price Listing</h4>
        {render && (
          <Table bordered>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Price (USD)</th>
                <th>Change(%)</th>
              </tr>
            </thead>
            <tbody>
              {record.data.coins.map((e, id) => (
                <tr key={id}>
                  <td>
                    <div onClick={() => gotoDetails(id)}>
                      <Link>{e.symbol}</Link>
                    </div>
                  </td>
                  <td>{e.name}</td>
                  <td>{e.price}</td>
                  <td>
                    {e.change < 0 ? (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmu-EeABS5TkUKIt25tbT1CiYct2aYFDXamw&usqp=CAU"
                        alt="down"
                        width="35"
                        height="35"
                      />
                    ) : (
                      <img
                        src="https://www.pngkey.com/png/detail/379-3790415_arrows-green-triangle-logo-with-m.png"
                        alt="down"
                        width="15"
                        height="15"
                        className="img"
                      />
                    )}
                    <span>
                      {e.change < 0 ? (
                        <span style={{ color: "red" }}>{e.change}</span>
                      ) : (
                        <span style={{ color: "green" }}>{e.change}</span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Fragment>
  );
}
