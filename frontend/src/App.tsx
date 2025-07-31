import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const initiateSwap = () => {};
  const showEthereum = () => {
    setClicked("evm");
  };
  const showCosmos = () => {
    setClicked("cosmos");
  };

  // 0 - evm->cosmos
  // 1 - cosmos->evm
  const [type, setType] = useState(0);
  const [clicked, setClicked] = useState<"cosmos" | "evm" | undefined>(
    undefined
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={
            clicked
              ? {
                  border: "solid 1px grey",
                  height: 400,
                  width: 600,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }
              : {}
          }
        >
          {clicked && (
            <button
              style={{ marginLeft: "auto" }}
              onClick={() => setClicked(undefined)}
            >
              close
            </button>
          )}
          {type ? (
            <div style={{ display: "flex" }}>
              <a onClick={showEthereum} style={{ cursor: "pointer" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1777/1777889.png"
                  className="logo"
                  alt="Vite logo"
                />
              </a>
              <a onClick={showCosmos} style={{ cursor: "pointer" }}>
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <a href=""></a>
              <a onClick={showCosmos} style={{ cursor: "pointer" }}>
                <img src={reactLogo} className="logo" alt="React logo" />
              </a>
              <a onClick={showEthereum} style={{ cursor: "pointer" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1777/1777889.png"
                  className="logo"
                  alt="Ethereum logo"
                />
              </a>
            </div>
          )}
          {clicked == "evm" && (
            <div>
              <p>Ethereum</p>
              <label htmlFor="chain-select">Choose a pet:</label>

              <select name="chains" id="chain-select">
                <option value="">--Please choose an option--</option>
                <option value="dog">Base</option>
              </select>

              <button>Select chain</button>
              display tokens...
              after completed same for cosmos
            </div>
          )}
          {clicked == "cosmos" && (
            <div>
              <p>Cosmos</p>
            </div>
          )}
        </div>
        {type ? (
          <div style={{ display: "flex" }}>
            <a onClick={showEthereum} style={{ cursor: "pointer" }}>
              <h1>EVM to &nbsp;</h1>
            </a>
            <a onClick={showCosmos} style={{ cursor: "pointer" }}>
              <h1>Cosmos</h1>
            </a>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <a href=""></a>
            <a onClick={showCosmos} style={{ cursor: "pointer" }}>
              <h1>Cosmos to &nbsp;</h1>
            </a>
            <a onClick={showEthereum} style={{ cursor: "pointer" }}>
              <h1>Evm</h1>
            </a>
          </div>
        )}
      </div>
      <button style={{ width: 200 }} onClick={() => setType((type + 1) % 2)}>
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/app-common-icons-2/swap_horiz-1.png"
          width={40}
          height={40}
          alt=""
        />
      </button>
      <div
        style={{
          border: "solid 1px gray",
          borderRadius: 10,
          width: "100%",
          padding: 12,
        }}
      >
        <div>token a</div>
        <div>token b</div>
        <div>amount</div>
        <button style={{ width: "100%" }} onClick={initiateSwap}>
          swap
        </button>
      </div>
      <div style={{ border: "solid 1px gray", borderRadius: 10 }}>
        <p>current tx status</p>
        <p>explorer</p>
        <p>
          view in explorer: <a href="#">EVM</a> <a href="#">Cosmos</a>
        </p>
      </div>
    </div>
  );
}

export default App;
