# React app for DRPG

This project covers the technical task provided as part of the interview process. 

Due to my current time constraints of [having multiple interview processes, current job, table tennis league 🏓, etc] I did not have enough time to do as much as I would normally do. In this ```README.md``` you can find some info of how I would have done things differently if I wasn't so busy this week. 

Please let me know if you have any issues accessing the project or any questions regarding it. 

## Instructions 

1. Clone the repo and run ```npm install``` in the terminal/console
2. Run ```npm start``` to start the app. Running it locally, the linter is going to complain about a small thing, click on close on the pop up window and you will be able to use the app. Access it via ```http://localhost:3000```
3. Run ```npm test ``` to run the test suites in Jest

## Reasoning of some of the current choices

Considerations: 
- The API provided could not really update user data so the updated data couldn't be reflected in the front-end app (even though requests to the endpoint were successful)
- I structured the project following as a wide the [clean code architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) where components and controllers belong to the interface layer and http to the frameworks layer
- I used toastify, materialui, react table and react query as external libraries to make development quicker (the first two) and follow better practices and implementations (the latest two)
- I had to rush a bit through the project so I wasn't able to add as many tests as I would usually do. I tested the part of the project that could be more prone to external failure from the API. 
- One of the component files I chose to use jsx to show how you can use both ```tsx``` and ```jsx``` in your project depending on the current needs

## What would you do if you had more time?

Here are a few things I would have done differently/ extra if I had more time: 
- First of all and most importantly: add more functional tests, specially for the business logic of the presenter components. Due to time, I was only able to test the controller part of the interface layer
- Added [husky](https://typicode.github.io/husky/#/) to make sure that I/my team could not push to Github unless the new branch/PR has no linting errors and it passes all tests
- Less use of external libraries, specifically toastify or materialui. Normally, specially in bigger projects, I would tend to use custom components and custom styling instead of third party libraries as this provides better security (less prone to library vulnerabilities) and more flexibility
- Use of [Snyk](https://snyk.io/), [SonarQube](https://www.sonarsource.com/products/sonarqube/) and Github actions to make sure that one a PR is created it passes all tests and SonarQube checks for any code inconsistencies or bad practices
- Code quality should be improved and abstracted. For instance, I would normally put columns object for the table in a separate file to keep things clean and provide better isolation for testing. 
- Better management of the API data. Currently, I did a quick fix for pagination slicing the data but the right solution should have been to do this on the table component rather than on the users component. This would have fixed the problem with the search inputs as these can only currently search on the data displayed (so if you chose to only show two items it can only search those two instead of the 6 returned from the API)
- Ability to do infinite scroll display where both requests are concatenated so that the user can see the full 12 items on scroll
- Nice API error page 
- As an extra, integration with [Split.io](https://www.split.io/) so that you can do A/B testing, user splits, etc. 
