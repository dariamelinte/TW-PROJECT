import Header from '/frontend/components/header.js';
import FeedingNoteForm from '/frontend/components/forms/feedingNoteForm.js';

import Routes from '/frontend/utils/Routes.js';
import { INITIAL_FEEDING_NOTE } from '/frontend/utils/initialValues.js';

const { title } = Routes.children.feedingCalendar.add;

document.body.appendChild(Header(title));
document.body.appendChild(FeedingNoteForm({ feedingNote: INITIAL_FEEDING_NOTE, add: true }));