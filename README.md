# Lovely Left Overs
Project 3 Repo

### Members:
Mitch
Renice
Gloria
Bairong

## Our working app: <Link>
  https://lovelyleftovers-project3.herokuapp.com/

## Our working repository: <Link>
  https://git.generalassemb.ly/g00nd0/SEI-26_group1_project3
  
## Technologies used:
- MERN Stack
- dependencies: 
  1. axios
  2. @material-ui/core + @material-ui/icons
  3. react-bootstrap + bootstrap
  4. react-router
  5. react-moment
  6. joi
  7. lodash
  


## Our Approach

**Organization**
1.  Frontend development:
  - Mitch: responsible for Routing, dealing with components of Batch and Listing.
  - Renice: responsible for User Authentication and User components.
  
2.  Backend development:
  - Gloria: responsible for session and user schema/ validation and authentication.
  - Bairong: responsible for Batch, the nested Listing schema / validation & styling.
  
3. **General approach**
- Initial planning
  A lot of time was spent on wireframing and finalizing our user story. From there, we moved on to designing a database that could make our vision a possibility. We research heavily on unfamiliar topics before we proceeded with our project. (e.g. database relationships or user authentication)
- Communication
  We maintained constant communications with one another to keep every one for the purpose of updates and working through problems. Trello was also used to help us keep track of our team's progress for the project.
  
## Major hurdles
1) Deciding the data relationship between our Batch and Listing Schemas:
  We were unfamiliar with dealing with related data schemas that could potentially required us to make sophisticated operations in order to properly update our databases. In the end, we decided to just proceed with using embedded documents due to the ease of usage.
 
2) POST / PUT actions from the frontend and embedded documents.
  We wanted to have a form that allows the user to dynamically add or remove the number of food items in a batch, as well as update and keep track of changes in the state. A form was created in a separate component, ItemDetailsAdd, specifically for adding food items only. 
  For CollectionView (for recipients), we opted to display a user's collected items similar to the Food Listings page, instead of what was shown in the wireframe. To display it like the wireframe, we would need make several axios calls and create an overly complicated function to link the data. 

3) User Authentication & Authorisation:
  We took a long time to find a feasible solution to ensure that an authenticated (logged in) user will be able to access the app in the manner he is authorised to do so. Due to a lack of time, we decided to try using useContext/useReducer for Authentication and storing user info in sessionStorage, which admittedly exposes our app to security risks.
  
4) Doing cross documents updates. (Referencing Docs).  --- GLORIA HERE ----
 

Problem Statement, Solution, User Story, Tech used, Wireframe:
https://docs.google.com/spreadsheets/d/1LeVqVNUfh9SaKYF2lVWPQ7ilunT0e9HQTQQ_9VdBBHA/edit?usp=sharing
