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
	
	addService: function( name, query, template ) {
		var id = name.toLowerCase().replace( /[^a-z]+/g, "-" );
		srchr.services[ id ] = {
			query: query,
			handleResult: function( data ) {
				// force results to be an array
				var results = data.query.results;
				if ( !results ) {
					return;
				}
				
				for (var prop in results) {}
				results = $.isArray( results[ prop ] ) ? results[ prop ] : [ results ];
				$.each( results, function( i, item ) {
					var html = util.parse( template, item );
					srchr.document.trigger( "srchr-result", {
						serviceId: id,
						service: name,
						html: html
					});
				});
			}
		};
		
		srchr.document.trigger( "srchr-addservice", {
			name: name,
			id: id
		});
		
		return id;
	},
	
	search: function( term, service ) {
		var service = srchr.services[ service ];
		$.getJSON( YQL.url, YQL.params( service, term ), service.handleResult );
	}
};

})( jQuery );
