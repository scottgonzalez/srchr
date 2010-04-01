(function( $) {

var search = $( "#search" ),
	services = $( "#services" ).children(),
	searchTerms = $( "#search_terms" )
		.addClass( "ui-widget ui-widget-content ui-corner-all" ),
	results = $( "#search_results" )
		.wrap( "<div></div>")
		.parent()
			.tabs(),
	resultsPanel = {};

$( document )
	.bind( "srchr-addservice", function( event, data ) {
		var service = $( "<li></li>" ),
			
			checkbox = $( "<input type='checkbox'>" )
				.attr({
					id: data.id,
					name: data.id,
					checked: true
				})
				.appendTo( service ),
			
			label = $( "<label>" )
				.attr( "for", data.id )
				.text( data.name )
				.appendTo( service );
		
		checkbox.button();
		services.append( service );
	})
	.bind( "srchr-addservice", function( event, data ) {
		var id = "#results-" + data.id;
		results.tabs( "add", id, data.name );
		resultsPanel[ data.id ] = $( id );
	})
	.bind( "srchr-result", function( event, data ) {
		var result = $( "<div></div>" )
			.addClass( "result ui-widget-content ui-corner-all" )
			.html( data.html )
			.appendTo( resultsPanel[ data.serviceId ] );
		
		$( "<span></span>" )
			.addClass( "result-term ui-widget-header ui-corner-all" )
			.text( data.term )
			.appendTo( result );
	});

var randomClasses = "ui-state-default ui-state-active ui-state-hover".split( " " );
$( "#search_submit" )
	.button()
	.click(function() {
		var term = search.val();
		services.find( ":checked" ).each(function() {
			srchr.search( term, this.name );
		});
		
		// TODO: list services
		// TODO: make removable
		var randomClass = randomClasses[ Math.floor( Math.random() * 3 ) ];
		$( "<li></li>" )
			.addClass( "ui-corner-all " + randomClass )
			.text( term )
			.appendTo( searchTerms );
		
		return false;
	});

})( jQuery );
