(function( srchr ) {

srchr.addService( "Flickr",
	"SELECT * FROM flickr.photos.search WHERE text = '{term}'",
	"photo",
	"<img src='http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_t.jpg'>"
);

srchr.addService( "Yahoo! Images",
	"SELECT * FROM search.images WHERE query = '{term}'",
	"result",
	"<img src='{thumbnail_url}'>"
);

srchr.addService( "Upcoming",
	"SELECT * FROM upcoming.events WHERE description LIKE '%{term}%' OR name LIKE '%{term}%'",
	"event",
	"<p>{name}</p>"
);

})( srchr );
