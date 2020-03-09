import * as React from "react";
import {
	IconButton,
	Typography,
	createStyles,
	Theme,
	WithStyles,
	withStyles
} from "@material-ui/core";
import { combine } from "../utils";

interface DayProps extends WithStyles<typeof styles> {
	filled?: boolean;
	outlined?: boolean;
	highlighted?: boolean;
	disabled?: boolean;
	startOfRange?: boolean;
	endOfRange?: boolean;
	onClick?: () => void;
	onHover?: () => void;
	value: number | string;
}

const styles = (theme: Theme) =>
	createStyles({
		leftBorderRadius: {
			borderRadius: "50% 0 0 50%"
		},
		rightBorderRadius: {
			borderRadius: "0 50% 50% 0"
		},
		buttonContainer: {
			display: "flex"
		},
		button: {
			height: 36,
			width: 36,
			padding: 0
		},
		buttonText: {
			lineHeight: 1.6,
			color: 'rgba(46,46,46,1)'
		},
		buttonTextDisabled: {
			color: 'rgba(46,46,46,0.38)'
		},
		outlined: {
			border: `1px solid #2E2E2E`
		},
		filled: {
			"&:hover": {
				backgroundColor: '#0085FF'
			},
			backgroundColor: '#0085FF'
		},
		highlighted: {
			backgroundColor: 'rgba(0,133,255,0.14)'
		},
		contrast: {
			color: theme.palette.primary.contrastText
		}
	});

const Day: React.FunctionComponent<DayProps> = props => {
	const { classes } = props;
	return (
		<div
			className={combine(
				classes.buttonContainer,
				props.startOfRange && classes.leftBorderRadius,
				props.endOfRange && classes.rightBorderRadius,
				!props.disabled && props.highlighted && classes.highlighted
			)}>
			<IconButton
				className={combine(
					classes.button,
					!props.disabled && props.outlined && classes.outlined,
					!props.disabled && props.filled && classes.filled
				)}
				disabled={props.disabled}
				onClick={props.onClick}
				onMouseOver={props.onHover}>
				<Typography
					color={!props.disabled ? "default" : "textSecondary"}
					className={combine(
						classes.buttonText,
						props.disabled ? classes.buttonTextDisabled : "",
						!props.disabled && props.filled && classes.contrast
					)}
					variant="body2">
					{props.value}
				</Typography>
			</IconButton>
		</div>
	);
};

export default withStyles(styles)(Day);
