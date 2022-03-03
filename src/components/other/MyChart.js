import React, { useState, useEffect } from 'react';
import { Line, Chartjs } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase/Firebase';

import {
	query,
	collection,
	where,
	getDocs,
} from 'firebase/firestore';

const options = {
	maintainAspectRatio: true,
	scales: {
		x: {
			grid: {
				display: false,
			},
		},
		y: {
			grid: {
				borderDash: [3, 3],
			},
			// beginAtZero: true, // this works
		},
	},
	plugins: {
		legend: {
			display: false,
		},
	},
};
const MyChart = ({ chartChange }) => {
	let arr = [];
	const [incomeOfJan, setIncomeOfJan] = useState(0);
	const [incomeOfFeb, setIncomeOfFeb] = useState(0);
	const [incomeOfMar, setIncomeOfMar] = useState(0);
	const [incomeOfApr, setIncomeOfApr] = useState(0);
	const [incomeOfMay, setIncomeOfMay] = useState(0);
	const [incomeOfJun, setIncomeOfJun] = useState(0);
	const [incomeOfJul, setIncomeOfJul] = useState(0);
	const [incomeOfAug, setIncomeOfAug] = useState(0);
	const [incomeOfSep, setIncomeOfSep] = useState(0);
	const [incomeOfOct, setIncomeOfOct] = useState(0);
	const [incomeOfNov, setIncomeOfNov] = useState(0);
	const [incomeOfDec, setIncomeOfDec] = useState(0);

	const [mustFetch, setMustFetch] = useState(true);
	useEffect(() => {
		if ((mustFetch, chartChange)) {
			fetch();
		}
	}, [mustFetch, chartChange]);
	var today = new Date('Tue Mar 31 2022 04:49:15 GMT+0200');
	let month = today.getMonth() + 1;

	var lastDayOfMonth = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		0,
	);
	async function fetch() {
		try {
			setMustFetch(true);
			const fetchDataOfJan = query(
				collection(db, 'months'),
				where('month', '==', 1),
			);
			getDocs(fetchDataOfJan).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfJan(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfFeb = query(
				collection(db, 'months'),
				where('month', '==', 2),
			);
			getDocs(fetchDataOfFeb).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfFeb(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfMar = query(
				collection(db, 'months'),
				where('month', '==', 3),
			);
			getDocs(fetchDataOfMar).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						console.log(order.data().TotalMonthIncome);
						setIncomeOfMar(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfApr = query(
				collection(db, 'months'),
				where('month', '==', 4),
			);
			getDocs(fetchDataOfApr).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfApr(order.data().TotalMonthIncome);
					}
				});
			});

			const fetchDataOfMay = query(
				collection(db, 'months'),
				where('month', '==', 5),
			);
			getDocs(fetchDataOfMay).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfMay(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfJun = query(
				collection(db, 'months'),
				where('month', '==', 6),
			);
			getDocs(fetchDataOfJun).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfJun(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfJul = query(
				collection(db, 'months'),
				where('month', '==', 7),
			);
			getDocs(fetchDataOfJul).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfJul(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfAug = query(
				collection(db, 'months'),
				where('month', '==', 8),
			);
			getDocs(fetchDataOfAug).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfAug(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfSep = query(
				collection(db, 'months'),
				where('month', '==', 9),
			);
			getDocs(fetchDataOfSep).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfSep(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfOct = query(
				collection(db, 'months'),
				where('month', '==', 10),
			);
			getDocs(fetchDataOfOct).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfOct(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfNov = query(
				collection(db, 'months'),
				where('month', '==', 11),
			);
			getDocs(fetchDataOfNov).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfNov(order.data().TotalMonthIncome);
					}
				});
			});
			const fetchDataOfDec = query(
				collection(db, 'months'),
				where('month', '==', 12),
			);
			getDocs(fetchDataOfDec).then((orders) => {
				orders.docs.map((order) => {
					if (order.data().TotalMonthIncome !== '') {
						setIncomeOfDec(order.data().TotalMonthIncome);
					}
				});
			});

			setMustFetch(false);
		} catch (e) {
			console.log(e);
			setMustFetch(false);
		}
	}
	arr.push(
		incomeOfJan,
		incomeOfFeb,
		incomeOfMar,
		incomeOfApr,
		incomeOfMay,
		incomeOfJun,
		incomeOfJul,
		incomeOfAug,
		incomeOfSep,
		incomeOfOct,
		incomeOfNov,
		incomeOfDec,
	);
	console.log(arr);

	const data = {
		labels: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		datasets: [
			{
				label: 'My Balance',
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#b45f8b',
				borderColor: '#B57295',
				borderCapStyle: 'butt',
				borderDashOffset: 0.0,
				borderJoinStyle: '#B57295',
				pointBorderColor: '#B57295',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: '#B57295',
				pointHoverBorderColor: '#B57295',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: arr,
			},
		],
	};

	return <Line data={data} options={options} />;
};

export default MyChart;
