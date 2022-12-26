import React from 'react'
import default_pic from './Pics/news_icon.jpg'

const Newsitem=(props)=> {
  

  
    let {title,description,imgurl,newsurl,date,author,name}=props;
    
    
    return (
      <div>
        <div className="card mx-3 my-3" style={{ width: "18rem" }}>
        <div style={{display:"flex",justifyContent:"flex-end",position: "absolute",right: "0" }}>
        <span className=" badge rounded-pill bg-danger" >
    {name}</span>
    </div>
          <img src={imgurl}  className="card-img-top" alt="default_pic"  />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By {author} {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" className="btn btn-primary">
              Read more...
            </a>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem
