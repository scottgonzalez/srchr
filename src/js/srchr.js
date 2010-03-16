(function( $ ) {

var util = {
	parse: function( str, data ) {
		return str.replace( /{([^}]+)}/g, function( match, name ) {
			return name in data ? data[ name ] : "";
		});
	},
	
	peek: function( obj, path ) {
		path = path.split( "." );
		while ( path.length ) {
			obj = obj[ path.shift() ];
		}
		return obj;
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
				$.each( util.peek( data, items), function( i, item ) {
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

srchr.addService( "flickr",
	"SELECT * FROM flickr.photos.search WHERE text = '{term}'",
	"query.results.photo",
	"<img src='http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_t.jpg'>"
);

srchr.addService( "yahoo",
	"SELECT * FROM search.images WHERE query = '{term}'",
	"query.results.result",
	"<img src='{thumbnail_url}'>"
);

srchr.addService( "upcoming",
	"SELECT * FROM upcoming.events WHERE description LIKE '%{term}%' OR name LIKE '%{term}%'",
	"query.results.event",
	"<p>{name}</p>"
);

})( jQuery );
