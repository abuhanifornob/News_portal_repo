const loadNewsCategory = async() => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }

}

const displayCategoryMenu = async() => {
    const data = await loadNewsCategory();
    const category = data.data.news_category;
    const newCategoryContainer = document.getElementById('newsCategory');

    category.forEach(item => {
        const newCategory = document.createElement('li');
        newCategory.innerHTML = `
        <a onclick="loadCataoryAllNews(${item.category_id})">${item.category_name}</a>
        `
        newCategoryContainer.appendChild(newCategory);

    })

}

const loadCataoryAllNews = async(categoryID) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/0${categoryID}`;
        const response = await fetch(url);
        const data = await response.json();
        displayCategoryAllNews(data.data);
    } catch (error) {
        console.log(error)
    }
}

const displayCategoryAllNews = (allNews) => {
    const newsContainer = document.getElementById('newsContainer');
    const categoryItemNumber = document.getElementById('categoryItemNumber');
    // Spinner Loader area................
    const spinnerID = document.getElementById('spinnerID');
    categoryItemNumber.value = `
    ${allNews.length} Items Found.
    `
    console.log(categoryItemNumber);
    newsContainer.innerText = "";

    allNews.forEach(news => {
        console.log(news);
        const newsID = document.createElement('div');
        newsID.classList.add('row');
        newsID.classList.add('news');
        newsID.classList.add('shadow-lg');
        newsID.innerHTML = `
        <div class="col-lg-3 col-sm-12 px-4">
                        <img class="img-fluid" src="${news.thumbnail_url}" alt="">
                    </div>
                    <div class="col-lg-9 col-sm-12 p-4 text-start">
                        <div>
                            <h4>${news.title}</h4>
                            <p>${news.details.length > 338 ? news.details.slice(0,338)+"...":news.details  }</p>
                        </div>
                        </br></br>
                        <div class="row">
                            <div class="col-lg-3 col-sm-6 d-flex justify-content-center align-items-center">
                                <div>
                                    <img class="rounded-circle author-imag" src="${news.author.img}" alt="">
                                </div>
                                <div class="ms-2">
                                    <p class="p-0 m-0 fw-bold">${news.author.name}</p>
                                    <p class="p-0 m-0 fw-bold">${news.author.published_date}</p>
                                </div>


                            </div>
                            <div class="col-lg-3 col-sm-6 d-flex justify-content-center align-items-center">
                                <a href="" style="font-size:30px ;"> <i class="fa-solid fa-eye"></i></a>
                                <p class=" fw-bolder fs-1 mx-1">${news.total_view ? news.total_view +"M" :"No Data"}</p>


                            </div>
                            <div class="col-lg-3 col-sm-6  d-flex justify-content-center align-items-center">
                                <i class="fa-solid fa-star-half-stroke fs-4 px-2"></i>
                                <i class="fa-regular fa-star fs-4 px-2"></i>
                                <i class="fa-regular fa-star fs-4 px-2"></i>
                                <i class="fa-regular fa-star fs-4 px-2"></i>
                                <i class="fa-regular fa-star fs-4 px-2"></i>

                            </div>
                            <div class="col-lg-3 col-sm-6 d-flex justify-content-center align-items-center">
                                <button class="btn btn-primary fw-bolder" onclick="seeDetailsNews('${news._id}')">See Details News</button>

                            </div>
                        </div>


                    </div>
        `;
        newsContainer.appendChild(newsID);

    })

}

const seeDetailsNews = async(newsDetailsID) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${newsDetailsID}`;
        const res = await fetch(url);
        const data = await res.json();
        displaySeeDetailsNews(data.data[0]);

    } catch (error) {
        alert(error);
    }
}

const displaySeeDetailsNews = async(seeDetailsNewsID) => {
    console.log(seeDetailsNewsID);
}


displayCategoryMenu();