const discussCocntainer = document.getElementById("discuss-container");
const selectConatiner = document.getElementById("select-container");


// fatching all post 
const fetchDiscuss = () => {
    const url = "https://openapi.programming-hero.com/api/retro-forum/posts"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const items = data.posts;
            showItems(items)
        });
}



// fatching searched post
const fetchDiscussItem = (categoryName) => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const items = data.posts;
            showItems(items)
        });
}

// access every card with for each method
const showItems = (allItems) => {
    discussCocntainer.innerHTML = ""
    allItems.forEach((item) => {
        let ActiveStatus = ""
        if (item.isActive) {
            ActiveStatus = `<img src="./images/Active.png" alt="active">`
        }
        else {
            ActiveStatus = `<img src="./images/inactive.png" alt="inactive">`
        }
        const cardDiv = document.createElement("div");
        cardDiv.className = "bg-[#797DFC1A] border-[1px] border-[#797DFC] rounded-xl p-2 lg:p-10 flex gap-2 lg:gap-6 w-[94vw] lg:w-[50vw]"

        cardDiv.innerHTML = `<div class="relative">
                                <img class="rounded-2xl bg-white w-[20vw] lg:w-[4vw]" src=" ${item.image} " alt="flag">
                                <div class="absolute left-12 top-[2px] lg:left-11 lg:-top-1">
                                ${ActiveStatus}
                                </div>
                            </div>

                            <div>
                                <div class="flex gap-5">
                                    <h4 class="text-[#12132DCC] font-inter font-medium text-[14px] leading-[17px]">#${item.category}
                                    </h4>
                                    <h4 class="text-[#12132DCC] font-inter font-medium text-[14px] leading-[17px]">
                                        ${item.author.name} </h4>
                                </div>
                                <div class="mt-3 border-b-[2px] border-dashed border-[#12132D40] pb-5 pr-6">
                                    <h1 class="item-title text-title-color text-xl font-mulish font-bold leading-[25px] mb-4"> ${item.title} </h1>
                                    <p class="text-[#12132D99] text-base font-inter leading-[26px]"> ${item.description} </p>
                                </div>
                                <div class="mt-5 flex gap-[10px] lg:gap-[250px]">
                                    <div class="flex gap-4 lg:gap-6">
                                        <div class="flex gap-2 lg:gap-3 items-center">
                                            <img src="./images/message.png" alt="message">
                                            <h1 class="text-[#12132D99] font-inter leading-[19px]"> ${item.comment_count} </h1>
                                        </div>
                                        <div class="flex gap-2 lg:gap-3 items-center">
                                            <img src="./images/views.png" alt="view">
                                            <h1 class="text-[#12132D99] font-inter leading-[19px]"> ${item.view_count} </h1>
                                        </div>
                                        <div class="flex gap-1 lg:gap-3 items-center">
                                            <div>
                                            <img src="./images/clock.png" alt="clock">
                                            </div>
                                            <h1 class="text-[#12132D99] font-inter"> ${item.posted_time} </h1>
                                        </div>
                                        </div>
                                        <div>
                                            <button onclick ="selectedItem('${item.title}', '${item.view_count}')" class="btn rounded-full"><img src="./images/message color.png" alt="green color"></button>            
                                        </div>
                                    </div>
                                </div>`

        discussCocntainer.appendChild(cardDiv)
    });
    loadingItems(false)
}
const searchCard = () => {
    const searchField = document.getElementById("search-field");
    const categoryName = searchField.value;
    fetchDiscussItem(categoryName)
    loadingItems(true)
}

function loadingItems(loading){
    const loadingSpinn = document.getElementById("loading-spinner")
    loadingSpinn.classList.remove("hidden")
    if(loading){
        loadingSpinn.classList.remove("hidden") 
    }
    else{
        loadingSpinn.classList.add("hidden")  
    }
}


fetchDiscuss()
// cart button funcionality

const selectedItem = (title, viewCount) => {
    const selectCount = document.getElementById("select-count");
    const selectNumber = selectCount.innerText;
    let convertedNumber = parseInt(selectNumber);
    convertedNumber++
    selectCount.innerText = convertedNumber;

    //    append selected section 

    const selectDiv = document.createElement("div");
    selectDiv.className = "mt-[17px] bg-white p-4 flex justify-between rounded-xl"
    selectDiv.innerHTML = `<h1 class="text-title-color font-mulish font-bold leading-[26px]"> ${title}
                            </h1>
                                <div class="flex items-center">
                                    <img src="./images/views.png" alt="views">
                                    <p class="text-[#12132D99] font-inter leading-[19px]"> ${viewCount} </p>
                                </div>`
    selectConatiner.appendChild(selectDiv)
}

// second api section
const latestPostCard = document.getElementById("latest-post-card");
const fetchLatestPost = () => {
    const url = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const items = data;
            showLatestPost(items)
        })
}

const showLatestPost = (latestItems) => {
    latestItems.forEach((latestItem => {
        let publishDate = ""
        let publishDesignation = ""
        if(latestItem.author.posted_date){
            publishDate = latestItem.author.posted_date
        }
        else {
            publishDate = "No publish date"
        }
        if(latestItem.author.designation){
            publishDesignation = latestItem.author.designation
        }
        else {
            publishDesignation = "Unknown"
        }
        const latestPostDiv = document.createElement("div");
        latestPostDiv.classList = "border-[1px] border-[#0C0D2D26] p-6 rounded-xl"
        latestPostDiv.innerHTML = ` 
        <div class="mb-6">
        <img class="rounded-xl" src="${latestItem.cover_image}" alt="">
        </div>
        <div class="flex items-center gap-2">
            <img src="./images/Calender.png" alt="calender">
            <p>${publishDate}</p>
        </div>
        <div class="mt-4">
            <h1 class="text-title-color text-lg font-mulish font-extrabold leading-[30px] mb-3">${latestItem.title}</h1>
            <p class="text-[#12132D99] font-mulish leading-[26px]">${latestItem.description.slice(0,80)}</p>
        </div>
        <div class="mt-4 flex items-center gap-4">
            <div>
                <img class="w-[15vw] lg:w-[4vw] rounded-full" src="${latestItem.profile_image}" alt="profile">
            </div>
            <div>
                <h1 class="text-title-color font-mulish font-bold leading-[20px] mb-[5px]">${latestItem.author.name}</h1>
                <p class="text-[#12132D99] font-mulish leading-[18px]">${publishDesignation}</p>
            </div>
        </div>`
        latestPostCard.appendChild(latestPostDiv);
    }))
}
fetchLatestPost()
