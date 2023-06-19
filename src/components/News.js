import React, { Component } from 'react'
import NewsComponent from './NewsComponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        console.log("Constructor from News")

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`
    }

    async update() {
        this.props.setProgress(0)
        //first constructor then CDM then render executes
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        this.props.setProgress(50)
        let parsedData = await data.json()

        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.update();
    }
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 }) //This takes time , so thats why we first fetched the url with page+1 and then setPage
        let data = await fetch(url)
        let parsedData = await data.json()

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    render() {
        return (
            <div className="container p-2 text-center">
                <h2 style={{ margin: '90px 0px' }}>NewsApp - Top Headlines on <span className="text-danger">{this.capitalizeFirstLetter(this.props.category)}</span></h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {/* {!this.state.loading && this.state.articles.map((el) => { */}

                            {this.state.articles.map((el) => {
                                return <div className="col-md-4" key={el.url}>
                                    <NewsComponent
                                        title={el.title ? el.title : ""}
                                        desc={el.description ? el.description : ""}
                                        imgUrl={el.urlToImage ? el.urlToImage : "https://photo2.tinhte.vn/data/attachment-files/2023/06/6468369_L1202739.jpg"}
                                        newsUrl={el.url}
                                        author={el.author}
                                        date={el.publishedAt}
                                        source={el.source.name}
                                    />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>
            </div >
        )
    }
}

export default News