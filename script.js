var app = {
	//Define the url for the wikipedia API call
	apiURL: "https://content.guardianapis.com/search?api-key=6fc923ea-a880-4cf7-ad26-ab19848d81c7",

	//A place to set up listeners or kick off an initial function
	initialize: function() {
		//Execute the Wikipedia API call function with the currentWord var as the argument
		app.hitApi();
		console.log("Getting Guardian Data");

		var guardianURL = "https://content.guardianapis.com/search?api-key=6fc923ea-a880-4cf7-ad26-ab19848d81c7";
		var myGuardianAPIKey = "6fc923ea-a880-4cf7-ad26-ab19848d81c7";
		var guardianReqURL = guardianURL + myGuardianAPIKey;
	},

	//Define a function to execute the AJAX call
	//The argument will be the desired search term
	hitApi: function() {
		
		$.ajax({
			url: app.apiURL,
			type: 'GET',
			dataType: 'jsonp',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				console.log("Got the data");
				console.log(data);
				var theArticles = data.response.results;
				console.log(theArticles);
				app.onSuccess(theArticles);
			}
		});
	},

	onSuccess: function(data) {
		console.log(data);
      	var imgArray  = [];
		var html = "";
		for (var i = 0; i < data.length; i++){
          	html += "<figure><img id='img"+i+"' src=''><figcaption>" + data[i].webTitle + "</figcaption></figure>";
          	imgArray.push(data[i].sectionName);
		}
	
		$('#results').html(html);
      	for (var i=0; i<imgArray.length; i++){
        	photos.hitApi(imgArray[i], i);
        }
	}
};

//pixabay photos

var photos = {
	//Define the url for the API call
	apiURL: "https://pixabay.com/api/?key=5987521-c74e00106e8bcf856c8eb71db&image_type=photo&q=",
	byKeyWord: {},
	//Define a function to execute the AJAX call
	//The argument will be the desired search term
	hitApi: function(searchStr, index) {
		
		$.ajax({
			url: photos.apiURL + searchStr,
			type: 'GET',
			dataType: 'jsonp',
			error: function(data){
				console.log("We got problems");
				console.log(data.status);
			},
			success: function(data){
				console.log("Got the data");
				console.log(data);				
				photos.onSuccess(data, index, searchStr);
			}
		});
	},

	onSuccess: function(data, index, searchStr) {
		console.log(data.hits[0].previewURL);
		photos.byKeyWord[searchStr] = data.hits;
	var photoIndex = photos.getRandomByKeyWord (searchStr);
		$("#img" + index)
			.attr("data-keyWord", searchStr)
			.attr("src", photos.byKeyWord[searchStr][photoIndex].previewURL)
			.on("click",photos.switchPhoto);
	}, 
	getRandomByKeyWord: function (keyWord){
		return Math.floor(Math.random()*photos.byKeyWord[keyWord].length);
	},
	switchPhoto: function(){
		var keyWord = $(this).attr("data-keyWord");
		var photoIndex = photos.getRandomByKeyWord(keyWord);
		$(this).attr("src", photos.byKeyWord[keyWord][photoIndex].previewURL);
	}
 };




