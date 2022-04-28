  import React,{useState} from 'react';
  import { useParams } from 'react-router-dom';
  import axios from "axios";

  const Search = () => {
      const {searchTerm} = useParams();
      const [body, setBody] = useState([]);
      const [body1, setBody1] = useState([]);


      async function fetchData() {
          try{
            const res = await axios.get('https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/playerv2?fullname='+searchTerm);
            const res1 = await axios.get('https://sgc0m5do03.execute-api.us-east-1.amazonaws.com/dev/tweets?fullname='+searchTerm+'&count=1');
            console.log("success: ", res)
            setBody(res.data);
            setBody1(res1.data);
          } catch(err){
            console.log("err: ", err)
            return err
          }
        };
        fetchData();
      return (
          <div>
            <div>
              {body.map((val) => {
                if(val.interval=="week" && val.sentiment=='all'){
                    return (
                      <div>
                        <h1>{val.player_full_name}</h1>
                        <table>
                          <tr>ranking : {val.ranking}  </tr> 
                          <tr>total tweet count : {val.count}</tr>
                          <tr>past ranking : {val.past_ranking}</tr>
                          <tr>past tweet count : {val.past_count}</tr>
                      </table>
                      </div>
                    );}
                  }
                  )}
              </div>
              <div>
              {body.map((val) => {
                if(val.interval=="day" && val.sentiment=='positive'){
                    return (
                      <div>
                      <td>today's postive ranking : {val.ranking} </td> 
                      </div>
                    );}
                  }
                  )}
              </div>
              <div>
              {body.map((val) => {
                if(val.interval=="day" && val.sentiment=='negative'){
                    return (
                      <div>
                      <td>today's negative ranking : {val.ranking} </td> 
                      </div>
                    );}
                  }
                  )}
              </div>
              <div>
              {body.map((val) => {
                if(val.interval=="week" && val.sentiment=='positive'){
                    return (
                      <div>
                      <td>weekly postive ranking : {val.ranking} </td> 
                      </div>
                    );}
                  }
                  )}
              </div>
              <div>
              {body.map((val) => {
                if(val.interval=="week" && val.sentiment=='negative'){
                    return (
                      <div>
                      <td>weekly negative ranking : {val.ranking} </td> 
                      </div>
                    );}
                  }
                  )}
              </div>
              <div>
                <h2>Tweets</h2>
              {body1.map((val) => {
                    return (
                      <div>
                      <tr>{val.sentiment}</tr>  
                      <tr>{val.tweet_text}</tr>
                      <br></br>
                      </div>
                    );
                  }
                  )}
              </div>
          </div>
      );
  };

  export default Search;