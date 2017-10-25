import React, { Component } from 'react';

const Searchbar = (props) => (
    <form className="form-inline my-2 my-lg-0 hidden-print">
        <input id="search-field" className="form-control mr-sm-2" type="text" placeholder="" />
        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
    </form>
)

export default Searchbar;