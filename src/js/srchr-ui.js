(function( $) {

var services = $( "#services" ),
	results = $( "#search_results" )
		.wrap( "<div></div>")
		.parent()
			.tabs(),
	resultsPanel = {};

$( document )
	.bind( "srchr-addservice", function( event, data ) {
		var service = $( "<li></li>" ),
			
			checkbox = $( "<input type='checkbox'>" )
				.attr( "name", data.id )
				.appendTo( service ),
			
			label = $( "<label>" )
				.attr( "for", data.id )
				.text( data.name )
				.appendTo( service );
		
		services.append( service );
	})
	.bind( "srchr-addservice", function( event, data ) {
		var id = "#results-" + data.id;
		results.tabs( "add", id, data.name );
		resultsPanel[ data.id ] = $( id );
	})
	.bind( "srchr-result", function( event, data ) {
		resultsPanel[ data.serviceId ].append( data.html );
	});

})( jQuery );
