import { Component } from 'react';
import Movies from '../components/Movies';
import Placeholder from '../components/Placeholder';
import Search from '../components/Search';

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends Component {
    state = {
        movies: [],
        loading: true,
    };
    componentDidMount() {
        console.log(API_KEY);
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
            .then((response) => response.json())
            .then((data) =>
                this.setState({ movies: data.Search, loading: false })
            );
    }
    searchMovies = (str, type = 'all') => {
        this.setState({ loading: true });
        fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
                type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then((response) => response.json())
            .then((data) =>
                this.setState({ movies: data.Search, loading: false })
            );
    };
    render() {
        const { movies, loading } = this.state;
        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {!loading ? <Movies movies={movies} /> : <Placeholder />}
            </main>
        );
    }
}

export default Main;
