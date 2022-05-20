# Zerobug Team
### COM3504/COM6504 Intelligent Web
Assignment 2021-2022

##### Mermbers: Yue Zhou, Aijia Li, Yu Guo

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
Please run the www file in bin folder.
```
- node www

or

click run button in webstorm
``` 

Open your browser and enter the URL: http://localhost:3000/

When you first open a web page, it looks like this because you don't have any data in your database

![avatar](./Screenshots/welcome_0.jpg)
When some stories in your MongoDB, you will see them on the screen.
![avatar](./Screenshots/welcome_1.jpg)
<br>
You can click the three icons in the lower right corner.<br>
<b>Icon Above:</b> Back to top function<br>
<b>Icon Center:</b> Publish your story<br>
<b>Icon Blow:</b> Jump page to create a chat room<br>
<b>sort function:</b> You can choose how you want to sort these stories.<br>
![avatar](./Screenshots/sort.jpg)<br>
We provide five ways to sort:<br>
> Deafault [ Read in order of data in the database ]<br>
> Author: A to Z<br>
> Author: Z to A<br>
> Time: Early to Now<br>
> Time: Now to Early<br>

<br>

### Upload Story
![avatar](./Screenshots/uploadStory_0.jpg)

Complete each information

![avatar](./Screenshots/uploadStory_1.jpg)
 
 Click the <b>Submit</b> button to upload your story.

 
 ### Chat Room
 You can click the chat icon to create a chat room 
 or
 You can click any image to create a chat room
 
 ![avatar](./Screenshots/ChatRoom_0.jpg)

 After filling out the information in the form above, you can enter your chat room
![avatar](./Screenshots/ChatRoom_1.jpg)

![avater](./Screenshots/ChatRoom_2.jpg)

In this chat room, you can choose different colors to mark your picture.
![avater](./Screenshots/ChatRoom_markImg.jpg)

In right section, you can use knowledge graph to search something you want, which can match your image tag color.
![avater](./Screenshots/ChatRoom_knowledge.jpg)

In below section, your can message other people in the same chat room.
If someone enter the same room, you will be notified and receive messages from others.
![avater](./Screenshots/ChatRoom_message.jpg)

When you exit the room, pass the same name, the same photo and the same room number again, you will still see the picture tag and chat history you left last time.

 ### Offline Situation
 You can also in Offline status to use this website.
 ![avater](./Screenshots/offline.jpg)

 、
 ### Swagger Documentation
 If you want to check our swagger ducumentation, you can insert URL: http://localhost:3000/api-docs to find it.





