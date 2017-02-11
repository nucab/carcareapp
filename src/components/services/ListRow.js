import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import dateformat from 'dateformat';

import {Card, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const cardStyle = {
	boxShadow: 'none'
};

const iconMenuLinkStyle = {
	textDecoration: 'none'
};

const ListRow = (props) => {

	const { entries } = props;

	return (
		<div>
			<Card style={cardStyle}>
				{entries.map(entry =>
					<CardText key={entry.id}>
						<div className="right-col">
							<IconMenu className="icon-menu" style={{marginTop: -10}} iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
								<Link style={iconMenuLinkStyle} to={`/service/${props.serviceType}/edit/${entry.id}`}><MenuItem>Edit</MenuItem></Link>
								<Link style={iconMenuLinkStyle} to=""><MenuItem>Delete</MenuItem></Link>
							</IconMenu>
						</div>
						<div className="left-col">
							<h4><span>{entry.brandName}</span>&nbsp;<span>{entry.marking}</span></h4>
							<p>Replaced: {dateformat(entry.replacementDate, "mmmm dd, yyyy")}</p>
							<p>{entry.remarks}</p>
						</div>
					</CardText>
				)}
			</Card>
		</div>
	);
};

ListRow.propTypes = {
	entries: PropTypes.array.isRequired,
	serviceType: PropTypes.string.isRequired
};

export default ListRow;
