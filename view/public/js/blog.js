const APIURL = 'https://oi7nrcfmd6.execute-api.ap-south-1.amazonaws.com';

const fetchAllBlogs = async () => {
    const response = await fetch(`${APIURL}/fetchallblog`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const apiResponse = await response.json();
    console.log(apiResponse, 'api respp');
    appendBlogs(apiResponse);
}
function listBlogs() {
    fetchAllBlogs();
}
listBlogs();


const appendBlogs = (listBlogs) => {
    const blogDiv = document.getElementById("blogList");
    listBlogs.forEach(eachBlog => {
        if (eachBlog.is_blog) {
            console.log(eachBlog.thumbnail_image, 'iddd');
            const blogList = document.createElement('li');
            blogList.className = "item-masonry post persent-size";
            blogList.innerHTML = `
            <div class='item item-slider article_item'>
                <a class='link' href='blogPost.html?id=${eachBlog.post_id}' >
                ${eachBlog.thumbnail_image ? ` <div class='bl-foto'>
                <img
                src='${eachBlog.thumbnail_image}'
                alt='${eachBlog.alt_text}'></div>` : ''}
                    <h3>${eachBlog.title}</h3>
                </a>
                <div class='bl-info '>
                    <div class='bl-date_time'>
                        <div class='date'>${eachBlog.time}</div>
                    </div>
                    <p class='fader'>
                    ${eachBlog.content}
                    </p>
                </div>
            </div>`;
            blogDiv.appendChild(blogList);
        }
    });
}

