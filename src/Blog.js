import { useEffect, useReducer, useRef, useState } from "react";
import "style-components";
const blogReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.blog, ...state];
    case "REMOVE":
      return state.filter((blog, index) => index !== action.index);
    default:
      return [];
  }
};
const Blog = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const [blogs, dispatch] = useReducer(blogReducer, []);
  const ref = useRef(null);
  useEffect(() => ref.current.focus(), []);
  useEffect(() => {
    if (blogs.length) {
      document.title = blogs[0].title;
    }
  }, [blogs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD",
      blog: { title: formData.title, content: formData.content },
    });
    setFormData({ title: "", content: "" });
    console.log(blogs);
    ref.current.focus();
    return;
  };
  const handleDelete = (i) => {
    dispatch({
      type: "REMOVE",
      index: i,
    });
  };

  return (
    <>
      <h1>write a blog</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="title">
            <input
              placeholder="enter the title"
              className="input"
              value={formData.title}
              ref={ref}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>
          <Row label="content">
            <input
              placeholder="enter the content"
              className="input"
              value={formData.content}
              onChange={(e) =>
                setFormData({
                  content: e.target.value,
                  title: formData.title,
                })
              }
            />
          </Row>
          <button className="btn">add</button>
          <br />
          {blogs.length > 0 ? <h2>Blogs</h2> : ""}
          {blogs.map((blog, i) => (
            <div key={i} className="blog">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <div className="blog-btn">
                <button onClick={() => handleDelete(i)} className="btn">
                  delete
                </button>
              </div>
            </div>
          ))}
        </form>
      </div>
    </>
  );
};

function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />{" "}
    </>
  );
}
export default Blog;
