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
	document: $( document ),
	
	addService: function( name, query, items, template ) {
		var key = name.replace( /[^a-zA-Z]+/g, "-" );
		srchr.services[ key ] = {
			query: query,
			handleResult: function( data ) {
				// force results to be an array
				var results = data.query.results[ items ];
				results = $.isArray( results ) ? results : [ results ];
				
				$.each( results, function( i, item ) {
					var html = util.parse( template, item );
					srchr.document.trigger( "srchr-result", {
						service: name,
						html: html
					});
				});
			}
		};
		
		srchr.document.trigger( "srchr-addservice", {
			name: name,
			key: key
		});
		
		return key;
	},
	
	search: function( service, term ) {
		var service = srchr.services[ service ];
		$.getJSON( YQL.url, YQL.params( service, term ), service.handleResult );
	}
};

})( jQuery );
