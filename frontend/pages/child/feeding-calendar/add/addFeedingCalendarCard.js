import Header from '/frontend/components/header.js';
import FeedingNoteForm from '/frontend/components/forms/feedingNoteForm.js';

import Routes from '/frontend/utils/Routes.js';
import { INITIAL_FEEDING_NOTE } from '/frontend/utils/initialValues.js';

const { add, path } = Routes.children.feedingCalendar;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId);
} 

document.body.appendChild(Header(add.title));
document.body.appendChild(FeedingNoteForm({ feedingNote: INITIAL_FEEDING_NOTE, onSave }));