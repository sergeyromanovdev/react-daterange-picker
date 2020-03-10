import {
	WithStyles,
	Grid,
	createStyles,
	withStyles,
	IconButton,
	Select,
	MenuItem, SvgIcon
} from "@material-ui/core";
import React from "react";
import { setMonth, getMonth, setYear, getYear } from "date-fns";

interface HeaderProps extends WithStyles<typeof styles> {
	date: Date;
	setDate: (date: Date) => void;
	nextDisabled: boolean;
	prevDisabled: boolean;
	onClickNext: () => void;
	onClickPrevious: () => void;
}

const styles = createStyles({
	iconContainer: {
		padding: 5
	},
	icon: {
		padding: 10,
		"&:hover": {
			background: "none"
		}
	},
	select: {
		border: '1px solid #D0DFEF',
		borderRadius: 5,
		padding: '0 10px',
		color: '#333945',
		fontSize: '15px',
		fontWeight: 500,
		fontFamily: "Helvetica Neue",
		"&:before": {
			display: 'none',
		},
		"&:after": {
			display: 'none',
		},
		"&:focus": {
			backgroundColor: 'transparent!important',
			outline: 'none'
		},
		div: {
			"&:focus": {
				backgroundColor: 'transparent!important',
				outline: 'none'
			}
		}
	},
	arrowIcon: {
		fill: 'none',
		stroke: '#0085ff',
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	}
});

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const generateYears = (relativeTo: Date, count: number) => {
	const half = Math.floor(count / 2);
	return Array(count)
		.fill(0)
		.map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
	date,
	classes,
	setDate,
	nextDisabled,
	prevDisabled,
	onClickNext,
	onClickPrevious
}) => {
	const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDate(setMonth(date, parseInt(event.target.value)));
	};

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDate(setYear(date, parseInt(event.target.value)));
	};

	const ArrowIcon = () => (
		<SvgIcon>
				<path id="Path_13143" data-name="Path 13143" className={classes.arrowIcon} d="M2360.908,1120.023l4.625,4.624,4.624-4.624"
							transform="translate(-2360.201 -1119.316)"/>
		</SvgIcon>
	);

	return (
		<Grid container justify="space-between" alignItems="center">
			<Grid item className={classes.iconContainer}>
			</Grid>
			<Grid item>
				<Select
					className={classes.select}
					value={getMonth(date)}
					onChange={handleMonthChange}
					MenuProps={{ disablePortal: true }}>
					{MONTHS.map((month, idx) => (
						<MenuItem key={month} value={idx}>
							{month}
						</MenuItem>
					))}
				</Select>
			</Grid>

			<Grid item>
				<Select
					className={classes.select}
					value={getYear(date)}
					onChange={handleYearChange}
					MenuProps={{ disablePortal: true }}>
					{generateYears(date, 30).map(year => (
						<MenuItem key={year} value={year}>
							{year}
						</MenuItem>
					))}
				</Select>

				{/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
			</Grid>
			<Grid item className={classes.iconContainer}>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Header);
