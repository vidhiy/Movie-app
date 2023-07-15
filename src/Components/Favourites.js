import React, { Component } from 'react'
// import axios, { all } from 'axios'
// import { movies } from './getMovies';
// import Navbar from './Navbar'

export default class Favourites extends Component {

  constructor(){
    super()
    this.state = {
      movies:[],
      genre:[],
      currGenre:"All Genre",
      currText:"",
      limit:5,
      currPage:1,

    }
  }
  async componentDidMount(){
    // console.log("CDM is called");
    let ans = JSON.parse(localStorage.getItem("movies"));

      let genreId = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };

      let allGenre=[];
      ans.map((movieObj) => {
        if(!allGenre.includes(genreId[movieObj.genre_ids[0]])){
          allGenre.push(genreId[movieObj.genre_ids[0]]);
        }
      })
      allGenre.unshift("All Genre");
      console.log(allGenre);
      this.setState({
        movies:[...ans],
        genre:[...allGenre],
      });
  }
  handleGenre = (e) =>{
    let genre=e.target.innerText;
    // movies ko filter
    this.setState({
      currGenre : genre,
    })
  };
  handleText = (e) =>{
    this.setState({
      currText :e.target.value,
    })
  }
  setPopularityAsc=() =>{
    let allMovies = this.state.movies;
    allMovies.sort((objA,objB)=>{
      return objA.popularity - objB.popularity;
    });
    this.setState({
      movies:[...allMovies],
    })
  }
  setPopularityDesc=() =>{
    let allMovies = this.state.movies;
    allMovies.sort((objA,objB)=>{
      return objB.popularity - objA.popularity;
    });
    this.setState({
      movies:[...allMovies],
    })
  }
  setRatingAsc=() =>{
    let allMovies = this.state.movies;
    allMovies.sort((objA,objB)=>{
      return objA.vote_average - objB.vote_average;
    });
    this.setState({
      movies:[...allMovies],
    })
  }
  setRatingDesc=() =>{
    let allMovies = this.state.movies;
    allMovies.sort((objA,objB)=>{
      return objB.vote_average - objA.vote_average;
    });
    this.setState({
      movies:[...allMovies],
    })
  }
  handleDelete =(id)=>{
    let newMovies = this.state.movies.filter((movieObj)=>{
      return movieObj.id != id
    })
    this.setState({
      movies:[...newMovies]
    })
    localStorage.setItem("movies",JSON.stringify(newMovies));
  }
  
  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filteredMovies = this.state.movies;
    if(this.state.currText !== ""){
      filteredMovies = filteredMovies.filter((movieObj) =>{
        let movieName = movieObj.original_title.toLowerCase();
        return movieName.includes(this.state.currText.toLowerCase());
      });
    }
    if(this.state.currGenre !== "All Genre"){
      filteredMovies = filteredMovies.filter(
        (movieObj) => genreId[movieObj.genre_ids[0]] ==  this.state.currGenre
      );
    }
    // else filteredMovies = this.state.movies;
    
    let numOfPages = Math.ceil(filteredMovies.length / this.state.limit);
    let pagesArr =[];
    for(let i=1;i<=numOfPages;i++){
      pagesArr.push(i);
    }
    let si = (this.state.currPage -1)*this.state.limit;
    let ei = si + this.state.limit;
    filteredMovies = filteredMovies.slice(si,ei);
    return (
      <div class="row"style={{padding:"8px"}}>
        <div class="col-3 p-5">
        <ul class="list-group">
            {
              this.state.genre.map((genre) => {
                return this.state.currGenre == genre ?(
                  <li className='list-group-item active'>{genre}</li>
                ):(
                  <li className='list-group-item 'onClick={this.handleGenre}>{genre}
                  </li>
                )
              })
            }
            {/* <li class="list-group-item active">All Genre</li>
              <li class="list-group-item">Fantasy</li>
              <li class="list-group-item">Action</li>
              <li class="list-group-item">Animation</li> */}
        </ul>
        </div>
        <div class="col p-5">
        <div className="row">
            <input
              type="text"
              className="col-8"
              placeholder="Search"
              value={this.state.currText}
              onChange={this.handleText}
            ></input>
            <input
              type="number"
              className="col"
              value={this.state.limit}
              onChange={(e) => this.setState({ limit: e.target.value })}
              placeholder="Results per page"
            ></input>
          </div>
        <table class="table" style={{alignItems:"center"}}>
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">
        <i 
        className="fa-solid fa-sort-up" 
        onClick={this.setPopularityAsc}/>
          Popularity
        <i 
        className="fa-solid fa-sort-down" 
        onClick={this.setPopularityDesc}/>
      </th>
      <th scope="col">
        <i 
        className="fa-solid fa-sort-up"  
        onClick={this.setRatingAsc} />
          Rating
        <i 
        className="fa-solid fa-sort-down"
        onClick={this.setRatingDesc}/>
      </th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {filteredMovies.map((movieObj) =>(
      <tr>
      <td>
        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." style={{ height:"8vh",width:"10vw"}} />
      {movieObj.original_title}</td>
      <td>{genreId[movieObj.genre_ids[0]]}</td>
      <td>{movieObj.popularity}</td>
      <td>{movieObj.vote_average}</td>
      <td><button className='btn btn-outline-danger' onClick={()=> this.handleDelete(movieObj.id)}>Delete</button></td>
    </tr>
    ) 
    )}
  </tbody>
</table>
        </div>
        <nav aria-label="Page navigation example" className="pagination"style={{display:"flex",justifyContent:"center"}} >
          <ul className="pagination" style={{}}>
            {pagesArr.map((pageNum) => {
              return (
                <li
                  className="page-item"
                  onClick={() => this.setState({ currPage: pageNum })}
                >
                  <a href="#" className="page-link">{pageNum}</a>
                </li>
              );
            })}
          </ul>
        </nav>
    </div>
    )
  }
}
