import React from "react";
import "./Search.scss";

import MdSearch from "react-ionicons/lib/MdSearch";

interface Props {}

const Search: React.FC<Props> = () => {
	return (
		<div className="search">
			<div className="icon">
				<MdSearch />
			</div>
			<input type="text" placeholder="Search" />
		</div>
	);
};

export default Search;
