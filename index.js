//......................Caetegoris  API Load......................
const loadNewsCategory = async() => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }

}

// ............................Display Catagory Menu Bar............................
const displayCategoryMenu = async() => {
    const data = await loadNewsCategory();
    const category = data.data.news_category;
    const newCategoryContainer = document.getElementById('newsCategory');

    category.forEach(item => {
        const newCategory = document.createElement('li');

        newCategory.innerHTML = `
        <a onclick="loadCataoryAllNews(${item.category_id},'${item.category_name}')">${item.category_name}</a>
        `
        newCategoryContainer.appendChild(newCategory);

    })

}

//  ....................Dynamic API Create For Category ID .....................

const loadCataoryAllNews = async(categoryID, catagory) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/0${categoryID}`;
        const response = await fetch(url);
        const data = await response.json();

        displayCategoryAllNews(data.data, catagory);


    } catch (error) {
        console.log(error)
    }
}

const displayCategoryAllNews = (allNews, catagory) => {
    const newsContainer = document.getElementById('newsContainer');
    const categoryItemNumber = document.getElementById('categoryItemNumber');
    // Spinner Loader area................
    const spinnerID = document.getElementById('spinnerID');

    // ...............................Item Number Count..........................
    categoryItemNumber.value = `
    ${allNews.length} items found for category ${catagory}.
    `
        //...................Clean The  all Previus All News.........................
    newsContainer.innerText = "";

    //  ..............................sorted Section..............................

    if (allNews.length == 0) {
        newsContainer.innerText = "Data Not Found..";
        return
    } else {
        let sortedArray;
        try {
            sortedArray = sortData(allNews);

        } catch (error) {
            console.log(error);
        }

        sortedArray.forEach(news => {

            const newsID = document.createElement('div');
            newsID.classList.add('row');
            newsID.classList.add('news');
            newsID.classList.add('shadow-lg');
            // ............All News Show Design ..........................................
            newsID.innerHTML = `
        <div class="col-lg-3 col-sm-12 px-4">
                        <img class="img-fluid" src="${news.thumbnail_url}" alt="">
                    </div>
                    <div class="col-lg-9 col-sm-12 p-4 text-start">
                        <div>
                            <h4>${news.title ? news.title : "not Found" }</h4>
                            <p>${news.details.length > 338 ? news.details.slice(0,338)+"...":news.details  }</p>
                        </div>
                        </br></br>
                        <div class="row">
                            <div class="col-lg-3 col-sm-6 d-flex justify-content-center align-items-center">
                                <div>
                                    <img class="rounded-circle author-imag" src="${news.author.img}" alt="">
                                </div>
                                <div class="ms-2">
                                    <p class="p-0 m-0 fw-bold">${news.author.name ? news.author.name:"Not Found"}</p>
                                    <p class="p-0 m-0 fw-bold">${news.author.published_date ? news.author.published_date: "Not Found"}</p>
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
                                <button class="btn btn-primary fw-bolder" onclick="seeDetailsNews('${news._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Details News</button>

                            </div>
                        </div>


                    </div>
        `;
            newsContainer.appendChild(newsID);

        })
    }



}

//  ............Dynamic API create For Selecte See Details News.............................
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

//......................Whine Click Then See Details Senari,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const displaySeeDetailsNews = async(seeDetailsNewsID) => {
        const newsModalDialog = document.getElementById('newModalDialog');
        newsModalDialog.innerText = "";
        const modalContent = document.createElement('modal-content');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = `
                
            <div class="modal-body">
                 <h5 class="modal-title" id="staticBackdropLabel">${seeDetailsNewsID.title ?seeDetailsNewsID.title : "Not Found" }</h5>
                  <div class="d-flex align-items-center m3-5 ">
                     <div class="">
                         <img class="rounded-circle author-imag" src="${seeDetailsNewsID.author.img?seeDetailsNewsID.author.img: 'Not Found' }" alt="Not Found">
                     </div>
                     <div class="ms-2 d-flex align-items-center ">
                         <p class="p-0 m-0 fw-bold">${seeDetailsNewsID.author.name ? seeDetailsNewsID.author.name: "Not Found" }</p>
                         <p class="p-0 m-0 fw-bold">${seeDetailsNewsID.author.published_date ? seeDetailsNewsID.author.published_date : "Not Found"}</p>
                     </div>
                 </div>
              
            
                 <div class="d-flex justify-content-center align-items-center ">
                    <img class="w-100" src="${seeDetailsNewsID.image_url ? seeDetailsNewsID.image_url: 'Not Found'}" alt="Not Found">
                 </div>
                   <p>${seeDetailsNewsID.details ?seeDetailsNewsID.details:"No Data" }</P>
                    
                   

                </div>
                <div class="modal-footer">
                <div class="d-flex align-items-center ">
                <div class="d-flex align-items-center">
                    <a href="" style="font-size:30px ;"> <i class="fa-solid fa-eye"></i></a>
                    <p class=" fw-bolder fs-1 mx-1">${seeDetailsNewsID.total_view ? seeDetailsNewsID.total_view +"M" :"No Data"}</p>
    
    
                </div>
                <div class="d-flex align-items-center">
                    <i class="fa-solid fa-code-compare fs-4 px-2"></i>
                    <i class="fa-brands fa-square-facebook fs-4 px-2"></i>
                    <i class="fa-brands fa-twitter fs-4 px-2"></i>
                    <i class="fa-brands fa-linkedin  fs-4 px-2"></i>
                </div>
            </div>
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                 </div>
    `
        newsModalDialog.appendChild(modalContent);
    }
    //..............................Data Sorting .............................
const sortData = (newsArry) => {
    function compare(a, b) {

        const viewA = (a.total_view ? a.total_view : 0);
        const viewB = (b.total_view ? b.total_view : 0);


        let comparison = 0;
        if (viewA < viewB) {
            comparison = 1;
        } else if (viewA > viewB) {
            comparison = -1;
        }
        return comparison;
    }


    const afterSort = (newsArry.sort(compare));
    return afterSort;
}

displayCategoryMenu();