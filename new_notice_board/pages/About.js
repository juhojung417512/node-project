import React from 'react';
import queryString from 'query-string';

const About = ({location, match}) => {
    console.log(location);
    const query = queryString.parse(location.search);
    console.log(query);
    const detail = query.detail === 'true';
    return (
        <div>
            <h2>About {match.params.name}</h2>
            {detail && 'detail: asdasdasd'}
        </div>
    );
};

export default About;