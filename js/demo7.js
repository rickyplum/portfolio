(function() {
  var html = document.querySelector('html'),
  container = document.querySelector('div.container'),
  transEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  },
  transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
  support = {transitions:
    Modernizr.csstransitions
  };

	function toggleOverlay(e) {
    e.preventDefault();
    var overlay = classie.has(this, 'overlay-close') ?
      this.parentNode : document.querySelector(this.getAttribute("data-overlay"));
  
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.remove( container, 'overlay-open' );
			classie.add( overlay, 'close' );
			classie.remove( html, 'no-scroll' )
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
			classie.add( container, 'overlay-open' );
			classie.add( html, 'no-scroll' )
		}

		return false
	}

  var triggers = document.querySelectorAll('.trigger-overlay');
  for (var i = 0; i < triggers.length; ++i) {
    triggers[i].addEventListener( 'click', toggleOverlay);
  }
	
  var closers = document.querySelectorAll('.overlay-close');
  for (var i = 0; i < closers.length; ++i) {
    closers[i].addEventListener( 'click', toggleOverlay);
  }
})();
