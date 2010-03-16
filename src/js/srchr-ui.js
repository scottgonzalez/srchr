(function( $) {

var services = $( "#services" );

$( document )
	.bind( "srchr-addservice", function( event, data ) {
		var service = $( "<li></li>" ),
			
			checkbox = $( "<input type='checkbox'>" )
				.attr( "name", data.key )
				.appendTo( service ),
			
			label = $( "<label>" )
				.attr( "for", data.key )
				.text( data.name )
				.appendTo( service );
		
		services.append( service );
	})
	.bind( "srchr-result", function( event, data ) {
		$( "body" ).append( data.html );
	});

})( jQuery );
