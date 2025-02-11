// D3 is included by globally by default
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import graphic from './graphic';
import everUsed from './everUsed'
import firstTime from './firstTime'
import overTime from './overTime'
import multiple from './multipleMethods'
import sideEffects from './sideEffects'
import clippy from './clippy'
import SimpleBar from 'SimpleBar';

const $body = d3.select('body');
let previousWidth = 0;

new SimpleBar(document.getElementById('info-container'));

function resize() {
	// only do resize on width changes, not height
	// (remove the conditional if you want to trigger on height change)
	const width = $body.node().offsetWidth;
	if (previousWidth !== width) {
		previousWidth = width;
		graphic.resize();
		firstTime.resize()
		multiple.resize()
	}
}

function setupStickyHeader() {
    const $header = $body.select('header');
    if ($header.classed('is-sticky')) {
        const $menu = $body.select('.header__menu');
        const $toggle = $body.select('.header__toggle');
        $toggle.on('click', () => {
            const visible = $menu.classed('is-visible');
            $menu.classed('is-visible', !visible);
            $toggle.classed('is-visible', !visible);
        });
    }
}

function init() {
	// add mobile class to body tag
	$body.classed('is-mobile', isMobile.any());
	// setup resize event
	window.addEventListener('resize', debounce(resize, 150));
	// setup header
	setupStickyHeader();
	// kick off graphic code
		//graphic.init(),
		const promises = [
			everUsed.init(),
			firstTime.init(),
			overTime.init(),
			multiple.init(),
			sideEffects.init()
		]

		Promise.all(promises)
			.then(() => {
				clippy.init()
			})
			.catch(() => {
				console.log("Caught an error")
			})

}

init();
