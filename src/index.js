
const imageUrl = "http://localhost:3000/images/1"
const commentsUrl = "http://localhost:3000/comments"

const title = document.querySelector("#card-title")
const cardImage = document.getElementById("card-image")
let likes = document.querySelector("#like-count")  
document.addEventListener('DOMContentLoaded', function () {
    // Select the comments list element
    const commentsInitial = document.getElementById("comments-list")
    // Remove all existing child nodes
    while (commentsInitial.firstChild) {
        commentsInitial.firstChild.remove()
    }

    // Fetch and display dog details from API endpoint
    dogDetails()
    // Fetch , display and updates comments from API endpoint
    comments()
    // Fetch, display and updates likes from Api endpoints
    likesDetail()
    

})


// Display title, image, and like using the fetched data
function dogDetails() {
    // Fetch image from URL
    fetch(imageUrl)
        // Convert response to JSON
        .then(res => res.json())
        // Display title, image, and like using the fetched data
        .then((data) => { diplayTitleImageLike(data) })
}


//  function to display title, image and likes on the page
function diplayTitleImageLike(data) {
    // set title to the data's title
    title.innerText = data.title
    // styling the pointer to be pointer
    title.style.cursor="pointer"
    // Click the title of the image to toggle whether or not the image is being displaye
    imageToggle(title)
    // set image source to the data's image
    cardImage.src = `${data.image}`
    // styling the pointer to be pointer
     cardImage.style.cursor="pointer"
    // Random image when image is clicked
    randomImage(cardImage)
    // set likes to the number of likes in the data
    likes.innerText = `${data.likes} likes`


}


// Function to update like count on page and Api
function likesDetail() {
    fetch(imageUrl)
        .then(res => res.json())
        .then((data) => {
            // Increase likes for the data
            increaseLike(data)
        })

}



// Function to increase like count
function increaseLike(data) {
    // Select like button and like count elements
    const likeBtn = document.getElementById('like-button')
    const likes = document.querySelector("#like-count")
    // Add click event listener to like button
    likeBtn.addEventListener('click', function (e) {
        e.preventDefault()
        data.likes += 1
        likes.innerText = `${data.likes} likes`
        // Updates the server when  a new like has been added
        updateLikes(data)
    })

}



// Function to update server likes using PATCH method 
function updateLikes(likes) {
    // Fetch request to update likes
    fetch(`${imageUrl}`, {
        // Set request method to PATCH
        method: "PATCH",
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(likes)
    })
        .then(res => res.json())
}




// Function to fetch comments from the API and display comments on the page
function comments() {
    fetch(commentsUrl)
        .then(res => res.json())
        .then(data => {
            const commentsData = data
            commentsData.forEach(comment => {
                const commentsList = document.querySelector("#comments-list")
                // Select the comments list element
                const commentLists = document.createElement('li')
                // Set the text content of the list item to the comment content
                commentLists.innerText = comment.content
                // styling the list upon cursor
                commentLists.style.cursor="pointer"

                 // Deletes  a comment and update the server when aparticuler comment is clicked
                deleteComment(commentLists,comment)
               // Append the list item to the comments list
                commentsList.appendChild(commentLists)
            

            });

        })

}




const form = document.querySelector("form")
// Listen for submit event on the form
form.addEventListener('submit', function (e) {
    const commentsList = document.querySelector("#comments-list")
    // Select the comments list element
    const commentLists = document.createElement('li')
    // Set the text content of the list item to the comment content
    commentLists.innerText =  e.target.comment.value
    // Append the list item to the comments list
    commentsList.appendChild(commentLists)
    
    // Prevent the form from submitting in the default manner
    e.preventDefault()
    // Create a new comment object with imageId and content properties
    let commentObj = {
        imageId: 1,
        content: e.target.comment.value
    }
    e.target.reset()
    // UPDATES THE API
    addObject(commentObj)

}

)




// Function to add an objects to the commentsUrl endpoint
function addObject(obj) {
    // Use the fetch API to make a POST request
    fetch(commentsUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
}



  
// Function to delete a comment when the comment is clicked and update the server
function deleteComment(list,comment) {
    // Add click event listener to the list
    list.addEventListener("click", () => {
        // Remove the list item when clicked
        list.remove();
        removeCommentServer(comment)
        
    });
}



// when title  of the image is clicked toggle image whether or not the image is being displayed
function imageToggle(title){
    title.addEventListener("click",()=>{
        // add and remove hidden class
        cardImage.classList.toggle("hidden")
    })
}



// Random image when the image is clicked
function randomImage(image){
    image.addEventListener("click",()=>{
        fetch("https://dog.ceo/api/breeds/image/random ")
        .then(res=>res.json()).then(
            data=>{
                image.src=`${data.message}`
            }
        )

    })
}



// Function to remove comment from server
function removeCommentServer(comment) {
    // Fetch request to update likes
    fetch(`http://localhost:3000/comments/${comment.id}`, {
        // Set request method to PATCH
        method: 'DELETE',
        headers: {
            'Content-Type': 'aplication/json'
        }
    })
        .then(res => res.json())
}

