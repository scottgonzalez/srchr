(function( srchr ) {

srchr.addService( "Flickr",
	"SELECT * FROM flickr.photos.search WHERE text = '{term}'",
	"<img src='http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_t.jpg'>"
);

srchr.addService( "Yahoo! Images",
	"SELECT * FROM search.images WHERE query = '{term}'",
	"<img src='{thumbnail_url}'>"
);

srchr.addService( "Upcoming",
	"SELECT * FROM upcoming.events WHERE description LIKE '%{term}%' OR name LIKE '%{term}%'",
	"<p>{name}</p>"
);

})( srchr );
