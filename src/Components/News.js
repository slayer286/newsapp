import React, { useEffect,useState } from "react";

import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { cleanup } from "@testing-library/react";


const News=(props)=> {

   const [articles,setarticles]=useState([]);
   const [loading,setloading]=useState(true);
   const [page,setpage]=useState(1);
   const [tot_res,settot_res]=useState(0);


  
    
    
 

 const cap=(l)=>{
    return l.charAt(0).toUpperCase() +l.slice(1);
  }

  const update= async ()=>{

    props.setprogress(10);
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=42c1ff728ebe4ed2bf3774ec4d9ef092&page=${page }&pagesize=${props.pagesize}`;

    setloading(true)
    let data = await fetch(url);
    props.setprogress(30);
    let parsed_data = await data.json();
    props.setprogress(50);

    setarticles(parsed_data.articles);
    setloading(false);
    settot_res(parsed_data.totalResults);
    
    
    props.setprogress(100);
  }

  useEffect(()=>{
     document.title= `${cap(props.category)}-Newsmania`;
    update();
    
  },[])

  

  const increase = async () => {
   
     setpage(page+1);
   
    update();
    
    

  };

  const decrease = async () => {
     setpage(page-1);
   
    update();
    
    
    
  };

  const fetchMoreData=async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=42c1ff728ebe4ed2bf3774ec4d9ef092&page=${page+1}&pagesize=${props.pagesize}`;
    setpage(page+1);
    
    
    let data = await fetch(url);
    let parsed_data = await data.json();
    setarticles(articles.concat(parsed_data.articles))
    
  }
  
  
    return (
      <>
        <div className="conatiner my-3" style={{ textAlign: "center" }}>
          <h1 style={{font : "Times New Roman (serif)", margin:"4rem 0 1rem 0" }}>Get updated with daily dose of sensational and trending news</h1>
          {loading && <Spinner />}
        </div>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length<tot_res}
          
          loader={<Spinner/>}
        >

        <div
          className="container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          { articles.map((element,index) => {
            return (
              <Newsitem
                key={index}
                title={element.title}
                description={element.description}
                imgurl={element.urlToImage}
                newsurl={element.url}
                author={element.author?element.author:"Unknown"}
                date={element.publishedAt}
                name={element.source.name}
              />
            );
          })}
          <div className="container my-3 d-flex justify-content-between">
            <button
              type="button"
              disabled={page <= 1}
              className="btn btn-dark"
              onClick={decrease}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={page + 1 >= Math.ceil(tot_res / props.pagesize)}

              className="btn btn-dark"
              onClick={increase}
            >
              Next &rarr;
            </button>
          </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }


export default News;


News.defaultProps = {
  country: 'in',
  pagesize: 4,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}