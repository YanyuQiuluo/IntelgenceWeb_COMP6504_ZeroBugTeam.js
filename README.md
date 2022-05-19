# Zerobug Team
### COM3504/COM6504 Intelligent Web
Assignment 2021-2022

<b>Using the website, the users can create reports, access them and comment on them. </b>

## Before  Use

### Installing MongoDB
We use MongoDB to store all uploaded report information (Including title, author, publication time, short description and photo).

You can download MongoDB on this [webist](https://www.mongodb.com/try/download/community).


When you start your MongoDB and specify the data storage path, we can start the website.
Such as:
```
- mongod -dbpath "Your path"

// Then run MongoDB

- mongo

```

### Open Website
Open your browser and enter the URL: http://localhost:3000/

When you first open a web page, it looks like this because you don't have any data in your database

![avatar](./Assignment_starting_point/Screenshots/welcome_0.jpg)
When some stories in your MongoDB, you will see them on the screen.
![avatar](./Assignment_starting_point/Screenshots/welcome_1.jpg)
<br>
You can click the three icons in the lower right corner
<b>Icon Above:</b> Back to top function
<b>Icon Center:</b> Publish your story
<b>Icon Blow:</b> Jump page to create a chat room
<b>sort function:</b> You can choose how you want to sort these stories.
![avatar](./Assignment_starting_point/Screenshots/sort.jpg)
We provide five ways to sort:
> Deafault [ Read in order of data in the database ]
> Author: A to Z
> Author: Z to A
> Time: Early to Now
> Time: Now to Early

<br>

### Upload Story
![avatar](./Assignment_starting_point/Screenshots/uploadStory_0.jpg)

Complete each information

![avatar](./Assignment_starting_point/Screenshots/uploadStory_1.jpg)
 
 Click the <b>Submit</b> button to upload your story.

 
 ### Chat Room
 You can click the chat icon to create a chat room 
 or
 You can click any image to create a chat room









