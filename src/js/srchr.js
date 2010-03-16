(function( $ ) {

var util = {
	parse: function( str, data ) {
		return str.replace( /{([^}]+)}/g, function( match, name ) {
			return name in data ? data[ name ] : "";
		});
	}
};

var YQL = {
	url: "http://query.yahooapis.com/v1/public/yql",
	params: function( service, term ) {
		return {
			q: util.parse( service.query, { term: term } ),
			format: "json"
		};
	}
};

var srchr = window.srchr = {
	terms: {},
	services: {},
	
	addService: function( name, query, items, template ) {
		srchr.services[ name ] = {
			query: query,
			handleResult: function( data ) {
				// force results to be an array
				var results = data.query.results[ items ];
				results = $.isArray( results ) ? results : [ results ];
				
				$.each( results, function( i, item ) {
					var html = util.parse( template, item );
					$( html ).appendTo( "body" );
				});
			}
		};
	},
	
	search: function( service, term ) {
		var service = srchr.services[ service ];
		$.getJSON( YQL.url, YQL.params( service, term ), service.handleResult );
	}
};

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

})( jQuery );
