let newEditor;
let blogId;
const tagarrary = [];
DecoupledEditor
.create(document.querySelector('#editor'))
.then(editor => {
    newEditor  = editor;
    const toolbarContainer = document.querySelector('#toolbar-container');
    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
})
.catch(error => {
    console.error(error);
});
function handleIt() {
    // console.log(CKEDITOR.instances.editor1.getData(), 'ccc');
    console.log(document.forms["blogForm"]["imageCaption"]);
    const title = document.forms["blogForm"]["title"].value;
    const blogtags = document.forms["blogForm"]["tag"].value;
    const altText = document.forms["blogForm"]["altText"].value;
    const imageCaption = document.forms["blogForm"]["imageCaption"].value;
    const subTitle = document.forms["blogForm"]["subTitle"].value;
    const specialMention = document.forms["blogForm"]["specialMention"].value;
    const sequence = document.forms["blogForm"]["sequence"].value;
    // const editor = document.forms["blogForm"]["editor"].value;
    console.log(newEditor, 'newEditor');
    const editorData = newEditor.getData();
    console.log(editorData, 'editorData');
    let isreturn = false
    if (title == ""
        || imageCaption == ""
        || altText == ""
        || subTitle == ""
        || specialMention == ""
        || sequence == "") {
        isreturn = true;
    }
    // if (blogtags == "") {
    //     alert("Tage must be filled out");
    //     isreturn = true;
    // }
    if (isreturn) {
        alert("Please fill all required field");
        return true;
    }
    else {
        // console.log(editor, 'editor');
        console.log(
            {
                        thumbnail_image: 'https://reactjs.org/logo-og.png',
                        image_caption: imageCaption,
                        alt_text: altText,
                        title: title,
                        sub_title: subTitle,
                        // content text,
                        special_mention: specialMention,
                        is_blog: true,
                        sequence: sequence
                    }
        );
        updateBlogApi(
            {
                thumbnail_image: 'https://reactjs.org/logo-og.png',
                image_caption: imageCaption,
                alt_text: altText,
                title: title,
                sub_title: subTitle,
                content: editorData,
                special_mention: specialMention,
                is_blog: true,
                sequence: sequence,
                post_id: blogId
            }
        );
    }

}

APIURL = 'https://oi7nrcfmd6.execute-api.ap-south-1.amazonaws.com';
// APIURL = 'http://localhost:3000';                                        
const updateBlogApi = async (apiData) => {
    const response = await fetch(`${APIURL}/updateBlog`,{
        method: 'POST',
        body: JSON.stringify(apiData)
        // headers:{
        //     'Access-Control-Allow-Headers': 'Content-Type',
        //     'Access-Control-Allow-Credentials': false,
        //     'Access-Control-Allow-Origin': '*'
        // }
    });
    const apiResponse = await response.json();
    console.log(apiResponse, 'api respp');
}



const tagelement = document.getElementById("tag");
tagelement.addEventListener("keydown", function (e) {

    if (e.keyCode == 13) {
        addtotagarray();
    }
})

function addtotagarray() {
    console.log(tagelement.value)
    if (!tagarrary.includes(tagelement.value)) {
        tagarrary.push(tagelement.value)
        tagelement.value = " "
        console.log(tagarrary)
    }

}

async function fetchBlog() {
    blogId = window.location.search.replaceAll('?id=', '');
    console.log(blogId);
    if(blogId) {
        const response = await fetch(`${APIURL}/fetchBlogbyId?post_id=${blogId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const apiResponse = await response.json();
        console.log(apiResponse[0], 'api respp');
        editBlog(apiResponse[0]);
    }
}

const editBlog = (editBlogData) => {
    console.log(newEditor, 'newEditor');
    newEditor.setData(editBlogData.content);
    document.forms["blogForm"]["title"].value = editBlogData.title;
    // document.forms["blogForm"]["tag"].value = editBlog;
    document.forms["blogForm"]["altText"].value = editBlogData.alt_text;
    document.forms["blogForm"]["imageCaption"].value = editBlogData.image_caption;
    document.forms["blogForm"]["subTitle"].value = editBlogData.sub_title;
    document.forms["blogForm"]["specialMention"].value = editBlogData.special_mention;
    document.forms["blogForm"]["sequence"].value = editBlogData.sequence;
}
fetchBlog();

// thumbnail_image: "https://reactjs.org/logo-og.png"
// alt_text: "alt"
// content: "<p>This is the initial editor content.</p>"
// image_caption: "image caption"
// is_blog: 1
// post_id: "6C9FE2C8D15911ECA6E602CB856F5320"
// sequence: 2
// special_mention: "q"
// sub_title: "q"
// tags: null
// thumbnail_image: "https://reactjs.org/logo-og.png"
// time: "2022-05-11 18:37:34"
// title: "new title"