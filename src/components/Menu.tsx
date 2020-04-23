import React from "react";
import {
	Paper,
	Grid,
	Typography,
	Divider,
	createStyles,
	WithStyles,
	Theme,
	withStyles
} from "@material-ui/core";
import { format, differenceInCalendarMonths } from "date-fns";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import { DateRange, DefinedRange, Setter, NavigationAction } from "../types";
import { MARKERS } from "..";

const styles = (theme: Theme) =>
	createStyles({
		header: {
			padding: "20px 70px"
		},
		headerItem: {
			flex: 1,
			textAlign: "center"
		},
		divider: {
			borderLeft: `1px solid #d0dfef`,
			marginBottom: '20px'
		},
		pt20: {
			paddingTop: '20px'
		},
		widthFitContent: {
			position: 'absolute',
			top: '55px',
			minWidth: '100%',
			marginTop: '10px',
			borderRadius: 6,
			border: '1px solid #0085FF',
			boxShadow: '0 3px 20px rgba(100, 125, 147, 0.27)',
			zIndex: 9
		}
	});

interface MenuProps extends WithStyles<typeof styles> {
	dateRange: DateRange;
	ranges: DefinedRange[];
	minDate: Date;
	maxDate: Date;
	firstMonth: Date;
	secondMonth: Date;
	setFirstMonth: Setter<Date>;
	setSecondMonth: Setter<Date>;
	setDateRange: Setter<DateRange>;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Menu: React.FunctionComponent<MenuProps> = props => {
	const {
		classes,
		ranges,
		dateRange,
		minDate,
		maxDate,
		firstMonth,
		setFirstMonth,
		secondMonth,
		setSecondMonth,
		setDateRange,
		helpers,
		handlers
	} = props;
	const { startDate, endDate } = dateRange;
	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
	const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
	return (
		<Paper className={classes.widthFitContent} elevation={5} square>
			<Grid container direction="row" wrap="nowrap">
				<Grid>
					{/*<Grid container className={classes.header} alignItems="center">*/}
					{/*	<Grid item className={classes.headerItem}>*/}
					{/*		<Typography variant="subtitle1">*/}
					{/*			{startDate ? format(startDate, "MMMM DD, YYYY") : "Start Date"}*/}
					{/*		</Typography>*/}
					{/*	</Grid>*/}
					{/*	<Grid item className={classes.headerItem}>*/}
					{/*		<ArrowRightAlt color="action" />*/}
					{/*	</Grid>*/}
					{/*	<Grid item className={classes.headerItem}>*/}
					{/*		<Typography variant="subtitle1">*/}
					{/*			{endDate ? format(endDate, "MMMM DD, YYYY") : "End Date"}*/}
					{/*		</Typography>*/}
					{/*	</Grid>*/}
					{/*</Grid>*/}
					{/*<Divider />*/}
					<Grid container className={classes.pt20} direction="row" justify="center" wrap="nowrap">
						<Month
							{...commonProps}
							value={firstMonth}
							setValue={setFirstMonth}
							navState={[true, canNavigateCloser]}
							marker={MARKERS.FIRST_MONTH}
							label='From:'
						/>
						<div className={classes.divider} />
						<Month
							{...commonProps}
							value={secondMonth}
							setValue={setSecondMonth}
							navState={[canNavigateCloser, true]}
							marker={MARKERS.SECOND_MONTH}
							label='To:'
						/>
					</Grid>
				</Grid>
				{/*<div className={classes.divider} />*/}
				{/*<Grid>*/}
				{/*	<DefinedRanges*/}
				{/*		selectedRange={dateRange}*/}
				{/*		ranges={ranges}*/}
				{/*		setRange={setDateRange}*/}
				{/*	/>*/}
				{/*</Grid>*/}
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(Menu);
