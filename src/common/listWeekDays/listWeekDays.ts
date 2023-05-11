import * as moment from 'moment';

export const listWeekDays = (date: string): Date[] => {
	const month = moment(date).month();
	const monday = moment(date).clone().startOf('week').add(1, 'day');
	let sunday = moment(date).clone().endOf('week');

	if (sunday.format('dddd') !== 'Sunday') {
		sunday = sunday.add(1, 'day');
	}

	const datesOfWeek = [] as Date[];

	for (let i = 0; i <= 6; i++) {
		const currentDate = monday.clone().add(i, 'days');
		if (currentDate.isBetween(monday, sunday, null, '[]') && currentDate.month() === month) {
			const date = new Date(currentDate.format('YYYY-MM-DD'));
			datesOfWeek.push(date);
		}
	}
	return datesOfWeek;
};
