import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
    
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [totalResults, setTotalResults] = useState(0);

 


  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
       
    const updateNews= async()=>{
      props.setProgress(10)
      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9425c53eb3394aadbd2d73464c460e99&page=${page}&pageSize=${props.pageSize} `
      setLoading(true);
      let data= await fetch(url);
      props.setProgress(20)
      let parsedData = await data.json();
      props.setProgress(50)
      console.log(parsedData);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - NewsDaily`
    updateNews();
  }, []);


     const handlePrevClick = async ()=>{
//       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9425c53eb3394aadbd2d73464c460e99&page=${page-1}&pageSize=${props.pageSize}`
//       setLoading(true)
// let data= await fetch(url);
// let parsedData = await data.json();
// console.log(parsedData);
// this.setState({
//   articles:parsedData.articles,
//   page:this.state.page - 1,
//   loading:false

setPage(page-1);
updateNews()
}
      
    
    const handleNextClick = async ()=>{

//       if (!(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))){

//       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9425c53eb3394aadbd2d73464c460e99&page=${this.state.page+1}&pageSize=${props.pageSize}`
//       this.setState({loading:true})
// let data= await fetch(url);
// let parsedData = await data.json();
// console.log(parsedData);

//       this.setState({
//         articles:parsedData.articles,
//         page:this.state.page + 1,
//         loading:false
        
//       })

//     }
setPage(page+1);
updateNews();
  }

  const fetchMoreData = async () => {
     
      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9425c53eb3394aadbd2d73464c460e99&page=${page+1}&pageSize=${props.pageSize} `
      setPage(page+1)
      let data= await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      
  };

  
    return (
      <>
        <h1 className='text-center' style={{margin:'35px', marginTop: '70px'}}>NewsDaily - Top {capitalizeFirstLetter(props.category)} Headlines</h1> {/*// text-center botstrap ki class h jo ki text ko center kr deti hai*/}
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
<div className="container">
        <div className='row'>
        {articles.map((elements)=>{
            return <div key={elements.url} className="col-md-3 mx-4"> {/*/ col-md-3 mtlb medium devices me ye 4 column le legi. bootstrap ki class hai. There are 12 colums grid in bootstrap to yha col-md-3 mtlb 4*3=12 mtlb pura pura space le legi.*/}
        <NewsItem title={elements.title? elements.title.slice(0,44) : ""} description={elements.description?elements.description.slice(0,88):''} myUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name}/>  {/*yha dhyan rakhna jo ap return kr rhe ho usme unique key dena hai jese yha div me dena hoga.*/}
        </div>})
        }
         </div>
         </div>
         </InfiniteScroll>


         
        </>
 
    );
  
}

News.defaultProps = {
    country:'in',
pageSize:8,
category:'general'
  }

  News.propTypes = {
    country: PropTypes.string,
pageSize: PropTypes.number,
category: PropTypes.string
  }

export default News;
