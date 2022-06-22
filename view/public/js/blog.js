const APIURL = 'https://oi7nrcfmd6.execute-api.ap-south-1.amazonaws.com';

const fetchAllBlogs = async (params) => {
    const response = await fetch(`${APIURL}/fetchallblog?tags=${params ? params : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const apiResponse = await response.json();
    console.log(apiResponse, 'api respp');
    appendBlogs(apiResponse);
}

const fetchAllTags = async (params) => {
    const response = await fetch(`${APIURL}/getTags`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const apiResponse = await response.json();
    const allTags = [];
    apiResponse.tags.map((eachTag) => {
        allTags.push(eachTag[0]);
    });
    console.log(allTags, 'allTags');
    appendTags(allTags, params)
}

function listBlogs() {
    const params = window.location.search || '';
    queryString = params.split("?tags=")[1];
    console.log(queryString, 'queryStringqueryString');
    fetchAllTags(queryString);
    fetchAllBlogs(queryString);
}
listBlogs();

const appendTags = (allTags, params) => {
    const tagsDiv = document.getElementById("bl_tag");
    const tagListAll = document.createElement('li');
    tagListAll.className = params ? 'pointer' : 'active pointer';
    tagListAll.innerHTML = `<a onclick="tags('')" >all</a>`;
    console.log(tagListAll, params, 'aaaaa');
    tagsDiv.appendChild(tagListAll);
    if (params) {
        params = params.split(',%20');
    }
    console.log(params, 'paramsparams');
    allTags.forEach((eachTags) => {
        const tagList = document.createElement('li');
        tagList.className = params && params.includes(eachTags) ? 'active pointer' : 'pointer';
        tagList.innerHTML = `<a onclick="tags('${eachTags}')">${eachTags}</a>`;
        tagsDiv.appendChild(tagList);
    });
}

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

function tags(tags) {
    console.log(tags, 'tags');
    console.log(window.location, 'tags');
    if(!tags) {
        console.log('11111111', window.location.origin + window.location.pathname);
        window.location.href = window.location.origin + window.location.pathname;
    } else {
        if (window.location.search === '') {
            window.location.href = window.location.href + '?tags=' + tags;
        } else {
            console.log(window.location.search);
            queryString = window.location.search.split("?tags=")[1];
            params = queryString.split(',%20');
            if (params.includes(tags)) {
                console.log(params, tags, 'includes');
            } else {
                window.location.href = window.location.search + ', ' + tags;
            }
        }
    }
}