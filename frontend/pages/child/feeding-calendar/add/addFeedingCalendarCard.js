import Header from '/frontend/components/header.js';
import FeedingNoteForm from '/frontend/components/forms/feedingNoteForm.js';
// import showError from '/frontend/utils/showError.js';

// import cleanInput from '/frontend/utils/cleanInput.js';
import Routes from '/frontend/utils/Routes.js';
// import { addFeedingEvent } from '/frontend/server/feeding/createFeedingEvent.js';
import { INITIAL_FEEDING_NOTE } from '/frontend/utils/initialValues.js';

const { title } = Routes.children.feedingCalendar.add;

// const childId = new URLSearchParams(window.location.search).get('childId');

// const onSave = async (formData) => {
//   // api call
//   const feedingInput = cleanInput(Object.fromEntries(formData));
//   console.log(formData);
//   const data = await addFeedingEvent(feedingInput, childId);

//   if (!data.success){
//     showError(data.message);
//     return;
//   }

//   // window.location.href = path(childId);
// } 

document.body.appendChild(Header(title));
document.body.appendChild(FeedingNoteForm({ feedingNote: INITIAL_FEEDING_NOTE, add: true }));