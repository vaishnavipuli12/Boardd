// // @ts-nocheck
// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
// // import { LocalizationProvider, AdapterDayjs, StaticDateTimePicker } from '@mui/x-date-pickers';

// interface CustomStaticDateTime {
//   label: string;
//   initialValue: string;
//   onChange: (newValue: Dayjs) => void;
// }

// const CustomStaticDateTime: React.FC<CustomStaticDateTimeProps> = ({
//   label,
//   initialValue,
//   onChange,
// }) => {

//   const [startDate, setStartDate] = useState<Dayjs>(dayjs(initialValue));

//   const handleDateChange = (date: Dayjs) => {
//     setStartDate(date);
//     onChange(date);
//   };

//   return (
//     // <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDateTimePicker
//         label={label}
//         value={startDate}
//         onChange={handleDateChange}
//       />
//     // </LocalizationProvider>
//   );
// }
// export default CustomStaticDateTime;
