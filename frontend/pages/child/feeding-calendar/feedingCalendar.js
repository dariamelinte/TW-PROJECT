import Header from '/frontend/components/header.js';
import Routes from '/frontend/utils/Routes.js';

const { title } = Routes.children.feedingCalendar;

document.body.appendChild(Header(title));
