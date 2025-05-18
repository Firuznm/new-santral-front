import { createContext, useContext, useState } from 'react';
import santral from '../Helpers/Helpers';
import urls from '../ApiUrls/Urls';

const searchContext = createContext();

const SearchProvider = ({ children }) => {
	const [searchInputValue, setSearchInputValue] = useState('');
    const [searchResult, setSearchResult] = useState();
    
      const searchFunc = async (search) => {
	try {
		const trimmedSearch = search.trim();
		if (!trimmedSearch) return;

		const resData = await santral
			.api()
			.post(`${urls.search(trimmedSearch)}&lang=az`);

		setSearchResult(resData.data.data);
	} catch (error) {
		console.log("Search error:", error);
	}
};


	return (
		<searchContext.Provider
			value={{ searchInputValue, setSearchInputValue, searchResult, searchFunc }}
		>
			{children}
		</searchContext.Provider>
	);
};

const useSearch = () => {
	return useContext(searchContext);
};

export { SearchProvider, useSearch };
