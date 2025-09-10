import blogsArr from "./blogdata.js"
const options = { year: "numeric", month: "long", day: "numeric" }
const homeMainArticle = document.getElementById('home-main-article')
const blogPosts = document.getElementById('blog-posts')
const homeViewMoreBtn = document.getElementById('home-view-more-btn')
const tabletMq = window.matchMedia("(min-width: 600px) and (max-width: 1023px)")
const desktopMq = window.matchMedia("(min-width: 1024px)")
let moreViewed = false
let blogPostRenderNr = 0

const sortedBlogsArr = blogsArr.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
})


tabletMq.addEventListener("change", handleWidthChange)
desktopMq.addEventListener("change", handleWidthChange)

if(homeViewMoreBtn){
    homeViewMoreBtn.addEventListener('click', viewMoreBlogs)
}

function viewMoreBlogs(){
    moreViewed = true
    blogPostRenderNr = 6
    renderBlogPosts()
    handleViewMoreBtn()
}

function handleWidthChange() {
    if(tabletMq.matches) {
        blogPostRenderNr = 4
    } else if (desktopMq.matches){
        blogPostRenderNr = 6
    } else {
        blogPostRenderNr = 3
    }
     renderBlogPosts()
     handleViewMoreBtn()
}

function renderMainArticle() {
    const newestBlog = sortedBlogsArr[0]
    homeMainArticle.innerHTML = `
                <time datetime=${newestBlog.date} id="home-main-article-date">${new Date(newestBlog.date).toLocaleDateString("en-US", options)}</time>
                <a href="main-article.html" class="home-main-article-link">
                    <h1 id="home-main-article-title">${newestBlog.title}</h1>
                </a>
                <a href="main-article.html" class="home-main-article-link">
                    <p id="home-main-article-covertext">${newestBlog.covertext} </p>
                </a>
    `
    
    
    homeMainArticle.style.background = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${newestBlog.image}) center / cover no-repeat`
}

function renderBlogPosts() {
    const blogPostArr = sortedBlogsArr.slice(1)
    let blogPostHTML = ''
    for (let i= 0; i<blogPostRenderNr; i++) {
        const blog = blogPostArr[i]
        blogPostHTML += `
            <div class="blog-post">
                <img src="${blog.image}" class="blog-post-cover">
                <time datetime="${blog.date}" class="blog-post-date">${new Date(blog.date).toLocaleDateString("en-US", options)}</time>
                <h2 class="blog-post-title">${blog.title}</h2>
                <p class="blog-post-covertext">${blog.covertext}</p>
            </div>
        `
    }
    blogPosts.innerHTML = blogPostHTML
}

if(homeMainArticle){
    renderMainArticle()
}

function handleViewMoreBtn(){
    if(homeViewMoreBtn || desktopMq.matches){
        if(moreViewed){
            homeViewMoreBtn.style.display = 'none'
        } else {
            homeViewMoreBtn.style.display = 'block'
        }
    }
}

renderBlogPosts()
handleWidthChange()
