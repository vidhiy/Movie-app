import React, { Component } from 'react'
import {movies} from './getMovies'
import axios from 'axios'
// import { json } from 'react-router-dom';

export default class List extends Component {
  constructor(){
    super();
    this.state ={
      hover:"",
      movies:[],
      currPage:1,
      parr:[1],
      fm:localStorage.getItem("movies")? JSON.parse(localStorage.getItem("movies")).map((movieObj)=>movieObj.id) :[],
    }
  }

     handleEnter= (id) =>{
      this.setState({
        hover:id,
      })
    };

    handleLeave = () =>{
      this.setState({
        hover:'',
      })
    };
    changeMovies= async() => {
      console.log(this.state.currPage);
      console.log("change movies is called");
      let ans = await axios.get( `https://api.themoviedb.org/3/movie/popular?api_key=81a283e38d1800ce304c70cf22f91a9c&language=en-US&page=${this.state.currPage}`);
      this.setState({
        movies:[...ans.data.results],
      })
    };

    handleNext = () =>{
      let tempArr = [];
      for(let i=1;i<=this.state.parr.length +    1;i++){
        tempArr.push(i);
      }
      this.setState({
        parr:[...tempArr],
        currPage:this.state.currPage + 1,
      },this.changeMovies)
    };

    handlePrev = () =>{
      if(this.state.currPage != 1){
        this.setState({
          currPage: this.state.currPage -1,
        },this.changeMovies)
      }
    }
    handlePageNum = () =>{
      this.setState({
        // currPage:this.state.parr.pageNum,
      })
    }
    handleFavourites =(movieObj)=>{
      let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];
      if(this.state.fm.includes(movieObj.id)){
        localStorageMovies = localStorageMovies.filter(
          (movie) => movie.id !== movieObj.id
        );
      }
      else localStorageMovies.push(movieObj);
      // console.log(localStorageMovies);

      localStorage.setItem("movies", JSON.stringify(localStorageMovies));
      let tempData = localStorageMovies.map(movieObj => movieObj.id);
      this.setState({
        fm:[...tempData],
        movies:[...this.state.movies],
        
      })
    }

    async componentDidMount(){
      let ans = await axios.get( `https://api.themoviedb.org/3/movie/popular?api_key=81a283e38d1800ce304c70cf22f91a9c&language=en-US&page=${this.state.currPage}`);
      this.setState({
        movies:[...ans.data.results],
      })
    }

  render() {

    // let movie = movies.results;
    return (
      <>
      {
        this.state.movies.length == 0 ?(
            <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        ):(
            <div >
            <h3 className='text-center'>
                <strong>Trending</strong>
            </h3> 
            <div className='movies-list'>
            {
                this.state.movies.map((movieObj) => (
                    <div className="card movie-card"
                    onMouseEnter={()=> this.handleEnter(movieObj.id)}
                    onMouseLeave={this.handleLeave}
                    key={movieObj.id}
                    >
                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." style={{ height:"40vh"}} />
                    <div className="card-body">
                    <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                    {/* <p className="card-text banner-text">{movieObj.overview}</p> */}
                    <div className='button-wrapper'>
                    {this.state.hover == movieObj.id && 
                      <a  className="btn btn-danger movie-button" onClick={() =>this.handleFavourites(movieObj)}>
                      {
                        this.state.fm.includes(movieObj.id)?`Remove from favourites` : `Add to favourites`
                      }
                      </a>
                    }
                    
                    </div>
                  </div>
                  
                </div> 
                ))
            }

                <div className='movie-pagination'>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item"
                      onClick={this.handlePrev}>
                        <a className="page-link" href="#">Previous</a></li>
                      {
                        this.state.parr.map(pageNum =>(
                          <li className="page-item" onClick={this.handlePageNum}><a className="page-link" href="#">{pageNum}</a></li>
                        ))
                      }
                      
                      <li className="page-item" 
                        onClick={this.handleNext}>
                        <a className="page-link" href="#">Next</a></li>
                    </ul>
                  </nav>

                 </div>
            </div>
            </div>
     )}
      </>
    )
  }
}
