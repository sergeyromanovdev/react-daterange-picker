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
	label: string;
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
		margin: '0 5px',
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
	selectMenu: {
		padding: ' 7px 20px 7px 0'
	},
	selectMenuYear: {
		padding: ' 7px 20px 7px 0',
		lineHeight: '18px'
	},
	arrowIcon: {
		fill: 'none',
		stroke: '#0085ff',
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	},
	labelContainer: {
		color: '#808F94',
		fontSize: '16px',
		fontWeight: 600,
		fontFamily: "Helvetica Neue",
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
	onClickPrevious, 
	label
}) => {
	const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDate(setMonth(date, parseInt(event.target.value)));
	};

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDate(setYear(date, parseInt(event.target.value)));
	};

	const ArrowIcon = () => (
		<SvgIcon viewBox='0 0 10.663 5.831' style={{ width: '9.25px', height: '4.62', top: 'calc(50% - 2px)', right: 0,
			position: 'absolute', pointerEvents: 'none'}}>
				<path id="Path_13143" data-name="Path 13143" className={classes.arrowIcon} d="M2360.908,1120.023l4.625,4.624,4.624-4.624"
							transform="translate(-2360.201 -1119.316)"/>
		</SvgIcon>
	);

	return (
		<Grid container justify="center" alignItems="center">
			<Grid item className={classes.labelContainer}>
				{label}
			</Grid>
			<Grid item>
				<Select
					className={classes.select}
					classes={{
						selectMenu: classes.selectMenu
					}}
					value={getMonth(date)}
					onChange={handleMonthChange}
					IconComponent={ArrowIcon}
					MenuProps={{ disablePortal: true }}>
					{MONTHS.map((month, idx) => (
						<MenuItem key={month} value={idx}>
							{month}
						</MenuItem>
					))}
				</Select>
				<Select
					className={classes.select}
					classes={{
						selectMenu: classes.selectMenuYear
					}}
					value={getYear(date)}
					onChange={handleYearChange}
					IconComponent={ArrowIcon}
					MenuProps={{ disablePortal: true }}>
					{generateYears(date, 30).map(year => (
						<MenuItem key={year} value={year}>
							{year}
						</MenuItem>
					))}
				</Select>

				{/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Header);
