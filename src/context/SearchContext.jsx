import { createContext, useContext, useState } from 'react';
import santral from '../Helpers/Helpers';
import urls from '../ApiUrls/Urls';

const searchContext = createContext();

const SearchProvider = ({ children }) => {
	const [searchInputValue, setSearchInputValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [searchQueryData, setSearchQueryData] = useState([]);
	const [searchLoading, setSearchLoading] = useState(true)
    
      const searchFunc = async (search,page=1) => { 
	try {
		if (!search) return;
		const resData = await santral.api().post(urls.search(search, page));
		setSearchResult(resData.data);
	} catch (error) {
		console.log("Search error:", error);
	}
        };  

		const searchQueryFunc = async (search, page = 1) => {
			try {
				if (!search) return;
				const resData = await santral.api().post(urls.search(search, page));
				setSearchQueryData(resData.data);
				setSearchLoading(false);
			} catch (error) {
				console.log('Search error:', error);
				setSearchLoading(false);
			}
		};  

	return (
		<searchContext.Provider
			value={{
				searchInputValue,
				setSearchInputValue,
				searchResult,
				searchQueryData,
				searchFunc,
				searchQueryFunc,
				searchLoading
			}}
		>
			{children}
		</searchContext.Provider>
	);
};

const useSearch = () => {
	return useContext(searchContext);
};

export { SearchProvider, useSearch };
