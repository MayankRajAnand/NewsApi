import React, { Component } from 'react'

export class NewsComponent extends Component {
    render() {
        let { title, desc, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="container my-3" >
                <div className="card" >
                    <div>
                        <span class="badge rounded-pill bg-danger" style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>{source}</span>
                    </div>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title.length > 45 ? title.slice(0, 45) + '...' : title}</h5>
                        <p className="card-text">{desc.length > 88 ? desc.slice(0, 88) + '...' : desc}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Anonymous"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div >
            </div >
        )
    }
}

export default NewsComponent