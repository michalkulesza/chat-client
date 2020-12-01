import React, { useEffect } from "react";
import "./Search.scss";

import MdSearch from "react-ionicons/lib/MdSearch";

type Props = {
	users: { id: string; username: string }[];
	setSortedUsers: React.Dispatch<React.SetStateAction<{ id: string; username: string }[]>>;
};

const Search: React.FC<Props> = ({ users, setSortedUsers }) => {
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		// let sortedUsers = [...users].filter(user => {
		// 	return user.name?.startsWith(e.target.value);
		// });
		// setSortedUsers(sortedUsers);
	};

	useEffect(() => {
		setSortedUsers(users);
	}, [setSortedUsers, users]);

	return (
		<div className="search">
			<div className="icon">
				<MdSearch />
			</div>
			<input type="text" placeholder="Search" onChange={e => handleSearch(e)} />
		</div>
	);
};

export default Search;
