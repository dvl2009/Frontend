import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import { getAllUsers } from './api'
import Iframe from "react-iframe";
import Amplify, { Auth, Hub } from "aws-amplify";
import { signIn, signUp } from "./cognito.js";
import { useNavigate } from "react-router-dom";

function App() {
  const [body, setBody] = useState([]);
  const [body1, setBody1] = useState([]);
  const [body2, setBody2] = useState([]);
  const [body3, setBody3] = useState([]);
  const [body4, setBody4] = useState([]);
  const [body5, setBody5] = useState([]);
  const [quicksightUrl, setquicksightUrl] = useState("");
  const [searchText, setText] = useState("");
  const navigate = useNavigate();
  function arrowFun(val) {
    if (val.past_ranking == null) {
      return "↑";
    } else if (val.ranking < val.past_ranking) {
      return "↑";
    } else if (val.ranking > val.past_ranking) {
      return "↓";
    }
    return "↑";
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/charts"
        );
        console.log("success: ", res);
        const qsUrl = res.data.EmbedUrl;
        setquicksightUrl(qsUrl);
        // setBody(res.data.athenaQueryRes);
      } catch (err) {
        console.log("err: ", err);
        return err;
      }
    }
    fetchData();
    async function fetchData1() {
      try {
        const res = await axios.get(
          "https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/topplayers?interval=24&count=3"
        );
        const res1 = await axios.get(
          "https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/topplayers?interva=24&count=3"
        );
        const res2 = await axios.get(
          "https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/topplayers?sentiment=NEGATIVE&interval=24&count=3"
        );
        const res3 = await axios.get(
          "https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/topplayers?sentiment=POSITIVE&interval=24&count=3"
        );
        const res4 = await axios.get(
          "https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/topplayers?sentiment=NEGATIVE&interval=168&count=3"
        );
        const res5 = await axios.get(
          "https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/topplayers?sentiment=POSITIVE&interval=168&count=3"
        );
        setBody(res.data);
        setBody1(res1.data);
        setBody2(res2.data);
        setBody3(res3.data);
        setBody4(res4.data);
        setBody5(res5.data);
      } catch (err) {
        console.log("err: ", err);
        return err;
      }
    }
    fetchData1();
  }, []);

  return (
    <div className="App">
      {/* <button onClick={() => Auth.federatedSignIn()}>SignIn</button> */}
      <div>
        <input
          className="form-input"
          onChange={(e) => setText(e.target.value)}
          value={searchText}
        ></input>
        <button
          onClick={() => {
            navigate("/search/" + searchText);
          }}
          className="btn-lg btn-danger"
          type="submit"
        >
          Search
        </button>
      </div>
      <table>
        <tr>
          <th>
            <div>
              <p> Top 3 liked players of today </p>
              <table>
                <tr>
                  <th> NAME </th> <th> RANKING </th> <th> TWEETS </th>
                </tr>
                {body3.map((val) => {
                  return (
                    <tr>
                      <td> {val.player_full_name} </td>  
                      <td>
                          
                        {val.ranking} {arrowFun(val)}  
                      </td>
                      <td> {val.count} </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </th>
          <th>
            <div>
              <p> Top 3 Disliked players of today </p>
              <table>
                <tr>
                  <th> NAME </th> <th> RANKING </th> <th> TWEETS </th>
                </tr>
                {body2.map((val) => {
                  return (
                    <tr>
                      <td> {val.player_full_name} </td>  
                      <td>
                          
                        {val.ranking} {arrowFun(val)}  
                      </td>
                      <td> {val.count} </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </th>
          <th>
            <div>
              <p> All players of today </p>
              <table>
                <tr>
                  <th> NAME </th> <th> RANKING </th> <th> TWEETS </th>
                </tr>
                {body.map((val) => {
                  return (
                    <tr>
                      <td> {val.player_full_name} </td>
                      <td>
                          
                        {val.ranking} {arrowFun(val)}  
                      </td>
                      <td> {val.count} </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </th>
        </tr>
        <tr>
          <th>
            <div>
              <p> Top 3 liked players of this week </p>
              <table>
                <tr>
                  <th> NAME </th> <th> RANKING </th> <th> TWEETS </th>
                </tr>
                {body5.map((val) => {
                  return (
                    <tr>
                      <td> {val.player_full_name} </td>  
                      <td>
                          
                        {val.ranking} {arrowFun(val)}  
                      </td>
                      <td> {val.count} </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </th>
          <th>
            <div>
              <p> Top 3 Disliked players of this week </p>
              <table>
                <tr>
                  <th> NAME </th> <th> RANKING </th> <th> TWEETS </th>
                </tr>
                {body4.map((val) => {
                  return (
                    <tr>
                      <td> {val.player_full_name} </td>                     
                       <td>
                        {val.ranking} {arrowFun(val)}
                      </td>
                      <td> {val.count} </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </th>
          <th>
            <div>
              <p> All players of this week </p>
              <table>
                <tr>
                  <th> NAME </th> <th> RANKING </th> <th> TWEETS </th>
                </tr>
                {body1.map((val) => {
                  return (
                    <tr>
                      <td> {val.player_full_name} </td>
                      <td>
                        {val.ranking} {arrowFun(val)}
                      </td>
                      <td> {val.count} </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </th>
        </tr>
      </table>
      <Iframe
        url={quicksightUrl}
        width="1000px"
        height="1000px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
}

export default App;
