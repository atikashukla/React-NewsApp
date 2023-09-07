import React from "react";

const NewsItem = (props) => {
  let { title, description, myUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger ">
          {source}
        </span>
        <img
          src={
            myUrl
              ? myUrl
              : "https://c.ndtvimg.com/2023-08/a9j292js_chandrayaan-pragyan-rollout_625x300_25_August_23.jpg?im=FeatureCrop,algorithm=dnn,width=650,height=400"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}....</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm">
            Read Me
          </a>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on
              {new Date(date).toGMTString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
