import Accordion from './accordion';
import AccordionPanel from './accordion-panel';
import AccordionPanelHeader from './accordion-panel-header';
import AccordionPanelContent from './accordion-panel-content';

export default {
	install(app) {
		app.component('accordion', Accordion);
		app.component('accordion-panel', AccordionPanel);
		app.component('accordion-panel-header', AccordionPanelHeader);
		app.component('accordion-panel-content', AccordionPanelContent);
	},
};

export { Accordion, AccordionPanel, AccordionPanelHeader, AccordionPanelContent };
