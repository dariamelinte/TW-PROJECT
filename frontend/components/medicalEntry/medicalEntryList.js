import MedicalEntryCard from "./medicalEntryCard.js";

export default function MedicalEntryList({ medicalEntries, onClick }) {
  const medicalEntryList = document.createElement('div');
  medicalEntryList.className = "center flex-wrap mt-6";
  
  medicalEntryList.appendChild(MedicalEntryCard({ add: true, onClick }))

  medicalEntries.forEach((medicalEntry) => {
    medicalEntryList.appendChild(MedicalEntryCard({ medicalEntry, onClick }));
  });

  return medicalEntryList;
}