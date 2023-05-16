import * as moment from 'moment';

moment.updateLocale('en', {
	week: {
		dow: 1,
	},
});

export const listWorkingDays = (date: string): Date[] => {
	const month = moment(date).month();
	const monday = moment(date).clone().startOf('week').add(1, 'day');
	const sunday = moment(date).clone().endOf('week');

	const datesOfWeek = [] as Date[];

	for (let i = 0; i <= 6; i++) {
		const currentDate = monday.clone().add(i, 'days');
		if (currentDate.isBetween(monday, sunday, null, '[]') && currentDate.month() === month) {
			const date = new Date(currentDate.format('YYYY-MM-DD'));
			datesOfWeek.push(date);
		}
	}
	// console.log(datesOfWeek);
	return datesOfWeek;
};

export const listWeekDaysOfCurrentMonth = (date: string): Date[] => {
	const month = moment(date).month();
	const monday = moment(date).locale('en').clone().startOf('week');
	const sunday = moment(date).clone().endOf('week');

	const datesOfWeek = [] as Date[];

	for (let i = 0; i <= 6; i++) {
		const currentDate = monday.clone().add(i, 'days');
		if (currentDate.isBetween(monday, sunday, null, '[]') && currentDate.month() === month) {
			const date = new Date(currentDate.format('YYYY-MM-DD'));
			datesOfWeek.push(date);
		}
	}
	// console.log(datesOfWeek);
	return datesOfWeek;
};

export const listWeekDays = (date: string): Date[] => {
	const month = moment(date).month();
	const monday = moment(date).locale('en').clone().startOf('week');
	const sunday = moment(date).clone().endOf('week');

	const datesOfWeek = [] as Date[];

	for (let i = 0; i <= 6; i++) {
		const currentDate = monday.clone().add(i, 'days');
		const date = new Date(currentDate.format('YYYY-MM-DD'));
		datesOfWeek.push(date);
	}
	// console.log(datesOfWeek);
	return datesOfWeek;
};
