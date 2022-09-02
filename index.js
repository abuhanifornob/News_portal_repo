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

    allNews.forEach(news => {
        console.log(news);
    })
}



displayCategoryMenu();