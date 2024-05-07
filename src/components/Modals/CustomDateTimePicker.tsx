// import React, { useState } from 'react';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { RenderFunction } from '@mui/x-date-pickers/typings/BasePicker';
// // import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRender';

// interface CustomStaticDateTimeProps {
//   label: string;
//   initialValue: string;
//   onChange: (newValue: Date) => void;
//   renderTimeView: renderTimeViewClock;
// }

// const CustomDateTimePicker: React.FC<CustomStaticDateTimeProps> = ({
//   label,
//   initialValue,
//   onChange,
//   renderTimeView,
// }) => {
//   const [dateTime, setDateTime] = useState<Date>(new Date(initialValue));

//   const handleDateTimeChange = (date: Date | null) => {
//     if (date) {
//       setDateTime(date);
//       onChange(date);
//     }
//   };

//   return (
//     <DateTimePicker
//       label={label}
//       value={dateTime}
//       onChange={handleDateTimeChange}
//     //   renderTimeView={renderTimeView}
//       renderTimeView={renderTimeViewClock}
//     />
//   );
// };

// export default CustomDateTimePicker;
