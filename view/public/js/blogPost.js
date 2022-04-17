const APIURL = 'https://oi7nrcfmd6.execute-api.ap-south-1.amazonaws.com';
async function fetchBlog() {
    const blogId = window.location.search.replaceAll('?id=', '');
    const response = await fetch(`${APIURL}/fetchBlogbyId?post_id=${blogId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const apiResponse = await response.json();
    console.log(apiResponse, 'api respp');
    showBlogContent(apiResponse[0]);
}
fetchBlog();

const showBlogContent = (blogData) => {
    const blogContent = document.getElementById("blogContent");
    const blogContentDiv = document.createElement('div');
    blogContentDiv.className = 'ctr';
    blogContentDiv.innerHTML = `     
        <div class="single-post">
            <h2>Blog</h2>
            <h1>${blogData.title}</h1>
        </div>
        <div class="item item-slider article_item post">
            <div class="bl-foto">
                <img id="main_post" itemprop="image" src="${blogData.thumbnail_image}"
                alt="${blogData.alt_text}">
            </div>
            <div class="bl_ctr">
                <div class="bl-info">
                    <div class="bl-date_time">
                        <div class="date">${blogData.time}</div>
                    </div>
                    <div class="bl-post-text">
                        ${blogData.content}
                    </div>
                </div>
            </div>
        </div>`;
    blogContent.appendChild(blogContentDiv);
}

{/* <div class="bl-tag">
                    <div class="btn-tag">Tags:</div>
                    <ul class="lsn" id="bl_tag">
                        <li><a href="../blog.html?tag=tips%20and%20tricks">tips and tricks</a></li>
                        <li><a href="../blog.html?tag=logistics">logistics</a></li>
                        <li><a href="../blog.html?tag=snippet">snippet</a></li>
                        <li><a href="../blog.html?tag=regex">regex</a></li>
                    </ul>
                </div> */}
{/* <div class="time">4 min read</div> */ }
