// Importing the 'useState' hook from React, and the 'Link' component from 'react-router-dom'.
// Also, importing the 'hash' function from the '../../functions/TagsHelper' module.
import { useState } from "react";
import { Link } from "react-router-dom";
import { hash } from "../../functions/TagsHelper";

// A functional component 'SearchField' that receives no props (hence, the empty curly braces).
const SearchField = ({ }) => {
    // Using the 'useState' hook to create a 'searchTag' state variable and 'setSearchText' function
    // to handle changes to the search input field.
    const [searchTag, setSearchText] = useState('');

    // JSX code for rendering the search box.
    return (
        <div className={"search-box"}>
            {/* An input field for users to type their search query. */}
            <input value={searchTag} onChange={(ev) => setSearchText(ev.target.value)}></input>
            {/* A 'Link' component from 'react-router-dom' that creates a hyperlink to the search results page.
                The hyperlink URL is constructed using the 'hash' function from '../../functions/TagsHelper',
                which converts the searchTag to a hash value and appends it to '/search/'. */}
            <Link to={'/search/' + hash(searchTag)}>
                {/* A button that users can click to perform the search based on the entered searchTag. */}
                <button> search</button>
            </Link>
        </div>
    );
}

// Exporting the 'SearchField' component as the default export for this module.
export default SearchField;
